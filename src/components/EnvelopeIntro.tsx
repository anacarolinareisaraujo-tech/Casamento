import { useEffect, useState, type CSSProperties } from "react";
import { motion, AnimatePresence } from "motion/react";

const ease = [0.65, 0, 0.35, 1] as const;

const OLIVE_FLAP = "#59643f";
const OLIVE_SIDE = "#4f5938";
const OLIVE_BOTTOM = "#545e3c";
const OLIVE_BACK = "#3d4630";
const LINING = "#f6f1e6";
const GOLD = "url(#env-gold)";

// Fotos de lírios brancos que ficam nos cantos, atrás do envelope
const LILIES: { src: string; style: CSSProperties }[] = [
  {
    src: "https://images.unsplash.com/photo-1567428051128-5f09a0200655?w=1600&q=80&auto=format",
    style: { right: "-12%", top: "-8%" },
  },
  {
    src: "https://images.unsplash.com/photo-1782736162854-1b72ed92abf3?w=1600&q=80&auto=format",
    style: { left: "-12%", bottom: "-8%" },
  },
];

// Formas do envelope (viewBox 1000 x 700)
const LEFT = "M0,0 L485,405 L0,700 Z";
const RIGHT = "M1000,0 L515,405 L1000,700 Z";
// Nas abas laterais o filete só acompanha a borda externa: o contorno usado
// para desenhar o filete afasta as outras bordas para fora do envelope
const LEFT_OUTLINE = "M0,-3000 L0,3700 L4000,350 Z";
const RIGHT_OUTLINE = "M1000,-3000 L1000,3700 L-3000,350 Z";
const BOTTOM = "M0,700 L462,392 Q500,368 538,392 L1000,700 Z";
// Aba superior (viewBox 1000 x 430), um pouco abaixo das bordas das laterais
// para não deixar fresta com o envelope fechado
const FLAP_H = 430;
const FLAP = "M0,0 L1000,0 L540,395 Q500,428 460,395 Z";

// Filete dourado duplo por dentro da borda: [distância da borda, cor]
const goldLines = (base: string): [number, string][] => [
  [28, GOLD],
  [24.5, base],
  [20, GOLD],
  [16.5, base],
];

// Borda ondulada do selo de cera
const SEAL_EDGE = (() => {
  const pts: string[] = [];
  for (let i = 0; i < 360; i += 3) {
    const a = (i * Math.PI) / 180;
    const r = 90 + 4 * Math.sin(a * 9) + 2 * Math.sin(a * 23 + 1);
    pts.push(
      `${(100 + r * Math.cos(a)).toFixed(1)},${(100 + r * Math.sin(a)).toFixed(1)}`,
    );
  }
  return `M${pts.join("L")}Z`;
})();

// Folhas da coroa dourada do selo, abertas no topo e na base para os ornamentos
const WREATH = (() => {
  const leaves: { x: number; y: number; rot: number }[] = [];
  for (let deg = -90; deg < 270; deg += 11) {
    const fromTop = Math.abs(((deg + 90 + 360) % 360) - 0);
    const fromBottom = Math.abs(((deg + 360) % 360) - 90);
    if (fromTop < 16 || fromTop > 344 || fromBottom < 16) continue;
    const a = (deg * Math.PI) / 180;
    const side = Math.cos(a) >= 0 ? 1 : -1;
    leaves.push({
      x: 100 + 57 * Math.cos(a),
      y: 100 + 57 * Math.sin(a),
      rot: deg + 90 + side * 35,
    });
  }
  return leaves;
})();

function Panel({
  id,
  d,
  outline = d,
  fill,
  lines,
  filter,
}: {
  id: string;
  d: string;
  outline?: string;
  fill: string;
  lines: [number, string][];
  filter?: string;
}) {
  return (
    <g filter={filter}>
      <clipPath id={id}>
        <path d={d} />
      </clipPath>
      <path d={d} fill={fill} />
      <g clipPath={`url(#${id})`} fill="none">
        {lines.map(([inset, color], i) => (
          <path key={i} d={outline} stroke={color} strokeWidth={inset * 2} />
        ))}
      </g>
    </g>
  );
}

