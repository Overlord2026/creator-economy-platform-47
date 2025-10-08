import { Database } from './types';

declare module './types' {
  export interface Database {
    public: Database['public'] & {
      Tables: Database['public']['Tables'] & {
        [key: string]: any;
      };
      Functions: Database['public']['Functions'] & {
        [key: string]: any;
      };
    };
  }
}
