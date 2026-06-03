import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL  ?? ''
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

// Fallback de URL evita "supabaseUrl is required" durante o prerender.
// Se a env faltar, o client existe mas as chamadas falham silenciosamente
// (track.ts ja envolve tudo em try/catch).
export const supabase = createClient(
  url || 'https://placeholder.supabase.co',
  key || 'placeholder-key',
)
