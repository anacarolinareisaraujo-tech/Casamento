import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Tv,
  Monitor,
  WashingMachine,
  Utensils,
  Microwave,
  Plane,
  Music,
} from "lucide-react";

export default function Gifts() {
  const [selectedGift, setSelectedGift] = useState<(typeof gifts)[0] | null>(
    null,
  );

  const gifts = [
    {
      id: 1,
      name: "Geladeira",
      description: "Uma ajudinha para mantermos tudo fresco em nossa casa.",
      price: "R$ 3.500,00",
      pixKey: "caioaesper1@gmail.com",
      icon: <Monitor strokeWidth={1} size={32} className="text-wedding-sage" />,
    },
    {
      id: 2,
      name: "Fogão",
      description: "Para muitas receitas e jantares especiais.",
      price: "R$ 1.200,00",
      pixKey: "caioaesper1@gmail.com",
      icon: (
        <Utensils strokeWidth={1} size={32} className="text-wedding-sage" />
      ),
    },
    {
      id: 3,
      name: "Microondas",
      description: "A praticidade que não pode faltar no dia a dia.",
      price: "R$ 600,00",
      pixKey: "caioaesper1@gmail.com",
      icon: (
        <Microwave strokeWidth={1} size={32} className="text-wedding-sage" />
      ),
    },
    {
      id: 4,
      name: "Máquina de Lavar",
      description: "Para nos ajudar com a limpeza da nossa casa.",
      price: "R$ 2.000,00",
      pixKey: "caioaesper1@gmail.com",
      icon: (
        <WashingMachine
          strokeWidth={1}
          size={32}
          className="text-wedding-sage"
        />
      ),
    },
    {
      id: 5,
      name: "Smart TV",
      description: "Para nossas noites de filmes e maratonas de séries.",
      price: "R$ 2.500,00",
      pixKey: "caioaesper1@gmail.com",
      icon: <Tv strokeWidth={1} size={32} className="text-wedding-sage" />,
    },
    {
      id: 6,
      name: "Cota de Lua de Mel",
      description: "Ajude-nos a realizar a viagem dos nossos sonhos.",
      price: "R$ 500,00",
      pixKey: "caioaesper1@gmail.com",
      icon: <Plane strokeWidth={1} size={32} className="text-wedding-sage" />,
    },
  ];

  const handleCopyPix = () => {
    if (selectedGift) {
      navigator.clipboard.writeText(selectedGift.pixKey);
      alert("Chave PIX copiada: " + selectedGift.pixKey);
    } else {
      navigator.clipboard.writeText("caioaesper1@gmail.com");
      alert("Chave PIX copiada: caioaesper1@gmail.com");
    }
  };

  return (
    <section
      id="presentes"
      className="py-24 bg-wedding-cream border-t border-wedding-sage/20 relative"
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
              Sua presença é o nosso maior presente! Mas se desejar nos abençoar
              ajudando a montar nossa nova casa, preparamos uma lista de cotas
              para os nossos eletrodomésticos.
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
                <p className="serif text-xl text-wedding-dark mb-4">
                  {gift.price}
                </p>
                <button
                  onClick={() => setSelectedGift(gift)}
                  className="btn-luxury w-full text-[10px]"
                >
                  Presentear
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm font-light text-wedding-dark/60 tracking-wider mb-6">
            Você também pode contribuir com qualquer outro valor usando a nossa
            chave PIX.
          </p>
          <button
            onClick={() => {
              setSelectedGift(null);
              handleCopyPix();
            }}
            className="btn-luxury-filled"
          >
            Copiar Chave PIX (E-mail)
          </button>
        </div>
      </div>

      {/* Modal / Popup for Gift */}
      <AnimatePresence>
        {selectedGift && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={() => setSelectedGift(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-wedding-cream p-8 max-w-md w-full shadow-xl relative border border-wedding-sage/20 text-center"
            >
              <button
                onClick={() => setSelectedGift(null)}
                className="absolute top-4 right-4 text-wedding-dark/50 hover:text-wedding-dark transition-colors"
              >
                <X size={20} />
              </button>

              <div className="mb-6 flex justify-center text-wedding-sage">
                {selectedGift.icon}
              </div>

              <h3 className="serif text-2xl text-wedding-dark mb-2">
                Comprar {selectedGift.name}
              </h3>
              <p className="text-wedding-dark/70 text-sm font-light mb-6 tracking-wide">
                Você escolheu nos presentear com a cota de{" "}
                <strong>{selectedGift.price}</strong> para este item. Muito
                obrigado pelo carinho!
              </p>

              <div className="bg-white p-4 mb-6 border border-wedding-sage/30 text-sm">
                <p className="font-medium tracking-widest text-xs uppercase mb-2">
                  Nossa Chave PIX
                </p>
                <p className="font-mono text-wedding-dark select-all">
                  {selectedGift.pixKey}
                </p>
                <p className="text-[10px] text-wedding-dark/50 mt-1 uppercase">
                  Nome: Caio Esper / Ana Carolina
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedGift(null)}
                  className="btn-luxury flex-1 text-[10px]"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleCopyPix}
                  className="btn-luxury-filled flex-1 text-[10px]"
                >
                  Copiar PIX
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
