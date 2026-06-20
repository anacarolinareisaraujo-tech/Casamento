import { useState, useEffect } from "react";
import { motion } from "motion/react";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    // 10 de Julho de 2027, 16:00
    const targetDate = new Date("2027-07-10T16:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!timeLeft) return null;

  const timeBlocks = [
    { label: "Dias", value: timeLeft.days },
    { label: "Horas", value: timeLeft.hours },
    { label: "Minutos", value: timeLeft.minutes },
    { label: "Segundos", value: timeLeft.seconds },
  ];

  return (
    <section className="bg-wedding-sage/10 py-12 border-y border-wedding-sage/20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="uppercase tracking-[0.2em] text-xs text-wedding-gold font-medium mb-8">
            Contagem Regressiva
          </h3>
          <div className="flex justify-center gap-4 md:gap-12">
            {timeBlocks.map((block) => (
              <div key={block.label} className="flex flex-col items-center">
                <span className="text-3xl md:text-5xl serif text-wedding-dark mb-2 font-medium">
                  {block.value.toString().padStart(2, "0")}
                </span>
                <span className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-wedding-dark/60 font-medium">
                  {block.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
