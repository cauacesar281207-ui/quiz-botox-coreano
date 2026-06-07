import { supabase } from './supabase'

type Payload = {
  step_reached?: number
  completed?: boolean
  clicked_cta?: boolean
  answers?: Record<string, any>
}

// Mesma chave usada no lib/trackEs.ts — garante que /es/viewsl, /es/downsl e o quiz/es
// compartilhem session_id (mesmo navegador = mesma sessao no metric_sessions).
const SESSION_KEY = 'bcm_session_id_es'

function getSessionId(): string {
  if (typeof window === 'undefined') return ''
  let id = localStorage.getItem(SESSION_KEY)
  if (!id) {
    id = (crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`)
    localStorage.setItem(SESSION_KEY, id)
  }
  return id
}

function getUtms() {
  if (typeof window === 'undefined') return {}
  const p = new URLSearchParams(window.location.search)
  return {
    utm_source:   p.get('utm_source')   || null,
    utm_medium:   p.get('utm_medium')   || null,
    utm_campaign: p.get('utm_campaign') || null,
    utm_content:  p.get('utm_content')  || null,
    utm_term:     p.get('utm_term')     || null,
  }
}

// Repassa apenas utm_* da URL atual pro destino. Trata se base ja tem query (?off=...).
export function appendUtms(base: string): string {
  if (typeof window === 'undefined') return base
  const cur = new URLSearchParams(window.location.search)
  const passed = new URLSearchParams()
  cur.forEach((v, k) => { if (k.startsWith('utm_')) passed.set(k, v) })
  const tail = passed.toString()
  return tail ? base + (base.includes('?') ? '&' : '?') + tail : base
}

export function createPageTracker(funnelSlug: string) {
  let maxStep = 0
  let mergedAnswers: Record<string, any> = {}
  return {
    async track(payload: Payload) {
      try {
        const session_id = getSessionId()
        if (!session_id) return
        if (typeof payload.step_reached === 'number') {
          maxStep = Math.max(maxStep, payload.step_reached)
        }
        if (payload.answers) {
          mergedAnswers = { ...mergedAnswers, ...payload.answers }
        }
        const row: Record<string, any> = {
          funnel_slug:  funnelSlug,
          session_id,
          step_reached: maxStep,
          answers:      mergedAnswers,
          updated_at:   new Date().toISOString(),
          ...getUtms(),
        }
        if (typeof payload.completed   === 'boolean') row.completed   = payload.completed
        if (typeof payload.clicked_cta === 'boolean') row.clicked_cta = payload.clicked_cta
        await supabase
          .from('metric_sessions')
          .upsert(row, { onConflict: 'funnel_slug,session_id' })
      } catch {
        // falha silenciosa, igual trackEs.ts
      }
    }
  }
}
