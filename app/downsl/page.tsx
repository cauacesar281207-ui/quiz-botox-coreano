'use client'
import { useEffect, useRef } from 'react'
import { createPageTracker, appendUtms } from '../../lib/trackPage'

// !!! BLOQUEIO: Batman ainda não enviou o checkout do R$47. Sem isso o botão não navega. !!!
const DOWNSELL_CHECKOUT_URL = 'COLE_AQUI_O_LINK_DO_CHECKOUT_R47'

export default function DownSL() {
  const tracker = useRef(createPageTracker('botox-downsell')).current
  useEffect(() => { tracker.track({ step_reached: 0 }) }, [tracker])

  const comprar = () => {
    tracker.track({ clicked_cta: true, completed: true })
    setTimeout(() => { window.location.href = appendUtms(DOWNSELL_CHECKOUT_URL) }, 60)
  }

  return (
    <main className="min-h-screen bg-white flex flex-col items-center px-4 py-12">
      <article className="w-full max-w-xl text-gray-800 text-lg leading-relaxed space-y-5">
        <p className="font-bold text-2xl">Espera, meu amor. Antes de você ir, deixa eu te falar uma coisa rápida.</p>
        <p>Eu entendi — o acompanhamento completo comigo não foi o momento agora. Tudo bem.</p>
        <p>Mas eu não quero que você comece seus 28 dias no escuro.</p>
        <p>Seu plano funciona, ele é a sua base. Só que ele trabalha o rosto pela média das mulheres — e o seu triângulo não derreteu igual ao de ninguém. Pode estar caindo mais na bochecha, na mandíbula, no pescoço. E treinar sem saber onde o seu volume desabou é o que faz a maioria demorar pra ver resultado.</p>
        <p>Então eu separei só uma parte do programa pra você — a parte que muda tudo:</p>
        <p>O <strong>Mapa Facial Personalizado</strong>: o analisador faz o raio-x do seu rosto, identifica exatamente onde o seu triângulo caiu, e você recebe o protocolo personalizado pelas suas próprias medidas. Sem o meu acompanhamento ao vivo, sem o desafio intensivo — mas com o mapa certo do seu rosto na mão desde o primeiro dia.</p>
        <p>Era pra sair por <span className="line-through text-gray-400">R$67</span>. Mas como você já está aqui dentro, só nessa página, você leva por <strong className="text-green-600">R$47</strong>.</p>
        <p>Uma vez só. Pra ter a precisão do seu lado e não perder tempo treinando errado.</p>
        <p>E o risco continua sendo meu: 7 dias pra testar. Se não for pra você, devolvo tudo, sem pergunta.</p>
        <p>Toca no botão aqui embaixo e garante o seu mapa antes de começar.</p>

        <button onClick={comprar}
          className="w-full mt-4 py-4 rounded-md bg-green-500 hover:bg-green-600 text-white font-bold text-lg md:text-xl transition">
          QUERO MEU MAPA FACIAL — R$47
        </button>
      </article>
    </main>
  )
}
