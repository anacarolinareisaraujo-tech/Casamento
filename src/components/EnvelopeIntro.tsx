import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const flapShadow = { filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.35))" };
const ease = [0.65, 0, 0.35, 1] as const;

export default function EnvelopeIntro() {
  const [opened, setOpened] = useState(false);
  const [visible, setVisible] = useState(true);

  // Trava a rolagem do site enquanto o envelope está na tela
  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  const open = () => {
    if (opened) return;
    setOpened(true);
    setTimeout(() => setVisible(false), 3000);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="envelope"
          className="fixed inset-0 z-[200] overflow-hidden bg-wedding-olive cursor-pointer"
          style={{ perspective: 1600 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          onClick={open}
        >
          {/* Cartão que aparece quando o envelope abre */}
          <motion.div
            className="absolute inset-0 bg-wedding-cream flex flex-col items-center justify-center text-center px-6"
            initial={{ opacity: 0 }}
            animate={opened ? { opacity: 1 } : {}}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <motion.div
              className="flex flex-col items-center"
              initial={{ y: 20, opacity: 0 }}
              animate={opened ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 1.3, duration: 0.9, ease: "easeOut" }}
            >
              <p className="text-[10px] uppercase tracking-[0.3em] text-wedding-dark/60 mb-6">
                Com a bênção de Deus e de nossos pais
              </p>
              <h2 className="script text-6xl md:text-7xl text-wedding-dark">
                Ana Carolina
              </h2>
              <span className="script text-4xl text-wedding-gold my-1">&</span>
              <h2 className="script text-6xl md:text-7xl text-wedding-dark">
                Caio
              </h2>
              <div className="w-12 h-px bg-wedding-sage/50 my-6"></div>
              <p className="text-xs uppercase tracking-[0.3em] text-wedding-dark/70">
                10 de Julho de 2027
              </p>
            </motion.div>
          </motion.div>

          {/* Aba esquerda */}
          <motion.div
            className="absolute inset-0"
            style={flapShadow}
            animate={opened ? { x: "-100%" } : {}}
            transition={{ delay: 0.9, duration: 0.9, ease }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: "#45523d",
                clipPath: "polygon(0 0, 50% 52%, 0 100%)",
              }}
            />
          </motion.div>

          {/* Aba direita */}
          <motion.div
            className="absolute inset-0"
            style={flapShadow}
            animate={opened ? { x: "100%" } : {}}
            transition={{ delay: 0.9, duration: 0.9, ease }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: "#45523d",
                clipPath: "polygon(100% 0, 50% 52%, 100% 100%)",
              }}
            />
          </motion.div>

          {/* Aba inferior */}
          <motion.div
            className="absolute inset-0"
            style={flapShadow}
            animate={opened ? { y: "100%" } : {}}
            transition={{ delay: 0.9, duration: 0.9, ease }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: "#52604a",
                clipPath: "polygon(0 100%, 50% 48%, 100% 100%)",
              }}
            />
          </motion.div>

          {/* Aba superior: verde por fora, creme por dentro */}
          <motion.div
            className="absolute inset-0"
            style={{ transformOrigin: "top", transformStyle: "preserve-3d" }}
            animate={opened ? { rotateX: 180 } : {}}
            transition={{ delay: 0.25, duration: 1, ease }}
          >
            <div
              className="absolute inset-0"
              style={{ ...flapShadow, backfaceVisibility: "hidden" }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: "#566650",
                  clipPath: "polygon(0 0, 100% 0, 50% 55%)",
                }}
              />
            </div>
            <div
              className="absolute inset-0"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateX(180deg)",
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: "#efe9dc",
                  clipPath: "polygon(0 0, 100% 0, 50% 55%)",
                }}
              />
            </div>
          </motion.div>

          {/* Selo de cera */}
          <div className="absolute inset-x-0 top-[55%] -translate-y-1/2 flex flex-col items-center gap-6 pointer-events-none">
            <motion.button
              type="button"
              aria-label="Abrir convite"
              className="pointer-events-auto relative w-28 h-28 rounded-full flex items-center justify-center"
              style={{
                background:
                  "radial-gradient(circle at 35% 30%, #ecd9a8, #c5a059 55%, #96743a)",
                boxShadow:
                  "0 6px 16px rgba(0,0,0,0.4), inset 0 -4px 8px rgba(0,0,0,0.25), inset 0 3px 6px rgba(255,255,255,0.35)",
              }}
              whileHover={{ scale: 1.05 }}
              animate={opened ? { scale: 0.6, opacity: 0 } : {}}
              transition={{ duration: 0.4 }}
            >
              <span className="absolute inset-3 rounded-full border border-[#7a5c26]/40"></span>
              <span
                className="script text-4xl"
                style={{
                  color: "#6e5222",
                  textShadow: "0 1px 0 rgba(255,255,255,0.45)",
                }}
              >
                A&C
              </span>
            </motion.button>

            <motion.p
              className="text-[10px] uppercase tracking-[0.3em] text-white/80"
              animate={opened ? { opacity: 0 } : { opacity: [0.4, 1, 0.4] }}
              transition={
                opened
                  ? { duration: 0.3 }
                  : { repeat: Infinity, duration: 2.2, ease: "easeInOut" }
              }
            >
              Toque para abrir
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
