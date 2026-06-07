"use client";

import { useState, useEffect } from "react";

const GOLD_GRADIENT = "linear-gradient(135deg, #f0c38e, #d89f55, #f5d7b0)";
const CHECKOUT_BASE = "https://pay.onprofit.com.br/H7vX2qCb?off=iDtnE2";

function buildCheckoutUrl(): string {
  if (typeof window === "undefined") return CHECKOUT_BASE;
  const params = new URLSearchParams(window.location.search);
  const utms = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
  const extra = utms
    .map((k) => (params.get(k) ? `${k}=${encodeURIComponent(params.get(k)!)}` : null))
    .filter(Boolean)
    .join("&");
  return extra ? `${CHECKOUT_BASE}&${extra}` : CHECKOUT_BASE;
}

function CTA({ label }: { label: string }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={() => {
        const url = buildCheckoutUrl();
        setTimeout(() => { window.location.href = url; }, 60);
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: GOLD_GRADIENT, color: "#1a1a1a", fontWeight: 800,
        fontSize: "1.15rem", border: "none", borderRadius: 50,
        padding: "1.3rem 2rem", width: "100%", maxWidth: 440, cursor: "pointer",
        boxShadow: hover ? "0 8px 34px rgba(216,159,85,0.6)" : "0 6px 24px rgba(216,159,85,0.4)",
        transform: hover ? "translateY(-2px)" : "none",
        transition: "all 0.2s ease", animation: "ctaPulse 1.8s ease-in-out infinite",
      }}
    >
      {label}
    </button>
  );
}

export default function TSLPage() {
  const [show, setShow] = useState(false);
  useEffect(() => { requestAnimationFrame(() => setShow(true)); }, []);

  return (
    <div style={{
      minHeight: "100vh", background: "radial-gradient(circle at 50% 0%, #1a1410 0%, #0a0805 60%)",
      color: "#f0e6d8", fontFamily: "Inter, sans-serif",
      padding: "3rem 1.5rem 4rem", display: "flex", justifyContent: "center",
    }}>
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px);} to {opacity:1; transform:translateY(0);} }
        @keyframes ctaPulse {
          0%,100% { transform: scale(1); box-shadow: 0 6px 24px rgba(216,159,85,0.4); }
          50% { transform: scale(1.025); box-shadow: 0 8px 34px rgba(216,159,85,0.65); }
        }
        .tsl-reveal { animation: fadeUp 0.7s ease-out both; }
      `}</style>

      <div style={{ maxWidth: 620, width: "100%", opacity: show ? 1 : 0, transition: "opacity 0.5s" }}>

        <p className="tsl-reveal" style={{
          textAlign: "center", color: "#d89f55", fontWeight: 700,
          letterSpacing: 2, fontSize: "0.8rem", textTransform: "uppercase",
          marginBottom: "1.5rem",
        }}>
          Espere — leia isto antes de ir embora
        </p>

        <h1 className="tsl-reveal" style={{
          fontSize: "2rem", fontWeight: 800, lineHeight: 1.25,
          textAlign: "center", marginBottom: "2rem", color: "#fff",
        }}>
          Você estava prestes a fechar a única coisa que ainda pode devolver a firmeza do seu rosto — <span style={{ color: "#f0c38e" }}>sem agulha, sem clínica, sem gastar uma fortuna.</span>
        </h1>

        <div className="tsl-reveal" style={{ fontSize: "1.08rem", lineHeight: 1.75, color: "#d8cdbd" }}>
          <p style={{ marginTop: 0 }}>
            Eu entendo. Você já tentou cremes caríssimos que prometiam o mundo e entregaram nada. Já olhou no espelho de manhã e não reconheceu o rosto cansado que olhava de volta. Já pensou em procedimentos — mas a ideia de uma agulha no seu rosto, o preço absurdo e o medo de ficar com cara artificial te fizeram recuar.
          </p>
          <p>
            Por isso o <strong style={{ color: "#f0c38e" }}>Botox Coreano Manual</strong> existe. É a técnica que mulheres coreanas usam há gerações para manter a pele firme até os 60, 70 anos — usando apenas as próprias mãos, alguns minutos por dia. Sem toxina. Sem dor. Sem depender de ninguém.
          </p>
          <p>
            As fibras que sustentam o seu rosto não morreram. Elas estão <strong style={{ color: "#fff" }}>adormecidas</strong>. E os movimentos certos, feitos na sequência certa, reativam a circulação e o colágeno que dão sustentação à pele — exatamente onde a flacidez aparece primeiro.
          </p>
          <p>
            Mulheres que começaram essa semana já relatam o rosto mais "levantado" em 14 dias. Não é mágica. É método. O mesmo que você acabou de ver no seu plano personalizado.
          </p>
          <p style={{ color: "#fff", fontWeight: 600 }}>
            Mas essa página não vai ficar aberta para sempre. Se você sair agora, vai voltar a empurrar com a barriga — e daqui a seis meses estará exatamente onde está hoje, só que com seis meses a mais marcados no rosto.
          </p>
          <p style={{ fontSize: "1.2rem", color: "#f0c38e", fontWeight: 700, textAlign: "center", margin: "2rem 0 0.5rem" }}>
            A decisão de parar de envelhecer no piloto automático é sua. E é agora.
          </p>
        </div>

        <div className="tsl-reveal" style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          gap: "0.75rem", marginTop: "2.5rem",
        }}>
          <CTA label="✅ QUERO MEU PROTOCOLO AGORA" />
          <p style={{ fontSize: "0.8rem", color: "#8a7d6b", margin: 0 }}>
            Acesso imediato · 30 dias de garantia incondicional
          </p>
        </div>

      </div>
    </div>
  );
}
