export const OPTIONAL_TABLES = {
  leads: ['id','email','first_name','last_name','stage','created_at'],
  advisor_profiles: ['id','name','email','firm','created_at'],
} as const;
export type OptionalTable = keyof typeof OPTIONAL_TABLES;