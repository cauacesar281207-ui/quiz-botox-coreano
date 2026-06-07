"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { track } from "../../../lib/trackEs";
import { useExitGuard } from "../../../lib/useExitGuard";

const BASE_URL = "https://thenaturalprotocol.online/Botox-Coreano/assets/";
const GOLD_GRADIENT = "linear-gradient(135deg, #f0c38e, #d89f55, #f5d7b0)";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "vturb-smartplayer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { id?: string },
        HTMLElement
      >;
    }
  }
}

const testimonials = [
  { name: "Carmen, 52 años", verified: false, stars: 5, text: '"No creía que algo tan simple pudiera cambiar tanto mi piel. En 2 semanas, mi rostro ya estaba más firme y luminoso. ¡Me siento 10 años más joven!"' },
  { name: "Rosa, 58 años", verified: true, stars: 5, text: '"Mis amigas no paran de preguntarme qué me hice. El bótox coreano manual me devolvió la firmeza que creía perdida para siempre."' },
  { name: "Lucía, 48 años", verified: false, stars: 5, text: '"Siempre les tuve miedo a los procedimientos invasivos. Este método es natural, fácil y los resultados son reales. ¡Recuperé mi autoestima!"' },
  { name: "Patricia, 55 años", verified: false, stars: 5, text: '"Le dedico apenas 5 minutos al día y ya noto una diferencia enorme en las líneas de expresión. ¡Lo recomiendo con los ojos cerrados!"' },
  { name: "Verónica, 42 años", verified: false, stars: 5, text: '"Empecé por curiosidad y ahora no lo dejo más. Mi piel está más firme y con mucha más vida. ¡La mejor inversión que hice!"' },
];

const introTestimonials = [
  { name: "Mariana, 45 años", text: '"Los masajes son relajantes y el resultado en la firmeza es increíble. ¡Parece que rejuvenecí 10 años!"' },
  { name: "Fernanda, 38 años", text: '"Nunca pensé que algo tan simple pudiera hacer tanta diferencia. ¡Mi piel está completamente transformada!"' },
  { name: "Claudia, 52 años", text: '"Después de 3 semanas, mi marido me preguntó qué había hecho diferente. ¡Lo recomiendo muchísimo!"' },
];

function Stars({ count }: { count: number }) {
  return (
    <span style={{ color: "#f5a623", fontSize: "1rem" }}>
      {"⭐".repeat(count)}
    </span>
  );
}

function Logo({ height = 88, marginBottom }: { height?: number; marginBottom?: string }) {
  return (
    <img
      src={`${BASE_URL}botoxdesu.jfif`}
      alt="Botox Coreano"
      style={{ height, width: "auto", display: "block", margin: "0 auto", ...(marginBottom ? { marginBottom } : {}) }}
    />
  );
}

