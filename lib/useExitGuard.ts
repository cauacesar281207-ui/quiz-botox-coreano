'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

type ExitGuardConfig = {
  isVSL: boolean              // true quando step === 11
  onGoToVSL: () => void       // fora da VSL: puxa pra VSL (setStep(11))
  tslPath?: string            // destino quando já está na VSL (Etapa 4)
  enabled?: boolean
}

const POPUP_KEY = 'bcm_exit_popup_shown' // sessionStorage = 1x por visita/aba

function popupAlreadyShown(): boolean {
  try { return sessionStorage.getItem(POPUP_KEY) === '1' } catch { return false }
}
function markPopupShown() {
  try { sessionStorage.setItem(POPUP_KEY, '1') } catch {}
}

export function useExitGuard(config: ExitGuardConfig) {
  const { enabled = true } = config
  const [popupOpen, setPopupOpen] = useState(false)

  // refs: listeners sao montados 1x, precisam ler valor atual
  const cfgRef = useRef(config)
  const popupOpenRef = useRef(false)
  const cooldownRef = useRef(false)

  useEffect(() => { cfgRef.current = config })
  useEffect(() => { popupOpenRef.current = popupOpen }, [popupOpen])

  const handleExitAttempt = useCallback(() => {
    if (popupOpenRef.current) return    // popup aberto: ignora
    if (cooldownRef.current) return     // evita re-disparo instantaneo do exit-intent

    if (!popupAlreadyShown()) {
      markPopupShown()
      setPopupOpen(true)                // 1a saida global: segura na pagina
      return
    }
    // popup ja mostrado -> back-redirect
    const { isVSL, onGoToVSL, tslPath = '/tsl' } = cfgRef.current
    if (!isVSL) {
      onGoToVSL()                       // fora da VSL: puxa pra VSL
    } else {
      const qs = typeof window !== 'undefined' ? window.location.search : ''
      window.location.href = tslPath + qs // na VSL: manda pra TSL (carrega UTMs)
    }
  }, [])

  const closeExitPopup = useCallback(() => {
    setPopupOpen(false)
    cooldownRef.current = true
    setTimeout(() => { cooldownRef.current = false }, 800) // janela pra mouse sair do topo
  }, [])

  // Trap do "voltar" (popstate) — mobile + desktop
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return
    history.pushState(null, '', window.location.href)
    const onPop = () => {
      handleExitAttempt()
      history.pushState(null, '', window.location.href) // re-arma o trap
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [enabled, handleExitAttempt])

  // Exit-intent — SO desktop (mouse saindo pelo topo)
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return
    const hasHover = window.matchMedia?.('(hover: hover)')?.matches
    if (!hasHover) return
    const onMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0 && e.relatedTarget == null) handleExitAttempt()
    }
    document.addEventListener('mouseout', onMouseOut)
    return () => document.removeEventListener('mouseout', onMouseOut)
  }, [enabled, handleExitAttempt])

  return { popupOpen, closeExitPopup }
}
