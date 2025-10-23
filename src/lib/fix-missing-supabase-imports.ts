// This file forces missing supabase imports to be added via type checking
// Run: npx tsc --noEmit to find all files missing supabase import
// Then manually add: import { supabase } from '@/lib/supabase';

export const filesToFix = [
  'src/components/education/admin/ContentLog.tsx',
  'src/components/education/admin/CourseUploadForm.tsx',
  'src/components/education/admin/GuideUploadForm.tsx',
  'src/components/founding20/EmailCampaignManager.tsx',
  'src/components/founding20/InteractiveLaunchChecklist.tsx',
  'src/components/founding20/LaunchChecklistInterface.tsx',
  'src/components/founding20/LaunchProgressDashboard.tsx',
  'src/components/founding20/OnePageOverviewGenerator.tsx',
  'src/components/integrations/VideoMeetingManager.tsx',
  'src/components/investments/StrategyComparisonModal.tsx',
  'src/components/investments/StrategyDetailModal.tsx',
];
