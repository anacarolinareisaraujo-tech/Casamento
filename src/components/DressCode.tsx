import { motion } from "motion/react";
import { Shirt, User } from "lucide-react";

export default function DressCode() {
  return (
    <section id="traje" className="py-24 bg-white relative">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="uppercase tracking-[0.2em] text-xs text-wedding-gold font-medium mb-3">
            Traje
          </h3>
          <h2 className="text-3xl md:text-5xl serif tracking-wide text-wedding-dark mb-6">
            Dress Code
          </h2>
          <p className="text-sm font-light text-wedding-dark/80 tracking-wider mb-12 max-w-2xl mx-auto leading-relaxed">
            Para celebrarmos juntos este momento tão especial, sugerimos o traje{" "}
            <span className="font-medium">Esporte Fino / Social</span>. <br />
            Como a cerimônia será realizada na igreja, pedimos gentilmente
            atenção à modéstia e ao recato, evitando roupas muito curtas ou
            decotes profundos.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-2xl mx-auto">
            <div className="flex flex-col items-center p-8 bg-wedding-cream border border-wedding-sage/20">
              <User
                strokeWidth={1}
                size={40}
                className="text-wedding-sage mb-4"
              />
              <h4 className="font-medium tracking-widest uppercase text-sm mb-4">
                Para as Mulheres
              </h4>
              <p className="text-xs font-light text-wedding-dark/70 leading-relaxed">
                Vestidos longos, midi ou tailleurs. Evite a cor branca
                (exclusiva da noiva) e tons muito claros que se aproximem do
                branco.
              </p>
            </div>

            <div className="flex flex-col items-center p-8 bg-wedding-cream border border-wedding-sage/20">
              <Shirt
                strokeWidth={1}
                size={40}
                className="text-wedding-sage mb-4"
              />
              <h4 className="font-medium tracking-widest uppercase text-sm mb-4">
                Para os Homens
              </h4>
              <p className="text-xs font-light text-wedding-dark/70 leading-relaxed">
                Terno (com ou sem gravata), calça social e camisa. Prefira cores
                escuras ou neutras.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
