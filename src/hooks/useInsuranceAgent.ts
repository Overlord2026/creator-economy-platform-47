import * as React from 'react';
import { BOOTSTRAP_MODE } from '@/config/bootstrap';

type Agent = { 
  id: string; 
  name: string; 
  license?: string; 
  email?: string;
  status?: string;
  state?: string;
  license_type?: string;
  license_number?: string;
  nmls_id?: string;
  license_expiry?: Date | null;
  ce_reporting_period_start?: Date | null;
  ce_reporting_period_end?: Date | null;
  ce_credits_completed?: number;
  ce_credits_required?: number;
};
type Course = { 
  id: string; 
  title: string; 
  due_at?: string; 
  type?: string;
  course_name?: string;
  course_type?: string;
  provider_name?: string;
  completion_date?: Date | null;
  credits_earned?: number;
  verified?: boolean;
  certificate_url?: string | null;
};
type Reminder = { 
  id: string; 
  text: string; 
  due_at?: string;
  reminder_type?: string;
  message?: string;
  trigger_date?: Date;
};

// Export types for external use
export type InsuranceAgent = Agent;
export type CECourse = Course;
export type CEReminder = Reminder;

export function useInsuranceAgent() {
  if (BOOTSTRAP_MODE) {
    return React.useMemo(() => ({
      agent: null as Agent | null,
      courses: [] as Course[], reminders: [] as Reminder[], isLoading: false,
      refresh: async () => {}, saveAgent: async () => {},
      addCourse: async () => {}, updateCourse: async () => {}, deleteCourse: async () => {},
      calculateProgress: () => ({ completed: 0, required: 0, percentage: 0 }),
      getExpiringLicenses: () => [] as Agent[],
      getCoursesByType: (_: string) => [] as Course[],
    }), []);
  }
  // real impl here later (fetch; setState; etc.)
  const [agent,setAgent]=React.useState<Agent|null>(null);
  const [courses,setCourses]=React.useState<Course[]>([]);
  const [reminders,setReminders]=React.useState<Reminder[]>([]);
  const [isLoading,setIsLoading]=React.useState(true);
  React.useEffect(()=>{ let off=false; (async()=>{ setIsLoading(true); try{} finally{ if(!off) setIsLoading(false); }})(); return ()=>{off=true}},[]);
  return { agent,courses,reminders,isLoading,
    refresh: async()=>{}, saveAgent: async()=>{}, addCourse: async()=>{},
    updateCourse: async()=>{}, deleteCourse: async()=>{},
    calculateProgress: ()=>({completed:0,required:0,percentage:0}),
    getExpiringLicenses: ()=>[], getCoursesByType: (t:string)=>courses.filter(c=>c.type===t)
  };
}
