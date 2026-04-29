import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Image with overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://i.postimg.cc/FK7q0sb4/DSC00238.jpg')",
          backgroundPosition: "50% 30%", // Adjust to focus on the couple
        }}
      >
        {/* Subtle dark gradient overlay to ensure text legibility */}
        <div className="absolute inset-0 bg-black/30 bg-gradient-to-t from-black/50 via-transparent to-black/20"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full h-full pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex flex-col items-center gap-4"
        >
          <p className="text-white text-xs md:text-sm tracking-[0.3em] uppercase opacity-90 drop-shadow-md">
            Com a bênção de Deus e de nossos pais
          </p>

          <h1 className="text-5xl md:text-7xl lg:text-8xl text-white script py-4 drop-shadow-lg">
            Caio & Ana Carolina
          </h1>

          <div className="w-16 h-px bg-white/60 my-4"></div>

          <p className="text-white text-sm md:text-base tracking-[0.2em] font-light drop-shadow-md">
            Vamos nos Casar!
          </p>
        </motion.div>
      </div>

      {/* Down Arrow */}
      <motion.div
        className="absolute bottom-10 z-10 text-white flex flex-col items-center gap-2 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        onClick={() =>
          document
            .getElementById("casal")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      >
        <span className="text-[10px] uppercase tracking-[0.2em] opacity-80">
          Rolar
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown size={20} className="opacity-80" />
        </motion.div>
      </motion.div>
    </section>
  );
}