function ProgressBar({ percent }: { percent: number }) {
  return (
    <div
      style={{
        height: 4,
        background: "rgba(0,0,0,0.08)",
        borderRadius: 2,
        marginBottom: "2rem",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${percent}%`,
          background: GOLD_GRADIENT,
          borderRadius: 2,
          transition: "width 0.4s ease",
        }}
      />
    </div>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: "absolute",
        top: "1.5rem",
        left: "1.5rem",
        width: 36,
        height: 36,
        borderRadius: "50%",
        background: "rgba(0,0,0,0.03)",
        border: "1px solid rgba(0,0,0,0.08)",
        fontSize: "1.1rem",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#1a1a1a",
        zIndex: 10,
      }}
    >
      ‹
    </button>
  );
}

function OptionBtn({
  emoji,
  label,
  onClick,
  compact = false,
}: {
  emoji?: string;
  label: string;
  onClick: () => void;
  compact?: boolean;
}) {
  const [hover, setHover] = useState(false);
  const [pressed, setPressed] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setPressed(false);
      }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      style={{
        background: hover ? "rgba(240,195,142,0.1)" : "rgba(0,0,0,0.03)",
        border: hover
          ? "1px solid #d89f55"
          : "1px solid rgba(0,0,0,0.08)",
        borderRadius: 14,
        padding: compact ? "0.75rem 1rem" : "1rem 1.25rem",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        fontSize: "1rem",
        fontWeight: 500,
        cursor: "pointer",
        transition: "all 0.2s ease",
        width: "100%",
        textAlign: "left",
        color: "#1a1a1a",
        fontFamily: "Inter, sans-serif",
        transform: pressed
          ? "scale(0.97)"
          : hover
          ? "translateX(4px)"
          : "none",
      }}
    >
      {emoji && <span style={{ fontSize: "1.5rem" }}>{emoji}</span>}
      <span>{label}</span>
    </button>
  );
}

function CTAButton({
  label,
  onClick,
  delay,
}: {
  label: string;
  onClick: () => void;
  delay?: string;
}) {
  const [hover, setHover] = useState(false);
  const [pressed, setPressed] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setPressed(false);
      }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        background: GOLD_GRADIENT,
        color: "#1a1a1a",
        fontWeight: 700,
        fontSize: "1.1rem",
        borderRadius: 50,
        padding: "1rem 2rem",
        width: "100%",
        border: "none",
        cursor: "pointer",
        boxShadow: hover
          ? "0 6px 25px rgba(216,159,85,0.4)"
          : "0 4px 20px rgba(216,159,85,0.3)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        transform: pressed
          ? "translateY(0) scale(0.98)"
          : hover
          ? "translateY(-2px)"
          : "none",
        fontFamily: "Inter, sans-serif",
        ...(delay
          ? { animation: `fadeSlideIn 0.35s ease-out ${delay} both` }
          : {}),
      }}
    >
      {label}
    </button>
  );
}

function TestimonialCard({
  name,
  verified,
  stars,
  text,
}: {
  name: string;
  verified?: boolean;
  stars: number;
  text: string;
}) {
  return (
    <div
      style={{
        background: "rgba(0,0,0,0.03)",
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: 16,
        padding: "1.25rem",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "0.5rem",
        }}
      >
        <span style={{ fontWeight: 700, fontSize: "0.95rem", color: "#1a1a1a" }}>
          {name}
          {verified && (
            <span
              style={{
                fontSize: "0.75rem",
                color: "#27ae60",
                marginLeft: "0.5rem",
              }}
            >
              ✓ Verificada
            </span>
          )}
        </span>
        <Stars count={stars} />
      </div>
      <p
        style={{
          fontStyle: "italic",
          fontSize: "0.9rem",
          color: "#1a1a1a",
          margin: 0,
          lineHeight: 1.5,
        }}
      >
        {text}
      </p>
    </div>
  );
}

function BeforeAfterSlider() {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updateSlider = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pct);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (isDragging.current) updateSlider(e.clientX);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (isDragging.current) updateSlider(e.touches[0].clientX);
    };
    const onUp = () => {
      isDragging.current = false;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [updateSlider]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 16,
        maxHeight: 280,
        maxWidth: 420,
        margin: "0 auto",
        cursor: "ew-resize",
        userSelect: "none",
        touchAction: "none",
      }}
      onMouseDown={(e) => {
        isDragging.current = true;
        updateSlider(e.clientX);
      }}
      onTouchStart={(e) => {
        isDragging.current = true;
        updateSlider(e.touches[0].clientX);
      }}
    >
      <img
        src={`${BASE_URL}after_final.png`}
        alt="Depois"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center center",
          display: "block",
        }}
      />
      <img
        src={`${BASE_URL}after_final.png`}
        alt=""
        style={{
          width: "100%",
          display: "block",
          visibility: "hidden",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
        }}
      >
        <img
          src={`${BASE_URL}before_final.png`}
          alt="Antes"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center center",
            display: "block",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: `${sliderPos}%`,
          transform: "translate(-50%, -50%)",
          width: 44,
          height: 44,
          background: "white",
          border: "3px solid #d89f55",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
          zIndex: 5,
          pointerEvents: "none",
        }}
      >
        <span style={{ color: "#888", fontSize: "0.8rem" }}>◀▶</span>
      </div>

      <span
        style={{
          position: "absolute",
          bottom: 12,
          left: 12,
          color: "#d89f55",
          fontSize: "0.75rem",
          fontWeight: 700,
          letterSpacing: 1,
        }}
      >
        DIA 1
      </span>
      <span
        style={{
          position: "absolute",
          bottom: 12,
          right: 12,
          color: "#d89f55",
          fontSize: "0.75rem",
          fontWeight: 700,
          letterSpacing: 1,
        }}
      >
        DIA 14
      </span>
    </div>
  );
}

function AnimatedChart() {
  const goldPathRef = useRef<SVGPathElement>(null);
  const purplePathRef = useRef<SVGPathElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 150);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const p1 = goldPathRef.current;
    const p2 = purplePathRef.current;
    if (!p1 || !p2) return;

    const len1 = p1.getTotalLength();
    const len2 = p2.getTotalLength();
    p1.style.strokeDasharray = String(len1);
    p1.style.strokeDashoffset = String(len1);
    p2.style.strokeDasharray = String(len2);
    p2.style.strokeDashoffset = String(len2);

    p1.getBoundingClientRect();

    setTimeout(() => {
      p1.style.transition = "stroke-dashoffset 1.8s ease-out";
      p1.style.strokeDashoffset = "0";
      p2.style.transition = "stroke-dashoffset 1.8s ease-out 0.3s";
      p2.style.strokeDashoffset = "0";
    }, 100);
  }, [ready]);

  const goldDots = [
    { cx: 40, cy: 130, delay: "0.4s" },
    { cx: 120, cy: 100, delay: "0.8s" },
    { cx: 200, cy: 60, delay: "1.2s" },
    { cx: 280, cy: 20, delay: "1.6s" },
  ];
  const purpleDots = [
    { cx: 40, cy: 130, delay: "0.4s" },
    { cx: 120, cy: 126, delay: "0.8s" },
    { cx: 200, cy: 122, delay: "1.2s" },
    { cx: 280, cy: 118, delay: "1.6s" },
  ];

  return (
    <div
      style={{
        background: "rgba(0,0,0,0.03)",
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: 16,
        padding: "1.5rem",
        boxShadow: ready
          ? "0 0 40px rgba(240, 195, 142, 0.25), 0 4px 20px rgba(0,0,0,0.05)"
          : "none",
        transition: "box-shadow 1s ease-out 0.5s",
      }}
    >
      <p
        style={{
          fontWeight: 600,
          textAlign: "center",
          color: "#1a1a1a",
          marginTop: 0,
          marginBottom: "1rem",
          fontSize: "1rem",
        }}
      >
        Resultados Estimados em 4 Semanas
      </p>
      <svg width="100%" height="200" viewBox="0 0 300 160">
        <line x1="40" y1="10" x2="40" y2="140" stroke="#ccc" strokeWidth="1" />
        <line x1="40" y1="140" x2="280" y2="140" stroke="#ccc" strokeWidth="1" />

        <path
          d="M40,130 C80,120 120,100 160,80 C200,60 240,35 280,20 L280,140 L40,140 Z"
          fill="rgba(240,195,142,0.3)"
          style={{
            opacity: ready ? 1 : 0,
            transition: "opacity 1s ease-out 0.5s",
          }}
        />
        <path
          ref={goldPathRef}
          d="M 40,130 C 80,120 120,100 160,80 C 200,60 240,35 280,20"
          fill="none"
          stroke="#d89f55"
          strokeWidth="3"
        />
        {goldDots.map((dot) => (
          <circle
            key={`g-${dot.cx}`}
            cx={dot.cx}
            cy={dot.cy}
            r="5"
            fill="#d89f55"
            style={{
              transform: ready ? "scale(1)" : "scale(0)",
              transition: `transform 0.3s ease ${dot.delay}`,
              transformOrigin: `${dot.cx}px ${dot.cy}px`,
            }}
          />
        ))}

        <path
          ref={purplePathRef}
          d="M 40,130 C 80,128 120,126 160,124 C 200,122 240,120 280,118"
          fill="none"
          stroke="#7c6bd4"
          strokeWidth="2"
          strokeDasharray="4 2"
        />
        {purpleDots.map((dot) => (
          <circle
            key={`p-${dot.cx}`}
            cx={dot.cx}
            cy={dot.cy}
            r="4"
            fill="#7c6bd4"
            style={{
              transform: ready ? "scale(1)" : "scale(0)",
              transition: `transform 0.3s ease ${dot.delay}`,
              transformOrigin: `${dot.cx}px ${dot.cy}px`,
            }}
          />
        ))}

        <text x="40" y="155" textAnchor="middle" fontSize="10" fill="#6c757d">S1</text>
        <text x="120" y="155" textAnchor="middle" fontSize="10" fill="#6c757d">S2</text>
        <text x="200" y="155" textAnchor="middle" fontSize="10" fill="#6c757d">S3</text>
        <text x="280" y="155" textAnchor="middle" fontSize="10" fill="#6c757d">S4</text>
      </svg>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          fontSize: "0.85rem",
          color: "#6c757d",
          marginTop: "0.5rem",
        }}
      >
        <span>
          <span style={{ color: "#d89f55" }}>●</span> Botox Coreano Manual
        </span>
        <span>
          <span style={{ color: "#7c6bd4" }}>●</span> Outras Soluções
        </span>
      </div>
    </div>
  );
}

function LoadingStep({ onComplete }: { onComplete: () => void }) {
  const [bars, setBars] = useState([0, 0, 0]);
  const [imgIndex, setImgIndex] = useState(0);
  const images = ["ba1.1.png", "ba2.2.png", "ba3.3.png", "ba4.4.png"];

  useEffect(() => {
    const interval = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const duration = 2500;
    const fps = 60;
    const increment = 100 / (duration / (1000 / fps));
    let bar = 0;
    let vals = [0, 0, 0];

    const interval = setInterval(() => {
      vals[bar] = Math.min(100, vals[bar] + increment);
      setBars([...vals]);
      if (vals[bar] >= 100) {
        bar++;
        if (bar >= 3) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
        }
      }
    }, 1000 / fps);
    return () => clearInterval(interval);
  }, [onComplete]);

  const labels = [
    { icon: "🔄", text: "Analisando sua pele..." },
    { icon: "⏳", text: "Revisando seus cuidados..." },
    { icon: "✨", text: "Gerando plano final..." },
  ];

  return (
    <>
      <div
        style={{
          width: 56,
          height: 56,
          border: "4px solid rgba(216,159,85,0.2)",
          borderTop: "4px solid #d89f55",
          borderRadius: "50%",
          margin: "0 auto 1.5rem",
          animation: "spin 1s linear infinite",
        }}
      />

      <p
        style={{
          fontSize: "1.4rem",
          fontWeight: 700,
          textAlign: "center",
          color: "#1a1a1a",
          marginBottom: "1.5rem",
        }}
      >
        Criando seu plano personalizado...
      </p>

      <div
        style={{
          position: "relative",
          maxWidth: 420,
          margin: "0 auto 2rem",
          borderRadius: 16,
          overflow: "hidden",
          aspectRatio: "1448/1086",
        }}
      >
        {images.map((img, i) => (
          <img
            key={img}
            src={`${BASE_URL}${img}`}
            alt={`Before After ${i + 1}`}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: imgIndex === i ? 1 : 0,
              transition: "opacity 0.6s ease",
            }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            background: GOLD_GRADIENT,
            color: "#1a1a1a",
            fontWeight: 700,
            letterSpacing: 1,
            padding: "0.6rem",
            textAlign: "center",
            fontSize: "0.85rem",
          }}
        >
          ANTES → DEPOIS
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {labels.map((item, i) => (
          <div key={i}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.4rem",
                fontSize: "0.9rem",
              }}
            >
              <span>
                {item.icon} {item.text}
              </span>
              <span style={{ fontWeight: 600 }}>{Math.round(bars[i])}%</span>
            </div>
            <div
              style={{
                height: 6,
                borderRadius: 3,
                background: "#e9ecef",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${bars[i]}%`,
                  background: GOLD_GRADIENT,
                  borderRadius: 3,
                  transition: "width 0.05s linear",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function IntroLoading({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  useEffect(() => {
    const duration = 5000;
    const fps = 60;
    const increment = 100 / (duration / (1000 / fps));
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 200);
          return 100;
        }
        return next;
      });
    }, 1000 / fps);
    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % 3);
    }, 1666);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ marginTop: "1.5rem" }}>
      <div
        style={{
          height: 6,
          background: "#e9ecef",
          borderRadius: 3,
          overflow: "hidden",
          marginBottom: "0.5rem",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background: GOLD_GRADIENT,
            borderRadius: 3,
            transition: "width 0.05s linear",
          }}
        />
      </div>
      <p
        style={{
          color: "#6c757d",
          fontSize: "0.85rem",
          textAlign: "center",
          marginBottom: "1.5rem",
        }}
      >
        Carregando a avaliação...
      </p>

      <div style={{ position: "relative", minHeight: 120 }}>
        {introTestimonials.map((t, i) => (
          <div
            key={t.name}
            style={{
              position: i === testimonialIndex ? "relative" : "absolute",
              top: 0,
              left: 0,
              right: 0,
              opacity: i === testimonialIndex ? 1 : 0,
              transition: "opacity 0.5s ease",
              background: "rgba(0,0,0,0.03)",
              border: "1px solid rgba(0,0,0,0.08)",
              borderRadius: 16,
              padding: "1rem 1.25rem",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.5rem",
              }}
            >
              <span style={{ fontWeight: 700, fontSize: "0.95rem", color: "#1a1a1a" }}>
                {t.name}
              </span>
              <Stars count={5} />
            </div>
            <p
              style={{
                fontStyle: "italic",
                fontSize: "0.9rem",
                color: "#1a1a1a",
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              {t.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function FaceCircles() {
  const circles = [
    { top: "12%", left: "38%", size: 52, delay: "0s" },
    { top: "35%", left: "28%", size: 48, delay: "0.4s" },
    { top: "58%", left: "32%", size: 44, delay: "0.8s" },
  ];
  return (
    <>
      {circles.map((c, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: c.top,
            left: c.left,
            width: c.size,
            height: c.size,
            border: "2px dashed rgba(255,255,255,0.85)",
            borderRadius: "50%",
            animation: `pulse 2s ease-in-out infinite ${c.delay}`,
            pointerEvents: "none",
          }}
        />
      ))}
    </>
  );
}

function ResultStep({
  goBack,
  onUnlock,
}: {
  goBack: () => void;
  onUnlock: () => void;
}) {
  const [scoreWidth, setScoreWidth] = useState(0);

  useEffect(() => {
    requestAnimationFrame(() => {
      setScoreWidth(85);
    });
  }, []);

  return (
    <div>
      <div style={{ position: "relative", paddingTop: "0.5rem", marginBottom: "1rem" }}>
        <BackButton onClick={goBack} />
        <Logo height={80} />
      </div>

      <div style={{ animation: "fadeSlideIn 0.35s ease-out 0s both" }}>
        <img
          src={`${BASE_URL}foto_9.png`}
          alt="Resultado da avaliação"
          style={{
            maxWidth: 420,
            width: "100%",
            borderRadius: 16,
            display: "block",
            margin: "0 auto 1.5rem",
          }}
        />
      </div>

      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: 700,
          textAlign: "center",
          marginBottom: "1.5rem",
          animation: "fadeSlideIn 0.35s ease-out 0s both",
        }}
      >
        Resultado da sua avaliação
      </h2>

      <div
        style={{
          border: "1px solid rgba(235,87,87,0.4)",
          borderRadius: 16,
          padding: "1.25rem",
          marginBottom: "1rem",
          boxShadow:
            "0 0 30px rgba(235, 87, 87, 0.15), 0 4px 20px rgba(0,0,0,0.06)",
          animation: "glowIn 0.6s ease-out 0.2s both",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "0.75rem",
          }}
        >
          <span style={{ fontSize: "0.9rem", color: "#6c757d" }}>
            Nível de envelhecimento:
          </span>
          <span style={{ color: "#eb5757", fontWeight: 600, fontSize: "0.9rem" }}>
            🚨 Zona de alerta
          </span>
        </div>
        <div
          style={{
            position: "relative",
            height: 10,
            borderRadius: 5,
            background:
              "linear-gradient(to right, #27ae60, #f5a623, #e67e22, #eb5757)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -3,
              left: `${scoreWidth}%`,
              transform: "translateX(-50%)",
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: "#eb5757",
              border: "2px solid white",
              boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
              transition: "left 1.5s ease-out",
            }}
          />
        </div>
      </div>

      <div
        style={{
          background: "rgba(245,166,35,0.1)",
          border: "1px solid rgba(245,166,35,0.4)",
          borderRadius: 12,
          padding: "1rem",
          marginBottom: "1rem",
          fontSize: "0.9rem",
          lineHeight: 1.5,
          animation: "fadeSlideIn 0.35s ease-out 0.5s both",
        }}
      >
        ⚠️ Atenção:{" "}
        <strong>
          Seu rosto está perdendo sustentação silenciosamente. Mesmo com alguns
          cuidados, fatores diários estão enfraquecendo a musculatura facial e
          aprofundando rugas.
        </strong>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0.75rem",
          marginBottom: "1.5rem",
          animation: "fadeSlideIn 0.35s ease-out 0.8s both",
        }}
      >
        <div
          style={{
            background: "rgba(235,87,87,0.15)",
            border: "1px solid rgba(235,87,87,0.4)",
            borderRadius: 14,
            padding: "1rem",
          }}
        >
          <p
            style={{
              color: "#eb5757",
              fontWeight: 700,
              fontSize: "0.9rem",
              marginTop: 0,
              marginBottom: "0.5rem",
            }}
          >
            ⚠️ Principais Sinais:
          </p>
          {["Flacidez progressiva", "Queda nas bochechas", "Olhar cansado", "Testa marcada"].map(
            (t) => (
              <p key={t} style={{ fontSize: "0.9rem", margin: "0.3rem 0", color: "#1a1a1a" }}>
                ❌ {t}
              </p>
            )
          )}
        </div>
        <div
          style={{
            background: "rgba(39,174,96,0.15)",
            border: "1px solid rgba(39,174,96,0.4)",
            borderRadius: 14,
            padding: "1rem",
          }}
        >
          <p
            style={{
              color: "#27ae60",
              fontWeight: 700,
              fontSize: "0.9rem",
              marginTop: 0,
              marginBottom: "0.5rem",
            }}
          >
            ✨ O Protocolo Irá:
          </p>
          {["Reativar colágeno", "Fortalecer musculatura", "Melhorar firmeza", "Rejuvenescer a pele"].map(
            (t) => (
              <p key={t} style={{ fontSize: "0.9rem", margin: "0.3rem 0", color: "#1a1a1a" }}>
                ✅ {t}
              </p>
            )
          )}
        </div>
      </div>

      <div style={{ animation: "fadeSlideIn 0.35s ease-out 1s both" }}>
        <CTAButton label="Desbloquear meu protocolo" onClick={onUnlock} />
      </div>

      <div style={{ marginTop: "2rem", animation: "fadeSlideIn 0.35s ease-out 1.2s both" }}>
        <p
          style={{
            fontSize: "0.85rem",
            color: "#6c757d",
            marginBottom: "1rem",
          }}
        >
          Ao vivo de quem já usa o protocolo:
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
          }}
        >
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </div>
      </div>
    </div>
  );
}

