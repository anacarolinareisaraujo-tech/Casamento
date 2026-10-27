import { motion } from "motion/react";
import { Volume2, VolumeX } from "lucide-react";

export default function MusicToggle({
  playing,
  onToggle,
}: {
  playing: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      aria-label={playing ? "Pausar música" : "Tocar música"}
      className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-wedding-cream/90 backdrop-blur-md border border-wedding-sage/30 shadow-sm flex items-center justify-center text-wedding-dark hover:bg-wedding-cream transition-colors"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 4.2, duration: 0.6 }}
    >
      {playing ? (
        <Volume2 size={18} strokeWidth={1.5} />
      ) : (
        <VolumeX size={18} strokeWidth={1.5} />
      )}
    </motion.button>
  );
}
