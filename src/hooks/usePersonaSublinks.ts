import * as React from "react";
import { sb } from "@/lib/supabase-relaxed";
import { PersonaKind } from "@/types/persona";
import { getPersonaLinks, DEFAULT_LINKS, Link } from "@/config/persona-links";

export type { Link };

export function usePersonaSublinks() {
  const [links, setLinks] = React.useState<Link[]>(DEFAULT_LINKS);

  React.useEffect(() => {
    const apply = async (personaId?: string | null) => {
      if (!personaId) {
        setLinks(DEFAULT_LINKS);
        return;
      }
      
      try {
        const { data } = await sb
          .from("personas")
          .select("persona_kind")
          .eq("id", personaId)
          .maybeSingle();
        
        const kind = data?.persona_kind as PersonaKind | undefined;
        
        if (kind) {
          setLinks(getPersonaLinks(kind));
        } else {
          const storedKind = localStorage.getItem("persona_kind") as PersonaKind;
          setLinks(getPersonaLinks(storedKind));
        }
      } catch (error) {
        console.error('Error fetching persona links:', error);
        const storedKind = localStorage.getItem("persona_kind") as PersonaKind;
        setLinks(getPersonaLinks(storedKind));
      }
    };

    const pid = typeof window !== "undefined" ? localStorage.getItem("persona_id") : null;
    const pkind = typeof window !== "undefined" ? localStorage.getItem("persona_kind") : null;
    
    if (pid) {
      apply(pid);
    } else if (pkind) {
      setLinks(getPersonaLinks(pkind as PersonaKind));
    } else {
      setLinks(DEFAULT_LINKS);
    }

    const handler = (e: any) => {
      if (e.detail?.personaId) {
        apply(e.detail.personaId);
      } else if (e.detail?.personaKind) {
        setLinks(getPersonaLinks(e.detail.personaKind as PersonaKind));
      }
    };
    
    window.addEventListener("persona-switched", handler);
    return () => window.removeEventListener("persona-switched", handler);
  }, []);

  return links;
}