function VSLStep({ step }: { step: number }) {
  const [exibirBotao, setExibirBotao] = useState(false);

  useEffect(() => {
    if (step !== 11) return;

    // 1. Carrega o script do Player
    const s = document.createElement("script");
    s.src = "https://scripts.converteai.net/9e5423e3-0f94-43d6-8352-206772c5af81/players/6a173bf2be176651058cebdf/v4/player.js";
    s.async = true;
    document.head.appendChild(s );

    // 2. Timer para mostrar o botão aos 3 minutos e 55 segundos (235 segundos)
    const timer = setTimeout(() => {
      setExibirBotao(true);
    }, 235000); 

    return () => {
      if (document.head.contains(s)) document.head.removeChild(s);
      clearTimeout(timer);
    };
  }, [step]);

  return (
    <div style={{ paddingBottom: "4rem" }}>
      <h2 style={{ fontSize: "1.4rem", fontWeight: 800, textAlign: "center", marginBottom: "0.5rem", lineHeight: 1.3, color: "#d89f55" }}>
        Seu plano personalizado do Botox Coreano Manual está pronto! 🎉
      </h2>
      <p style={{ fontSize: "0.95rem", color: "#6c757d", textAlign: "center", marginBottom: "1.5rem" }}>
        Seu plano personalizado será liberado ao final do vídeo 👇🏼
      </p>

      <div style={{ width: "100%", maxWidth: 400, margin: "0 auto", borderRadius: 16, overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}>
        <vturb-smartplayer id="vid-6a173bf2be176651058cebdf" style={{ display: "block", margin: "0 auto", width: "100%", maxWidth: 400 }} />
      </div>

      {exibirBotao && (
        <div style={{ marginTop: "2.5rem", textAlign: "center", animation: "fadeSlideIn 0.8s ease-out forwards" }}>
          <button
            onClick={() => {
              const base = "https://pay.hotmart.com/Q106185334Q?off=u9cxyj5c&checkoutMode=10";
              // Repassa os UTMs que vieram na URL do quiz pro checkout (atribuicao).
              const qs = typeof window !== "undefined" ? window.location.search : "";
              const params = new URLSearchParams(qs);
              const utms = ["utm_source","utm_medium","utm_campaign","utm_content","utm_term"];
              const extra = utms
                .map(k => params.get(k) ? `${k}=${encodeURIComponent(params.get(k)!)}` : null)
                .filter(Boolean)
                .join("&");
              const url = extra ? `${base}&${extra}` : base;
              track({ clicked_cta: true });
              setTimeout(() => { window.location.href = url; }, 60);
            }}
            style={{ display: "inline-block", background: "#28a745", color: "white", padding: "1.2rem 2rem", borderRadius: "50px", fontSize: "1.2rem", fontWeight: "bold", textDecoration: "none", boxShadow: "0 4px 15px rgba(40, 167, 69, 0.4)", transition: "transform 0.2s ease", cursor: "pointer", border: "none", width: "100%", maxWidth: "350px" }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            ✅ QUERO MEU PLANO AGORA!
            <div style={{ fontSize: "0.8rem", fontWeight: "normal", marginTop: "4px" }}>
              (Acesso imediato e 30 dias de garantia)
            </div>
          </button>
        </div>
      )}
    </div>
  );
}

export default function QuizPage() {
  const [step, setStep] = useState(0);
  const [idade, setIdade] = useState("");
  const [tipoPele, setTipoPele] = useState("");
  const [objetivo, setObjetivo] = useState("");
  const [area, setArea] = useState("");
  const [tempoDia, setTempoDia] = useState("");
  const [rotina, setRotina] = useState("");

  // Tracking: grava avanço de step. completed quando chega no VSL (11).
  useEffect(() => {
    track({ step_reached: step, ...(step >= 11 ? { completed: true } : {}) });
  }, [step]);

  // Motor de saida (Etapa 1): popup global + back-redirect
  const { popupOpen, closeExitPopup } = useExitGuard({
    isVSL: step === 11,
    onGoToVSL: () => setStep(11),
    tslPath: '/es/tsl', // pagina TSL chega na Etapa 4 (ate la, 404 e esperado)
  });

  const goBack = () => setStep((s) => Math.max(0, s - 1));
  const progressPercent = step >= 1 && step <= 8 ? (step / 8) * 100 : 0;

  const headerStyle: React.CSSProperties = {
    position: "relative",
    paddingTop: step >= 1 ? "0.5rem" : 0,
    marginBottom: "1rem",
  };

  return (
    <div
      style={{
        maxWidth: 560,
        margin: "0 auto",
        padding: "1.5rem",
        background: "#ffffff",
        minHeight: "100vh",
        fontFamily: "Inter, sans-serif",
        color: "#1a1a1a",
      }}
    >
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.2); opacity: 1; }
        }
        @keyframes glowIn {
          from { opacity: 0; transform: scale(0.95); box-shadow: 0 0 0px rgba(235,87,87,0); }
          to { opacity: 1; transform: scale(1); box-shadow: 0 0 30px rgba(235,87,87,0.2); }
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.85) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes ctaPulse {
          0%, 100% { transform: scale(1); box-shadow: 0 6px 22px rgba(216,159,85,0.45); }
          50% { transform: scale(1.03); box-shadow: 0 8px 30px rgba(216,159,85,0.6); }
        }
      `}</style>

      <div key={step} style={{ animation: "fadeSlideIn 0.35s ease-out" }}>
        {/* STEP 0: INTRO */}
        {step === 0 && (
          <div>
            <Logo height={120} marginBottom="1.5rem" />
            <div style={{ marginTop: "1rem" }}>
              <ProgressBar percent={100} />
            </div>
            <h1
              style={{
                fontSize: "2rem",
                fontWeight: 800,
                textAlign: "center",
                lineHeight: 1.2,
                marginBottom: "0.5rem",
              }}
            >
              Rejuvenesça até 20 anos em 28 dias com o
            </h1>
            <p
              style={{
                textAlign: "center",
                fontSize: "1.5rem",
                fontWeight: 700,
                background: GOLD_GRADIENT,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "1.5rem",
              }}
            >
              BOTOX COREANO MANUAL
            </p>
            <img
              src={`${BASE_URL}imagedesu.png`}
              alt="Antes e Depois"
              style={{
                borderRadius: 16,
                maxWidth: "100%",
                display: "block",
                marginBottom: "1rem",
              }}
            />
            <IntroLoading onComplete={() => setStep(1)} />
          </div>
        )}

        {/* STEP 1: IDADE */}
        {step === 1 && (
          <div>
            <div style={headerStyle}>
              <BackButton onClick={goBack} />
              <Logo height={88} />
            </div>
            <ProgressBar percent={progressPercent} />
            <h2
              style={{
                fontSize: "1.6rem",
                fontWeight: 800,
                textAlign: "center",
                textTransform: "uppercase",
                marginBottom: "0.5rem",
              }}
            >
              SELECCIONA TU EDAD
            </h2>
            <p
              style={{
                fontSize: "0.95rem",
                color: "#6c757d",
                textAlign: "center",
                marginBottom: "1.5rem",
              }}
            >
              Para personalizar tu plan de resultados
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              {[
                { img: "velha_20.jpg", label: "20-29" },
                { img: "velha_30.jpg", label: "30-39" },
                { img: "velha_40.jpg", label: "40-49" },
                { img: "velha_50.jpg", label: "50+" },
              ].map((item) => (
                <AgeCard
                  key={item.label}
                  img={item.img}
                  label={item.label}
                  selected={idade === item.label}
                  onClick={() => {
                    setIdade(item.label);
                    track({ answers: { resp_idade: item.label } });
                    setStep(2);
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: TIPO DE PELE */}
        {step === 2 && (
          <div>
            <div style={headerStyle}>
              <BackButton onClick={goBack} />
              <Logo height={88} />
            </div>
            <ProgressBar percent={progressPercent} />
            <h2
              style={{
                fontSize: "1.6rem",
                fontWeight: 700,
                textAlign: "center",
                marginBottom: "0.5rem",
              }}
            >
              ¿Cómo describirías tu piel?
            </h2>
            <p
              style={{
                fontSize: "0.95rem",
                color: "#6c757d",
                textAlign: "center",
                marginBottom: "1.5rem",
              }}
            >
              Esto nos ayuda a ajustar el plan ideal para tu tipo.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                { emoji: "😌", label: "Normal" },
                { emoji: "😕", label: "Grasa" },
                { emoji: "😣", label: "Seca" },
                { emoji: "🤗", label: "Mixta" },
              ].map((item) => (
                <OptionBtn
                  key={item.label}
                  emoji={item.emoji}
                  label={item.label}
                  onClick={() => {
                    setTipoPele(item.label);
                    track({ answers: { resp_pele: item.label } });
                    setStep(3);
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: OBJETIVO */}
        {step === 3 && (
          <div>
            <div style={headerStyle}>
              <BackButton onClick={goBack} />
              <Logo height={88} />
            </div>
            <ProgressBar percent={progressPercent} />
            <h2
              style={{
                fontSize: "1.6rem",
                fontWeight: 700,
                textAlign: "center",
                marginBottom: "0.5rem",
              }}
            >
              ¿Cuál es tu principal objetivo?
            </h2>
            <p
              style={{
                fontSize: "0.95rem",
                color: "#6c757d",
                textAlign: "center",
                marginBottom: "1.5rem",
              }}
            >
              Con el Bótox Coreano Manual
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                { emoji: "✨", label: "Sentirme más joven" },
                { emoji: "💃🏻", label: "Volver a sentirme bien y segura" },
                { emoji: "🔋", label: "No parecer siempre cansada" },
                { emoji: "💖", label: "Recuperar mi autoestima" },
              ].map((item) => (
                <OptionBtn
                  key={item.label}
                  emoji={item.emoji}
                  label={item.label}
                  onClick={() => {
                    setObjetivo(item.label);
                    track({ answers: { resp_objetivo: item.label } });
                    setStep(4);
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: AREA DO ROSTO */}
        {step === 4 && (
          <div>
            <div style={headerStyle}>
              <BackButton onClick={goBack} />
              <Logo height={88} />
            </div>
            <ProgressBar percent={progressPercent} />
            <h2
              style={{
                fontSize: "1.6rem",
                fontWeight: 700,
                textAlign: "center",
                marginBottom: "1.5rem",
              }}
            >
              ¿Qué zona quieres mejorar primero?
            </h2>
            <div style={{ display: "flex", gap: "1rem" }}>
              <div style={{ flex: 1, position: "relative", display: "inline-block" }}>
                <img
                  src={`${BASE_URL}leticia_52.jpg`}
                  alt="Leticia"
                  style={{
                    borderRadius: 16,
                    width: "100%",
                    maxHeight: 320,
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                <FaceCircles />
              </div>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  justifyContent: "center",
                }}
              >
                {["Todo el rostro", "Frente", "Ojos", "Mejillas", "Cuello"].map(
                  (label) => (
                    <OptionBtn
                      key={label}
                      label={label}
                      compact
                      onClick={() => {
                        setArea(label);
                        track({ answers: { resp_area: label } });
                        setStep(5);
                      }}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: BEFORE/AFTER SLIDER */}
        {step === 5 && (
          <div>
            <div style={headerStyle}>
              <BackButton onClick={goBack} />
              <Logo height={88} />
            </div>
            <ProgressBar percent={progressPercent} />
            <h2
              style={{
                fontSize: "1.6rem",
                fontWeight: 700,
                textAlign: "center",
                marginBottom: "0.5rem",
                background: GOLD_GRADIENT,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Una piel firme y joven ahora es más fácil
            </h2>
            <p
              style={{
                fontSize: "0.95rem",
                color: "#6c757d",
                textAlign: "center",
                marginBottom: "1.5rem",
              }}
            >
              Desliza hacia el lado para ver el increíble resultado de Leticia
            </p>

            <BeforeAfterSlider />

            <div style={{ marginTop: "1.5rem", marginBottom: "1.5rem" }}>
              <TestimonialCard
                name="Leticia, 52 años"
                verified={false}
                stars={5}
                text="¡Fueron solo 3 semanas haciendo el bótox coreano manual y mi piel quedó completamente diferente. Las líneas de expresión se suavizaron y mi rostro se ve mucho más firme y joven!"
              />
            </div>

            <CTAButton label="Continuar" onClick={() => setStep(6)} />
          </div>
        )}

        {/* STEP 6: TEMPO POR DIA */}
        {step === 6 && (
          <div>
            <div style={headerStyle}>
              <BackButton onClick={goBack} />
              <Logo height={88} />
            </div>
            <ProgressBar percent={progressPercent} />
            <h2
              style={{
                fontSize: "1.6rem",
                fontWeight: 700,
                textAlign: "center",
                marginBottom: "0.5rem",
              }}
            >
              ¿Cuánto tiempo al día puedes dedicar?
            </h2>
            <p
              style={{
                fontSize: "0.95rem",
                color: "#6c757d",
                textAlign: "center",
                marginBottom: "1.5rem",
              }}
            >
              Tu plan se ajustará para caber en tu rutina
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                { emoji: "🕐", label: "Menos de 5 minutos" },
                { emoji: "⏰", label: "De 5 a 15 minutos" },
                { emoji: "🕰️", label: "Más de 15 minutos" },
              ].map((item) => (
                <OptionBtn
                  key={item.label}
                  emoji={item.emoji}
                  label={item.label}
                  onClick={() => {
                    setTempoDia(item.label);
                    track({ answers: { resp_tempo: item.label } });
                    setStep(7);
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* STEP 7: ROTINA */}
        {step === 7 && (
          <div>
            <div style={headerStyle}>
              <BackButton onClick={goBack} />
              <Logo height={88} />
            </div>
            <ProgressBar percent={progressPercent} />
            <h2
              style={{
                fontSize: "1.6rem",
                fontWeight: 700,
                textAlign: "center",
                marginBottom: "0.5rem",
              }}
            >
              ¿Ya tienes una rutina de cuidado de la piel?
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                marginTop: "1.5rem",
              }}
            >
              {[
                { emoji: "🤗", label: "Sí, me cuido todos los días" },
                { emoji: "😬", label: "Casi todos los días, pero a veces lo olvido" },
                { emoji: "😩", label: "Me cuido a veces o cuando me acuerdo" },
                { emoji: "😕", label: "Nunca sigo una rutina" },
              ].map((item) => (
                <OptionBtn
                  key={item.label}
                  emoji={item.emoji}
                  label={item.label}
                  onClick={() => {
                    setRotina(item.label);
                    track({ answers: { resp_rotina: item.label } });
                    setStep(8);
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* STEP 8: GRAFICO */}
        {step === 8 && (
          <div>
            <div style={headerStyle}>
              <BackButton onClick={goBack} />
              <Logo height={88} />
            </div>
            <ProgressBar percent={progressPercent} />
            <h2
              style={{
                fontSize: "1.6rem",
                fontWeight: 700,
                textAlign: "center",
                marginBottom: "0.5rem",
                background: GOLD_GRADIENT,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              El único programa que necesitas
            </h2>
            <p
              style={{
                fontSize: "0.95rem",
                color: "#6c757d",
                textAlign: "center",
                marginBottom: "1.5rem",
              }}
            >
              Para combatir los signos de la edad y recuperar la confianza. ¡En pocos
              días, tu piel más firme y luminosa!
            </p>

            <AnimatedChart />

            <div style={{ marginTop: "2rem" }}>
              <CTAButton label="Próxima Etapa" onClick={() => setStep(9)} />
            </div>
          </div>
        )}

        {/* STEP 9: LOADING */}
        {step === 9 && (
          <div>
            <div style={headerStyle}>
              <BackButton onClick={goBack} />
              <Logo height={80} />
            </div>
            <ProgressBar percent={90} />
            <LoadingStep onComplete={() => setStep(10)} />
          </div>
        )}

        {/* STEP 10: RESULTADO */}
        {step === 10 && (
          <ResultStep goBack={goBack} onUnlock={() => setStep(11)} />
        )}

        {/* STEP 11: VSL */}
        {step === 11 && <VSLStep step={step} />}
      </div>

      {popupOpen && (
        <div
          onClick={closeExitPopup}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "rgba(20,12,4,0.72)", backdropFilter: "blur(4px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "1.5rem", animation: "fadeSlideIn 0.25s ease-out",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative", background: "#fffaf3",
              borderRadius: 24, padding: "2.5rem 1.75rem 2rem",
              maxWidth: 380, width: "100%", textAlign: "center",
              border: "1px solid rgba(216,159,85,0.35)",
              boxShadow: "0 0 60px rgba(216,159,85,0.35), 0 20px 60px rgba(0,0,0,0.4)",
              animation: "popIn 0.35s cubic-bezier(0.34,1.56,0.64,1) both",
            }}
          >
            {/* selo topo */}
            <div
              style={{
                position: "absolute", top: -18, left: "50%",
                transform: "translateX(-50%)", background: GOLD_GRADIENT,
                color: "#1a1a1a", fontWeight: 800, fontSize: "0.7rem",
                letterSpacing: 1, padding: "0.4rem 1.1rem", borderRadius: 50,
                whiteSpace: "nowrap", boxShadow: "0 4px 14px rgba(216,159,85,0.45)",
              }}
            >
              ⚠️ ¡ESPERA!
            </div>

            <div style={{ fontSize: "2.75rem", marginBottom: "0.5rem", marginTop: "0.5rem" }}>
              🎁
            </div>

            <h2
              style={{
                fontSize: "1.6rem", fontWeight: 800, lineHeight: 1.2,
                margin: "0 0 0.75rem", color: "#1a1a1a",
              }}
            >
              Tranquila, ¡no te vayas todavía!
            </h2>

            <p
              style={{
                fontSize: "1rem", color: "#6c5a45", lineHeight: 1.5,
                margin: "0 0 1.75rem",
              }}
            >
              Estás a pocos pasos de ver tu plan completo.
              <strong style={{ color: "#1a1a1a" }}> Sigue hasta el final y mira el contenido gratis.</strong>
            </p>

            <button
              onClick={closeExitPopup}
              style={{
                background: GOLD_GRADIENT, color: "#1a1a1a",
                fontWeight: 800, fontSize: "1.1rem", border: "none",
                borderRadius: 50, padding: "1.1rem 2rem", width: "100%",
                cursor: "pointer", boxShadow: "0 6px 22px rgba(216,159,85,0.45)",
                animation: "ctaPulse 1.8s ease-in-out infinite",
              }}
            >
              QUIERO CONTINUAR →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function AgeCard({
  img,
  label,
  selected,
  onClick,
}: {
  img: string;
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        borderRadius: 16,
        background: selected
          ? "rgba(240,195,142,0.2)"
          : hover
          ? "rgba(240,195,142,0.1)"
          : "rgba(0,0,0,0.03)",
        border: selected
          ? "2px solid #d89f55"
          : hover
          ? "1px solid #d89f55"
          : "1px solid rgba(0,0,0,0.08)",
        padding: "1.5rem 1rem",
        textAlign: "center",
        cursor: "pointer",
        transition: "all 0.2s ease",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transform: hover ? "translateY(-4px)" : "none",
        boxShadow: hover ? "0 8px 20px rgba(216,159,85,0.2)" : "none",
      }}
    >
      <img
        src={`${BASE_URL}${img}`}
        alt={label}
        style={{
          borderRadius: "50%",
          width: 90,
          height: 90,
          objectFit: "cover",
        }}
      />
      <span
        style={{
          fontSize: "1rem",
          fontWeight: 600,
          marginTop: "0.75rem",
          color: "#1a1a1a",
        }}
      >
        {label}
      </span>
    </button>
  );
}
