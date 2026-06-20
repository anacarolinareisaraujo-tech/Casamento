import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "O Casal", href: "#casal" },
    { name: "Local e Data", href: "#local" },
    { name: "Traje", href: "#traje" },
    { name: "Confirme sua Presença", href: "#rsvp" },
    { name: "Lista de Presentes", href: "#presentes" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          isScrolled
            ? "bg-wedding-cream/90 backdrop-blur-md shadow-sm py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
          <div className="flex-1">
            <a
              href="#"
              className={`text-2xl script ${isScrolled ? "text-wedding-dark" : "text-white drop-shadow-md"}`}
            >
              A & C
            </a>
          </div>

          <div className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-[10px] tracking-[0.15em] uppercase hover:opacity-70 transition-opacity ${
                  isScrolled
                    ? "text-wedding-dark"
                    : "text-white font-medium drop-shadow-md"
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={
                isScrolled ? "text-wedding-dark" : "text-white drop-shadow-md"
              }
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-wedding-cream pt-24 px-6 flex flex-col items-center gap-8"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg tracking-[0.1em] uppercase text-wedding-dark border-b border-transparent hover:border-wedding-dark pb-1"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
