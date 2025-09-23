/**
 * Placeholder: identify direct supabase.from('profiles'|'leads'...) usages
 * Expand this script to auto-wrap or list occurrences for manual review.
 */
const glob = require('glob');
const fs = require('fs');

const TARGET = ['profiles','leads','advisor_profiles'];
const files = glob.sync('src/**/*.+(js|ts|tsx)');
files.forEach(f => {
  const s = fs.readFileSync(f,'utf8');
  TARGET.forEach(tbl => {
    if (s.includes(`from('${tbl}')`) || s.includes(`from("${tbl}")`)) {
      console.log('Found', tbl, 'in', f);
    }
  });
});
