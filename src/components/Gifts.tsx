import { motion } from "motion/react";
import {
  Tv,
  Monitor,
  WashingMachine,
  Utensils,
  Microwave,
  Plane,
  ExternalLink,
} from "lucide-react";

const gifts = [
  {
    id: 1,
    name: "Geladeira",
    description: "Uma ajudinha para mantermos tudo fresco em nossa casa.",
    price: "R$ 3.500,00",
    store: "Americanas",
    link: "", // cole aqui o link do produto
    icon: <Monitor strokeWidth={1} size={32} className="text-wedding-sage" />,
  },
  {
    id: 2,
    name: "Fogão",
    description: "Para muitas receitas e jantares especiais.",
    price: "R$ 1.200,00",
    store: "Magazine Luiza",
    link: "", // cole aqui o link do produto
    icon: <Utensils strokeWidth={1} size={32} className="text-wedding-sage" />,
  },
  {
    id: 3,
    name: "Microondas",
    description: "A praticidade que não pode faltar no dia a dia.",
    price: "R$ 600,00",
    store: "Amazon",
    link: "", // cole aqui o link do produto
    icon: <Microwave strokeWidth={1} size={32} className="text-wedding-sage" />,
  },
  {
    id: 4,
    name: "Máquina de Lavar",
    description: "Para nos ajudar com a limpeza da nossa casa.",
    price: "R$ 2.000,00",
    store: "Casas Bahia",
    link: "", // cole aqui o link do produto
    icon: (
      <WashingMachine strokeWidth={1} size={32} className="text-wedding-sage" />
    ),
  },
  {
    id: 5,
    name: "Smart TV",
    description: "Para nossas noites de filmes e maratonas de séries.",
    price: "R$ 2.500,00",
    store: "Amazon",
    link: "", // cole aqui o link do produto
    icon: <Tv strokeWidth={1} size={32} className="text-wedding-sage" />,
  },
  {
    id: 6,
    name: "Cota de Lua de Mel",
    description: "Ajude-nos a realizar a viagem dos nossos sonhos.",
    price: "R$ 500,00",
    store: "",
    link: "", // cole aqui o link do produto (ou plataforma de viagem)
    icon: <Plane strokeWidth={1} size={32} className="text-wedding-sage" />,
  },
];

export default function Gifts() {
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
              Sua presença é o nosso maior presente! Mas se desejar nos
              abençoar, selecionamos alguns itens para a nossa nova casa.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

              <div className="w-full mt-auto">
                <p className="serif text-xl text-wedding-dark mb-1">
                  {gift.price}
                </p>

                {gift.store && (
                  <p className="text-[10px] uppercase tracking-widest text-wedding-dark/40 mb-4">
                    {gift.store}
                  </p>
                )}

                {gift.link ? (
                  <a
                    href={gift.link}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-luxury w-full text-[10px] flex items-center justify-center gap-2"
                  >
                    Ver produto
                    <ExternalLink size={11} strokeWidth={1.5} />
                  </a>
                ) : (
                  <div className="btn-luxury w-full text-[10px] opacity-40 cursor-not-allowed select-none">
                    Em breve
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
