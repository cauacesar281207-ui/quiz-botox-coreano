'use client'
import { useEffect, useRef, useState } from 'react'
import { createPageTracker, appendUtms } from '../../lib/trackPage'

const REVEAL_DELAY_MS = 190000 // 3:10 — botões revelam no minuto do pitch
const CHECKOUT_URL = 'https://pay.onprofit.com.br/MynKmlM7?off=eDqB9J'

export default function ViewSL() {
  const [show, setShow] = useState(false)
  const tracker = useRef(createPageTracker('botox-upsell')).current

  useEffect(() => {
    tracker.track({ step_reached: 0 })

    // carrega player VTurb
    const player = document.createElement('script')
    player.src = 'https://scripts.converteai.net/9e5423e3-0f94-43d6-8352-206772c5af81/players/6a25fd77a278bc0f2459ec47/v4/player.js'
    player.async = true
    document.head.appendChild(player)

    const t = setTimeout(() => {
      setShow(true)
      tracker.track({ step_reached: 1 })
    }, REVEAL_DELAY_MS)

    return () => {
      clearTimeout(t)
      if (document.head.contains(player)) document.head.removeChild(player)
    }
  }, [tracker])

  const goQuero = () => {
    tracker.track({ clicked_cta: true, answers: { acao: 'checkout' } })
    setTimeout(() => { window.location.href = appendUtms(CHECKOUT_URL) }, 60)
  }
  const goPassar = () => {
    tracker.track({ answers: { acao: 'downsell' } })
    setTimeout(() => { window.location.href = appendUtms('/downsl') }, 60)
  }

  return (
    <main className="min-h-screen bg-white flex flex-col items-center px-4 py-10 text-center">
      {/* barra de progresso cravada em 93% — gradiente vermelho */}
      <div className="w-full max-w-2xl mb-8">
        <div className="w-full h-7 rounded-full bg-gray-200 overflow-hidden">
          <div
            className="h-full flex items-center justify-between px-3 rounded-full transition-all"
            style={{ width: '93%', background: 'linear-gradient(to right, #dc2626, #f87171)' }}
          >
            <span className="text-white text-xs md:text-sm font-bold whitespace-nowrap">Última etapa</span>
            <span className="text-white text-xs md:text-sm font-bold whitespace-nowrap">93%</span>
          </div>
        </div>
      </div>

      <div className="w-full max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 leading-tight">
          ESPERE, ESPERE… <span className="font-normal text-gray-700">AINDA FALTA UM PASSO</span>
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-gray-500 leading-snug">
          Assista ao vídeo e <span className="font-bold text-gray-700">garanta essa oportunidade!</span><br />
          <span className="font-bold text-gray-700">Somente nesta página</span> 👇
        </p>

        <div className="mt-8 w-full max-w-[400px] mx-auto rounded-lg overflow-hidden shadow-lg">
          <vturb-smartplayer
            id="vid-6a25fd77a278bc0f2459ec47"
            style={{ display: 'block', margin: '0 auto', width: '100%', maxWidth: 400 }}
          />
        </div>

        {show && (
          <div className="mt-8 flex flex-col gap-4">
            <button onClick={goQuero}
              className="w-full py-4 rounded-md bg-green-500 hover:bg-green-600 text-white font-bold text-lg md:text-xl transition">
              QUERO O BOTOX CASEIRO!
            </button>
            <button onClick={goPassar}
              className="w-full py-4 rounded-md bg-red-500 hover:bg-red-600 text-white font-bold text-base md:text-lg transition">
              VOU DEIXAR PASSAR E PERDER A OFERTA
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
