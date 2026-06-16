import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// حماية مخصصة للإنتاج: إذا كانت الروابط فارغة أثناء تجميع فيرسيل، نمرر قيم شكلية لمنع انهيار الـ Build
const finalUrl = supabaseUrl || 'https://placeholder-project.supabase.co';
const finalKey = supabaseAnonKey || 'placeholder-anon-key';

export const supabase = createClient(finalUrl, finalKey);