function WaxSeal() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="w-full h-full"
      style={{ filter: "drop-shadow(0 5px 6px rgba(0,0,0,0.35))" }}
    >
      <path d={SEAL_EDGE} fill="url(#env-wax)" />
      <circle
        cx="100"
        cy="100"
        r="70"
        fill="url(#env-wax-inner)"
        stroke="rgba(0,0,0,0.25)"
        strokeWidth="2"
      />
      <circle
        cx="100"
        cy="100"
        r="72"
        fill="none"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="1.5"
      />
      <g fill="url(#env-gold-seal)">
        {WREATH.map((l, i) => (
          <ellipse
            key={i}
            cx={l.x}
            cy={l.y}
            rx="5.5"
            ry="2.2"
            transform={`rotate(${l.rot} ${l.x} ${l.y})`}
          />
        ))}
        <path d="M100,36 L104.5,43 L100,50 L95.5,43 Z" />
        <circle cx="90" cy="43" r="2" />
        <circle cx="110" cy="43" r="2" />
        <path d="M100,150 L104.5,157 L100,164 L95.5,157 Z" />
        <circle cx="90" cy="157" r="2" />
        <circle cx="110" cy="157" r="2" />
      </g>
      <text
        x="100"
        y="113"
        textAnchor="middle"
        className="script"
        fontSize="36"
        fill="url(#env-gold-seal)"
      >
        A&C
      </text>
    </svg>
  );
}

