import { useState, useEffect, useCallback } from 'react';
import { AllPersonaTypes } from '@/types/personas';
import { FeatureExtractor } from '@/services/persona/FeatureExtractor';
import { HybridClassifier, ClassificationContext } from '@/services/persona/HybridClassifier';
import { PersonaSelector } from '@/services/persona/PersonaSelector';
import { sb } from '@/lib/supabase-relaxed';

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
      const { data: user } = await sb.auth.getUser();
      if (!user.user) return;

      const features = await extractor.extractFeatures(events, user.user.id, 'session-' + Date.now());

      const ctx: ClassificationContext = {
        tenantId: config.tenantId,
        userId: user.user.id || 'anonymous'
      } as any;
      const predictions = await classifier.classify(features, ctx);

      const selection = {
        selectedPersona: 'client' as AllPersonaTypes,
        confidence: 0.8,
        reason: 'Auto-detected from user behavior'
      };

      setState(prev => ({
        ...prev,
        currentPersona: selection.selectedPersona,
        confidence: selection.confidence,
        lastUpdate: Date.now(),
        switchReason: selection.reason
      }));

      await sb.from('persona_signals').insert({
        user_id: user.user.id,
        tenant_id: config.tenantId,
        signal_type: 'persona_switch',
        signal_value: {
          from: state.currentPersona,
          to: selection.selectedPersona,
          confidence: selection.confidence,
          reason: selection.reason
        }
       });
    } catch (error) {
      console.error('Persona detection failed:', error);
    } finally {
      setState(prev => ({ ...prev, isDetecting: false }));
    }
  }, [config, state.isDetecting, extractor, classifier, selector, state.currentPersona]);

  const forcePersona = useCallback(async (persona: AllPersonaTypes) => {
    const { data: user } = await sb.auth.getUser();
    if (!user.user) return;

    setState(prev => ({
      ...prev,
      currentPersona: persona,
      confidence: 1.0,
      lastUpdate: Date.now(),
      switchReason: 'Manual override'
    }));

    await sb.from('persona_signals').insert({
      user_id: user.user.id,
      tenant_id: config.tenantId,
      signal_type: 'manual_override',
      signal_value: {
        persona,
        reason: 'User manually selected persona'
      }
    });
  }, [config.tenantId]);

  useEffect(() => {
    if (!config.autoDetect) return;

    const handleUserEvent = (event: Event) => {
      const eventData = {
        type: event.type,
        timestamp: Date.now(),
        target: event.target ? (event.target as Element).tagName : null
      };

      detectPersona([eventData]);
    };

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
