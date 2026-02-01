import { createClient } from '@supabase/supabase-js';

const URL = 'https://mizqldyduknmtejgntlh.supabase.co'

const API_KEY = 'sb_publishable_OomCaA1vOLpqC7Y8t0Vd2A_fYLnSJ26';
export const supabase = createClient(URL, API_KEY);
