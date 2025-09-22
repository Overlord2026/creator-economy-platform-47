export interface Profile {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  company?: string;
  created_at: string;
}

export interface PartnerApplication {
  id: string;
  user_id: string;
  company_name: string;
  contact_person: string;
  email: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

export const mockProfiles: Profile[] = [
  {
    id: 'demo-profile-1',
    user_id: 'demo-user',
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    company: 'Demo Financial',
    created_at: new Date().toISOString()
  }
];

export const mockPartnerApplications: PartnerApplication[] = [
  {
    id: 'demo-app-1',
    user_id: 'demo-user',
    company_name: 'Demo Investment Firm',
    contact_person: 'Jane Smith',
    email: 'jane@demoinvest.com',
    status: 'pending',
    created_at: new Date().toISOString()
  }
];