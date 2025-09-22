export const OPTIONAL_TABLES = {
  leads: ['id','email','first_name','last_name','stage','created_at'],
  advisor_profiles: ['id','name','email','firm','created_at'],
  project_milestones: ['id','project_id','title','description','due_date','status','created_at'],
  project_tasks: ['id','project_id','title','description','status','due_date','created_at'],
  project_documents: ['id','project_id','name','file_path','file_size','content_type','created_at'],
  plan_imports: ['id','import_type','original_filename','import_status','client_count','parsed_data','created_at'],
  advisor_migration_status: ['id','total_clients_to_migrate','clients_migrated','migration_started_at','previous_platform'],
  reserved_profiles: ['id','email','name','persona_type','invitation_token','claimed_at','created_at'],
  advisor_referrals: ['id','referrer_id','referee_email','status','commission_rate','created_at'],
} as const;
export type OptionalTable = keyof typeof OPTIONAL_TABLES;