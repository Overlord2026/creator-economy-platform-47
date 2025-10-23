import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { withFallback, safeQueryOptionalTable, safeInsertOptionalTable } from '@/lib/db/safeSupabase';
import { sb } from '@/lib/supabase-relaxed';

interface Persona {
  id: string;
  kind: string;
  persona_kind?: string;
  created_at: string;
}

export default function PersonaSwitcher() {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [active, setActive] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadPersonas();
    // Listen for external switches to keep in sync
    const handler = (e: Event) => {
      const id = (e as CustomEvent).detail?.personaId as string | undefined;
      if (id) setActive(id);
    };
    window.addEventListener("persona-switched", handler as EventListener);
    return () => window.removeEventListener("persona-switched", handler as EventListener);
  }, []);

  const loadPersonas = async () => {
    setLoading(true);
    try {
      const { data: auth } = await sb.auth.getUser();
      const userId = auth.user?.id;
      if (!userId) return;

      // Load personas using safe database pattern
      const personaData = await withFallback('personas',
        () => safeQueryOptionalTable('personas', '*', { order: { column: 'created_at', ascending: true } }),
        () => []
      );

      setPersonas(personaData.map((p: any) => ({ ...p, kind: (p.persona_kind ?? p.kind) as any })));

      // Load active session using safe database pattern
      const sessionData = await withFallback('persona_sessions',
        () => safeQueryOptionalTable('persona_sessions', 'persona_id', { limit: 1 }),
        () => []
      );

      if (sessionData.length > 0 && (sessionData[0] as any)?.persona_id) {
        setActive((sessionData[0] as any).persona_id);
      }
    } catch (e: any) {
      console.error(e);
      toast({ title: "Unable to load personas", description: e.message ?? "Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const activate = async (id: string) => {
    setLoading(true);
    try {
      const { data: auth } = await sb.auth.getUser();
      const userId = auth.user?.id;
      if (!userId) throw new Error("Not authenticated");

      // Use safe database pattern for persona session management
      await safeInsertOptionalTable('persona_sessions', {
        persona_id: id,
        user_id: userId,
        active: true,
      });

      setActive(id);
      window.dispatchEvent(new CustomEvent("persona-switched", { detail: { personaId: id } }));
    } catch (e: any) {
      console.error(e);
      toast({ title: "Switch failed", description: e.message ?? "Try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <span className="text-sm text-muted-foreground">Persona:</span>
      {loading && personas.length === 0 ? (
        <span className="text-xs text-muted-foreground">Loading…</span>
      ) : (
        personas.map((p) => (
          <Button
            key={p.id}
            onClick={() => activate(p.id)}
            disabled={loading}
            variant={active === p.id ? "default" : "outline"}
            size="sm"
            aria-pressed={active === p.id}
            title={`Switch to ${p.kind}`}
          >
            {p.kind}
          </Button>
        ))
      )}
    </div>
  );
}
