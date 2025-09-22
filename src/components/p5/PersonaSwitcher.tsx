import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Persona } from '@/types/p5';
import { Button } from '@/components/ui/button';
import { tableExists, safeQueryOptionalTable, safeInsertOptionalTable, safeUpdate } from '@/lib/db/safeSupabase';

export default function PersonaSwitcher() {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [active, setActive] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPersonas();
  }, []);

  const loadPersonas = async () => {
    // Safe load personas
    const hasPersonas = await tableExists('personas');
    let personaData: any[] = [];
    if (hasPersonas) {
      const result = await safeQueryOptionalTable('personas', '*', {
        order: { column: 'created_at', ascending: true }
      });
      personaData = result.ok && result.data ? result.data : [];
    }
    setPersonas(personaData.map((p: any) => ({ ...p, kind: p.persona_kind as any })));
    
    // Find active session
    const hasPersonaSessions = await tableExists('persona_sessions');
    let sessionData: any = null;
    if (hasPersonaSessions) {
      const result = await safeQueryOptionalTable('persona_sessions', 'persona_id', {
        limit: 1
      });
      sessionData = result.ok && result.data && result.data.length > 0 ? result.data[0] : null;
    }
    
    if (sessionData) {
      setActive(sessionData.persona_id);
    }
  };

  const activate = async (id: string) => {
    setLoading(true);
    try {
      // Deactivate all sessions
      if (await tableExists('persona_sessions')) {
        await safeUpdate('persona_sessions', { active: false }, { active: true });
        
        // Create new active session
        await safeInsertOptionalTable('persona_sessions', { 
          persona_id: id,
          active: true,
          user_id: (await supabase.auth.getUser()).data.user?.id
        });
      }
      
      setActive(id);
      
      // Trigger a custom event to notify other components
      window.dispatchEvent(new CustomEvent('persona-switched', { detail: { personaId: id } }));
    } catch (error) {
      console.error('Error switching persona:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <span className="text-sm text-muted-foreground">Persona:</span>
      {personas.map(p => (
        <Button
          key={p.id}
          onClick={() => activate(p.id)}
          disabled={loading}
          variant={active === p.id ? "default" : "outline"}
          size="sm"
        >
          {p.kind}
        </Button>
      ))}
    </div>
  );
}