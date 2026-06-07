"use client";

import { useState, useEffect } from "react";

const GOLD_GRADIENT = "linear-gradient(135deg, #f0c38e, #d89f55, #f5d7b0)";
const CHECKOUT_BASE = "https://pay.hotmart.com/Q106185334Q?off=h1k33ai8";

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
          Espera — lee esto antes de irte
        </p>

        <h1 className="tsl-reveal" style={{
          fontSize: "2rem", fontWeight: 800, lineHeight: 1.25,
          textAlign: "center", marginBottom: "2rem", color: "#fff",
        }}>
          Estabas a punto de cerrar lo único que todavía puede devolverle la firmeza a tu rostro — <span style={{ color: "#f0c38e" }}>sin agujas, sin clínica, sin gastar una fortuna.</span>
        </h1>

        <div className="tsl-reveal" style={{ fontSize: "1.08rem", lineHeight: 1.75, color: "#d8cdbd" }}>
          <p style={{ marginTop: 0 }}>
            Lo entiendo. Ya probaste cremas carísimas que prometían el mundo y no entregaron nada. Ya te miraste al espejo en la mañana y no reconociste el rostro cansado que te devolvía la mirada. Ya pensaste en procedimientos — pero la idea de una aguja en tu cara, el precio absurdo y el miedo a quedar con cara artificial te hicieron retroceder.
          </p>
          <p>
            Por eso existe el <strong style={{ color: "#f0c38e" }}>Bótox Coreano Manual</strong>. Es la técnica que las mujeres coreanas usan desde hace generaciones para mantener la piel firme hasta los 60, los 70 años — usando solo sus propias manos, unos minutos al día. Sin toxinas. Sin dolor. Sin depender de nadie.
          </p>
          <p>
            Las fibras que sostienen tu rostro no murieron. Están <strong style={{ color: "#fff" }}>dormidas</strong>. Y los movimientos correctos, hechos en la secuencia correcta, reactivan la circulación y el colágeno que le dan sostén a la piel — justo donde la flacidez aparece primero.
          </p>
          <p>
            Las mujeres que empezaron esta semana ya cuentan que sienten el rostro más "levantado" en 14 días. No es magia. Es método. El mismo que acabas de ver en tu plan personalizado.
          </p>
          <p style={{ color: "#fff", fontWeight: 600 }}>
            Pero esta página no va a quedar abierta para siempre. Si te vas ahora, vas a volver a dejarlo para después — y dentro de seis meses vas a estar exactamente donde estás hoy, solo que con seis meses más marcados en el rostro.
          </p>
          <p style={{ fontSize: "1.2rem", color: "#f0c38e", fontWeight: 700, textAlign: "center", margin: "2rem 0 0.5rem" }}>
            La decisión de dejar de envejecer en piloto automático es tuya. Y es ahora.
          </p>
        </div>

        <div className="tsl-reveal" style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          gap: "0.75rem", marginTop: "2.5rem",
        }}>
          <CTA label="✅ QUIERO MI PROTOCOLO AHORA" />
          <p style={{ fontSize: "0.8rem", color: "#8a7d6b", margin: 0 }}>
            Acceso inmediato · 30 días de garantía incondicional
          </p>
        </div>

      </div>
    </div>
  );
}