export default function EnvelopeIntro({ onOpen }: { onOpen?: () => void }) {
  // 0 fechado, 1 aba abrindo, 2 aba aberta e cartão subindo
  const [stage, setStage] = useState(0);
  const [visible, setVisible] = useState(true);

  // Trava a rolagem do site enquanto o envelope está na tela
  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  const open = () => {
    if (stage > 0) return;
    // Chamado direto no clique: os navegadores só deixam tocar áudio
    // a partir de uma ação do usuário
    onOpen?.();
    setStage(1);
    setTimeout(() => setStage(2), 600);
    setTimeout(() => setVisible(false), 4200);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="envelope"
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden cursor-pointer"
          style={{
            background:
              "radial-gradient(ellipse at center, #34422d 0%, #1b2417 100%)",
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9 }}
          onClick={open}
        >
          {/* Lírios em volta do convite (fotos do Unsplash) */}
          {LILIES.map((lily) => (
            <motion.img
              key={lily.src}
              src={lily.src}
              alt=""
              aria-hidden="true"
              draggable={false}
              className="absolute pointer-events-none select-none"
              style={{
                ...lily.style,
                width: "max(70vw, 75vh)",
                maskImage: "radial-gradient(closest-side, #000 45%, transparent)",
                WebkitMaskImage:
                  "radial-gradient(closest-side, #000 45%, transparent)",
              }}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.6, ease: "easeOut" }}
            />
          ))}

          {/* Gradientes compartilhados pelos desenhos do envelope e do selo */}
          <svg width="0" height="0" className="absolute" aria-hidden="true">
            <defs>
              <linearGradient id="env-gold" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#e6cb86" />
                <stop offset="50%" stopColor="#c3a052" />
                <stop offset="100%" stopColor="#a07d36" />
              </linearGradient>
              <linearGradient id="env-gold-seal" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#f1dc9f" />
                <stop offset="50%" stopColor="#c9a24e" />
                <stop offset="100%" stopColor="#8f6a2a" />
              </linearGradient>
              <radialGradient id="env-wax" cx="40%" cy="35%" r="70%">
                <stop offset="0%" stopColor="#71805a" />
                <stop offset="60%" stopColor="#4d5a37" />
                <stop offset="100%" stopColor="#343e28" />
              </radialGradient>
              <radialGradient id="env-wax-inner" cx="50%" cy="50%" r="50%">
                <stop offset="75%" stopColor="#4b5836" />
                <stop offset="100%" stopColor="#3a452b" />
              </radialGradient>
              <filter id="env-shadow-up" x="-10%" y="-20%" width="120%" height="140%">
                <feDropShadow dx="0" dy="-3" stdDeviation="5" floodOpacity="0.35" />
              </filter>
            </defs>
          </svg>

          <motion.div
            className="relative"
            style={{ width: "min(86vw, 520px)", aspectRatio: "1000 / 700" }}
            initial={{ opacity: 0, y: "6%" }}
            animate={{ opacity: 1, y: stage >= 2 ? "22%" : "0%" }}
            transition={{ duration: stage >= 2 ? 1.4 : 1, ease, delay: stage >= 2 ? 0.3 : 0 }}
          >
            {/* Sombra no chão */}
            <div className="absolute left-[6%] right-[6%] -bottom-[8%] h-[14%] rounded-full bg-black/25 blur-2xl"></div>

            {/* Fundo interno do envelope */}
            <svg
              viewBox="0 0 1000 700"
              className="absolute inset-0 w-full h-full"
              style={{ zIndex: 0 }}
            >
              <rect width="1000" height="700" fill={OLIVE_BACK} />
            </svg>

            {/* Aba superior: verde por fora, forro creme por dentro */}
            <motion.div
              className="absolute inset-x-0 top-0"
              style={{
                height: `${(FLAP_H / 700) * 100}%`,
                transformOrigin: "top",
                transformStyle: "preserve-3d",
                transformPerspective: 1400,
                zIndex: stage >= 2 ? 1 : 5,
              }}
              animate={{ rotateX: stage >= 1 ? 180 : 0 }}
              transition={{ duration: 1.1, ease }}
            >
              <div
                className="absolute inset-0"
                style={{
                  backfaceVisibility: "hidden",
                  filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.3))",
                }}
              >
                <svg viewBox={`0 0 1000 ${FLAP_H}`} className="w-full h-full overflow-visible">
                  <Panel id="env-flap" d={FLAP} fill={OLIVE_FLAP} lines={goldLines(OLIVE_FLAP)} />
                </svg>
              </div>
              <div
                className="absolute inset-0"
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                <svg viewBox={`0 0 1000 ${FLAP_H}`} className="w-full h-full">
                  <Panel
                    id="env-flap-inside"
                    d={FLAP}
                    fill={LINING}
                    lines={[
                      [23.5, GOLD],
                      [20.5, OLIVE_FLAP],
                      [16, GOLD],
                      [13, OLIVE_FLAP],
                    ]}
                  />
                </svg>
              </div>
            </motion.div>

            {/* Cartão que sobe de dentro do envelope */}
            <motion.div
              className="absolute left-[4%] right-[4%] top-[4%] h-[92%] bg-wedding-cream flex flex-col items-center text-center"
              style={{ zIndex: 2, paddingTop: "7%", boxShadow: "0 -2px 12px rgba(0,0,0,0.15)" }}
              animate={{ y: stage >= 2 ? "-62%" : "0%" }}
              transition={{ duration: 1.4, ease, delay: stage >= 2 ? 0.3 : 0 }}
            >
              <div className="absolute inset-[3%] border border-wedding-gold/50 pointer-events-none"></div>
              <p
                className="uppercase tracking-[0.3em] text-wedding-dark/60"
                style={{ fontSize: "clamp(7px, 1.6vw, 10px)" }}
              >
                Com a bênção de Deus e de nossos pais
              </p>
              <p
                className="script text-wedding-dark leading-tight mt-[3%]"
                style={{ fontSize: "min(9.5vw, 56px)" }}
              >
                Ana Carolina
              </p>
              <p
                className="script text-wedding-gold leading-none"
                style={{ fontSize: "min(6vw, 34px)" }}
              >
                &
              </p>
              <p
                className="script text-wedding-dark leading-tight"
                style={{ fontSize: "min(9.5vw, 56px)" }}
              >
                Caio
              </p>
              <div className="w-10 h-px bg-wedding-sage/60 my-[3%]"></div>
              <p
                className="uppercase tracking-[0.3em] text-wedding-dark/70"
                style={{ fontSize: "clamp(8px, 1.9vw, 11px)" }}
              >
                08 · 07 · 2028
              </p>
            </motion.div>

            {/* Frente do envelope: abas laterais e inferior */}
            <svg
              viewBox="0 0 1000 700"
              className="absolute inset-0 w-full h-full overflow-visible"
              style={{ zIndex: 3 }}
            >
              <Panel
                id="env-left"
                d={LEFT}
                outline={LEFT_OUTLINE}
                fill={OLIVE_SIDE}
                lines={goldLines(OLIVE_SIDE)}
              />
              <Panel
                id="env-right"
                d={RIGHT}
                outline={RIGHT_OUTLINE}
                fill={OLIVE_SIDE}
                lines={goldLines(OLIVE_SIDE)}
              />
              <Panel
                id="env-bottom"
                d={BOTTOM}
                fill={OLIVE_BOTTOM}
                lines={goldLines(OLIVE_BOTTOM)}
                filter="url(#env-shadow-up)"
              />
            </svg>

            {/* Selo de cera */}
            <div
              className="absolute"
              style={{
                left: "50%",
                top: `${(400 / 700) * 100}%`,
                width: "24%",
                aspectRatio: "1",
                transform: "translate(-50%, -50%)",
                zIndex: 6,
              }}
            >
              <motion.button
                type="button"
                aria-label="Abrir convite"
                className="w-full h-full"
                whileHover={{ scale: 1.05 }}
                animate={stage >= 1 ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.5 }}
              >
                <WaxSeal />
              </motion.button>
            </div>

            {/* Dica */}
            <motion.p
              className="absolute inset-x-0 text-center uppercase tracking-[0.3em] text-[10px] text-wedding-cream"
              style={{ top: "112%", textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}
              animate={stage >= 1 ? { opacity: 0 } : { opacity: [0.4, 1, 0.4] }}
              transition={
                stage >= 1
                  ? { duration: 0.3 }
                  : { repeat: Infinity, duration: 2.2, ease: "easeInOut" }
              }
            >
              Toque no selo para abrir
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
