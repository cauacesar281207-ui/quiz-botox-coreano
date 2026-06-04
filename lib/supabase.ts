import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL  ?? ''
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

// DEBUG temporario — confirma qual key o build carregou
if (typeof window !== 'undefined') {
  console.log('[supabase] URL:', url)
  console.log('[supabase] KEY tail:', key.slice(-6), '| len:', key.length)
}

export const supabase = createClient(
  url || 'https://placeholder.supabase.co',
  key || 'placeholder-key',
)
