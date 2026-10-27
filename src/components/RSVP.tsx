import { useState } from "react";
import { motion } from "motion/react";

export default function RSVP() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    attending: "yes",
    guests: "1",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Em uma app real isso seria enviado para um backend
    setIsSubmitted(true);
  };

  return (
    <section id="rsvp" className="py-24 bg-white relative">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="uppercase tracking-[0.2em] text-xs text-wedding-gold font-medium mb-3">
            Sua presença é fundamental
          </h3>
          <h2 className="text-3xl md:text-5xl serif tracking-wide text-wedding-dark mb-4">
            Confirme sua Presença
          </h2>
          <p className="text-sm font-light text-wedding-dark/60 tracking-wider mb-12">
            Por favor, confirme sua presença até o dia 8 de Junho de 2028.
          </p>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-wedding-cream p-12 border border-wedding-sage/30 shadow-sm"
            >
              <h3 className="text-2xl serif text-wedding-dark mb-2">
                Muito Obrigado!
              </h3>
              <p className="font-light text-sm tracking-widest text-wedding-dark/70 uppercase">
                Sua resposta foi registrada.
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="text-left space-y-6 max-w-xl mx-auto"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-[10px] uppercase font-medium tracking-[0.15em] mb-2"
                >
                  Nome Completo
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full border-b border-wedding-dark/20 bg-transparent py-2 outline-none focus:border-wedding-dark transition-colors font-light text-sm"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-[10px] uppercase font-medium tracking-[0.15em] mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full border-b border-wedding-dark/20 bg-transparent py-2 outline-none focus:border-wedding-dark transition-colors font-light text-sm"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="attending"
                    className="block text-[10px] uppercase font-medium tracking-[0.15em] mb-2"
                  >
                    Você irá comparecer?
                  </label>
                  <select
                    id="attending"
                    className="w-full border-b border-wedding-dark/20 bg-transparent py-2 outline-none focus:border-wedding-dark transition-colors font-light text-sm appearance-none rounded-none"
                    value={formData.attending}
                    onChange={(e) =>
                      setFormData({ ...formData, attending: e.target.value })
                    }
                  >
                    <option value="yes">Sim, estarei lá com alegria!</option>
                    <option value="no">Não poderei comparecer.</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="guests"
                    className="block text-[10px] uppercase font-medium tracking-[0.15em] mb-2"
                  >
                    Nº de acompanhantes
                  </label>
                  <select
                    id="guests"
                    className="w-full border-b border-wedding-dark/20 bg-transparent py-2 outline-none focus:border-wedding-dark transition-colors font-light text-sm appearance-none rounded-none"
                    value={formData.guests}
                    onChange={(e) =>
                      setFormData({ ...formData, guests: e.target.value })
                    }
                    disabled={formData.attending === "no"}
                  >
                    <option value="0">0 (Vou sozinho/a)</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-[10px] uppercase font-medium tracking-[0.15em] mb-2"
                >
                  Mensagem para os noivos (Opcional)
                </label>
                <textarea
                  id="message"
                  rows={2}
                  className="w-full border-b border-wedding-dark/20 bg-transparent py-2 outline-none focus:border-wedding-dark transition-colors font-light text-sm resize-none"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                ></textarea>
              </div>

              <div className="pt-6 text-center">
                <button
                  type="submit"
                  className="btn-luxury-filled w-full md:w-auto"
                >
                  Enviar Confirmação
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
