import { supabase } from './supabase'

const FUNNEL_SLUG = 'botox-coreano'
const SID_KEY = 'bcm_session_id'

function getSessionId(): string {
  if (typeof window === 'undefined') return ''
  let sid = localStorage.getItem(SID_KEY)
  if (!sid) {
    sid = (crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`)
    localStorage.setItem(SID_KEY, sid)
  }
  return sid
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

export async function track(patch: {
  step_reached?: number
  completed?: boolean
  clicked_cta?: boolean
  answers?: Record<string, string>
}) {
  try {
    const session_id = getSessionId()
    if (!session_id) return

    const prevAnswersRaw = localStorage.getItem('bcm_answers')
    const prevAnswers = prevAnswersRaw ? JSON.parse(prevAnswersRaw) : {}
    const mergedAnswers = { ...prevAnswers, ...(patch.answers ?? {}) }
    if (patch.answers) {
      localStorage.setItem('bcm_answers', JSON.stringify(mergedAnswers))
    }

    const prevStep = Number(localStorage.getItem('bcm_step') ?? 0)
    const nextStep = patch.step_reached != null ? Math.max(prevStep, patch.step_reached) : prevStep
    if (patch.step_reached != null) {
      localStorage.setItem('bcm_step', String(nextStep))
    }

    const row: Record<string, any> = {
      funnel_slug:  FUNNEL_SLUG,
      session_id,
      step_reached: nextStep,
      answers:      mergedAnswers,
      updated_at:   new Date().toISOString(),
      ...getUtms(),
    }
    if (patch.completed   != null) row.completed   = patch.completed
    if (patch.clicked_cta != null) row.clicked_cta = patch.clicked_cta

    await supabase
      .from('metric_sessions')
      .upsert(row, { onConflict: 'funnel_slug,session_id' })
  } catch (e) {
    console.warn('[track] falhou:', e)
  }
}
