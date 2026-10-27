import { MapPin, Calendar, Clock } from "lucide-react";
import { motion } from "motion/react";

export default function HistoryAndDetails() {
  return (
    <section
      id="casal"
      className="py-24 md:py-32 bg-wedding-cream flex flex-col items-center"
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-5xl serif mb-8 tracking-wide text-wedding-dark">
            O Início de Uma Nova Família
          </h2>

          <p className="text-sm md:text-base leading-relaxed tracking-wider font-light text-wedding-dark/80 mb-12">
            "O matrimônio não é, para um cristão, uma simples instituição
            social, nem muito menos um remédio para as fraquezas humanas. É uma
            autêntica vocação sobrenatural... Um grande sacramento em Cristo e
            na Igreja." <br />
            <span className="italic mt-2 block text-xs">
              São Josemaria Escrivá
            </span>
          </p>

          <div className="flex justify-center mb-16">
            <div className="w-px h-16 bg-wedding-sage/50"></div>
          </div>
        </motion.div>
      </div>

      <div
        id="local"
        className="w-full max-w-6xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center"
      >
        {/* Date and Location Text */}
        <motion.div
          className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 lg:pl-12"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div>
            <h3 className="uppercase tracking-[0.2em] text-xs text-wedding-gold font-medium mb-3">
              Cerimônia e Recepção
            </h3>
            <h2 className="text-3xl lg:text-4xl serif text-wedding-dark mb-4">
              Alegria e Devoção
            </h2>
            <p className="text-sm tracking-wide font-light text-wedding-dark/70 leading-relaxed max-w-md">
              Será uma grande honra e alegria receber nossos familiares e amigos
              íntimos para testemunhar e celebrar a nossa união perante Deus.
            </p>
          </div>

          <div className="flex items-start gap-4 text-left">
            <Calendar
              className="w-5 h-5 text-wedding-sage mt-1 shrink-0"
              strokeWidth={1.5}
            />
            <div>
              <p className="font-medium tracking-widest uppercase text-sm">
                sábado, 8 de Julho de 2028
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 text-left">
            <Clock
              className="w-5 h-5 text-wedding-sage mt-1 shrink-0"
              strokeWidth={1.5}
            />
            <div>
              <p className="font-medium tracking-widest uppercase text-sm">
                16:00 horas
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 text-left">
            <MapPin
              className="w-5 h-5 text-wedding-sage mt-1 shrink-0"
              strokeWidth={1.5}
            />
            <div>
              <p className="font-medium tracking-widest uppercase text-sm mb-1">
                Capela Santa Rita de Cássia
              </p>
              <p className="text-xs text-wedding-dark/60 font-light mb-auto">
                Anápolis, GO
              </p>
              <a
                href="https://maps.google.com/maps?q=Capela+Santa+Rita+de+C%C3%A1ssia+An%C3%A1polis"
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-3 text-[10px] tracking-widest uppercase border-b border-wedding-gold text-wedding-gold hover:text-wedding-dark hover:border-wedding-dark transition-colors pb-1"
              >
                Abrir no Mapa
              </a>
            </div>
          </div>
        </motion.div>

        {/* Map / Image split block */}
        <motion.div
          className="w-full h-[400px] lg:h-[500px] bg-gray-200 relative overflow-hidden"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Aesthetic placeholder for Map. In a real app we can embed Google Maps iframe */}
          <iframe
            src="https://maps.google.com/maps?q=Capela+Santa+Rita+de+C%C3%A1ssia+An%C3%A1polis&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Local do Casamento"
            className="filter grayscale-[50%] contrast-[0.9]"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
}
