export const OPTIONAL_TABLES = {
  leads: ['id','email','first_name','last_name','stage','created_at'],
  advisor_profiles: ['id','name','email','firm','created_at'],
  project_milestones: ['id','project_id','title','description','due_date','status','created_at'],
  project_tasks: ['id','project_id','title','description','status','due_date','created_at'],
  project_documents: ['id','project_id','name','file_path','file_size','content_type','created_at'],
} as const;
export type OptionalTable = keyof typeof OPTIONAL_TABLES;