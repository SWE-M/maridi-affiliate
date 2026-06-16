import { createClient } from '@supabase/supabase-js';

// وضعنا الروابط بشكل مباشر لكسر كاش Vercel وتخطي متغيرات البيئة المعلقة
const supabaseUrl = 'https://jozvwzwyppwfmimsjdrc.supabase.co';
const supabaseAnonKey = 'sb_publishable_LODz8CZiwwjmC3Mlco6E2A_6_6NmNcx';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);