import { useState, useEffect, useCallback } from 'react';
import { AllPersonaTypes } from '@/types/personas';
import { FeatureExtractor } from '@/services/persona/FeatureExtractor';
import { HybridClassifier } from '@/services/persona/HybridClassifier';
import { PersonaSelector } from '@/services/persona/PersonaSelector';
import { supabase } from '@/integrations/supabase/client';

interface PersonaSystemConfig {
  tenantId: string;
  modelId?: string;
  modelVersion?: string;
  autoDetect?: boolean;
}

interface PersonaSystemState {
  currentPersona: AllPersonaTypes;
  confidence: number;
  isDetecting: boolean;
  lastUpdate: number;
  switchReason?: string;
}

export const usePersonaSystem = (config: PersonaSystemConfig) => {
  const [state, setState] = useState<PersonaSystemState>({
    currentPersona: 'client',
    confidence: 0.5,
    isDetecting: false,
    lastUpdate: Date.now()
  });

  const [extractor] = useState(() => new FeatureExtractor(
    config.modelId || 'default-extractor',
    config.modelVersion || '1.0.0'
  ));
  
  const [classifier] = useState(() => new HybridClassifier());
  const [selector] = useState(() => new PersonaSelector(config.tenantId));

  const detectPersona = useCallback(async (events: any[]) => {
    if (!config.autoDetect || state.isDetecting) return;

    setState(prev => ({ ...prev, isDetecting: true }));

    try {
      // Extract features
      const features = await extractor.extractFeatures(events, {
        userId: 'current-user',
        tenantId: config.tenantId,
        timestamp: Date.now()
      });

      // Classify persona
      const predictions = await classifier.classify(features);

      // Select with hysteresis
      const selection = selector.selectPersona(predictions);

      if (selection.switched) {
        setState(prev => ({
          ...prev,
          currentPersona: selection.selectedPersona,
          confidence: selection.confidence,
          lastUpdate: Date.now(),
          switchReason: selection.reason
        }));

        // Log persona change
        await supabase.from('persona_signals').insert({
          tenant_id: config.tenantId,
          persona_id: 'current-user',
          signal_type: 'persona_switch',
          signal_data: {
            from: state.currentPersona,
            to: selection.selectedPersona,
            confidence: selection.confidence,
            reason: selection.reason,
            model: features.model
          }
        });
      }
    } catch (error) {
      console.error('Persona detection failed:', error);
    } finally {
      setState(prev => ({ ...prev, isDetecting: false }));
    }
  }, [config, state.isDetecting, extractor, classifier, selector, state.currentPersona]);

  const forcePersona = useCallback(async (persona: AllPersonaTypes) => {
    setState(prev => ({
      ...prev,
      currentPersona: persona,
      confidence: 1.0,
      lastUpdate: Date.now(),
      switchReason: 'Manual override'
    }));

    // Log manual override
    await supabase.from('persona_signals').insert({
      tenant_id: config.tenantId,
      persona_id: 'current-user',
      signal_type: 'manual_override',
      signal_data: {
        persona,
        reason: 'User manually selected persona'
      }
    });
  }, [config.tenantId]);

  // Auto-detection effect
  useEffect(() => {
    if (!config.autoDetect) return;

    // Set up event listeners for user interactions
    const handleUserEvent = (event: Event) => {
      // Collect relevant events for persona detection
      const eventData = {
        type: event.type,
        timestamp: Date.now(),
        target: event.target ? (event.target as Element).tagName : null
      };

      // Trigger detection with recent events
      detectPersona([eventData]);
    };

    // Listen for various user interaction events
    const events = ['click', 'scroll', 'keydown', 'focus'];
    events.forEach(eventType => {
      document.addEventListener(eventType, handleUserEvent);
    });

    return () => {
      events.forEach(eventType => {
        document.removeEventListener(eventType, handleUserEvent);
      });
    };
  }, [config.autoDetect, detectPersona]);

  return {
    ...state,
    detectPersona,
    forcePersona,
    extractor,
    classifier,
    selector
  };
};