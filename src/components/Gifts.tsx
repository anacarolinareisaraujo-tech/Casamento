import { motion } from "motion/react";
import { Gift, Plane, Home, Coffee } from "lucide-react";

export default function Gifts() {
  const gifts = [
    {
      id: 1,
      name: "Cota de Lua de Mel",
      description: "Ajude-nos a realizar a viagem dos nossos sonhos.",
      price: "R$ 500,00",
      icon: <Plane strokeWidth={1} size={32} className="text-wedding-sage" />,
    },
    {
      id: 2,
      name: "Jantar Romântico",
      description: "Um jantar inesquecível em nossa lua de mel.",
      price: "R$ 350,00",
      icon: <Gift strokeWidth={1} size={32} className="text-wedding-sage" />,
    },
    {
      id: 3,
      name: "Máquina de Café",
      description: "Para os cafés da manhã na nossa nova casa.",
      price: "R$ 800,00",
      icon: <Coffee strokeWidth={1} size={32} className="text-wedding-sage" />,
    },
    {
      id: 4,
      name: "Cota Construção",
      description: "Contribua com a construção do nosso lar.",
      price: "R$ 1.000,00",
      icon: <Home strokeWidth={1} size={32} className="text-wedding-sage" />,
    },
  ];

  return (
    <section
      id="presentes"
      className="py-24 bg-wedding-cream border-t border-wedding-sage/20"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="uppercase tracking-[0.2em] text-xs text-wedding-gold font-medium mb-3">
              Compartilhe o amor
            </h3>
            <h2 className="text-3xl md:text-5xl serif tracking-wide text-wedding-dark mb-4">
              Lista de Presentes
            </h2>
            <p className="text-sm font-light text-wedding-dark/60 tracking-wider max-w-xl mx-auto">
              O maior presente que podemos receber é a sua presença e orações.
              No entanto, se desejar nos abençoar com um presente, preparamos
              algumas opções.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {gifts.map((gift, i) => (
            <motion.div
              key={gift.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="bg-white p-8 group border border-transparent hover:border-wedding-sage/30 hover:shadow-sm transition-all text-center flex flex-col items-center"
            >
              <div className="mb-6 opacity-80 group-hover:scale-110 transition-transform duration-500">
                {gift.icon}
              </div>
              <h4 className="font-medium tracking-widest uppercase text-xs mb-3">
                {gift.name}
              </h4>
              <p className="font-light text-xs text-wedding-dark/60 mb-6 flex-1">
                {gift.description}
              </p>
              <div className="w-full">
                <p className="serif text-xl text-wedding-dark mb-4">
                  {gift.price}
                </p>
                <button className="btn-luxury w-full text-[10px]">
                  Presentear
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm font-light text-wedding-dark/60 tracking-wider mb-6">
            Também disponibilizamos nossa chave PIX para qualquer valor.
          </p>
          <button className="btn-luxury-filled">Copiar Chave PIX</button>
        </div>
      </div>
    </section>
  );
}
