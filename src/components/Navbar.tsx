import React, { useState } from "react";
import { Compass, Menu, X, ArrowRight, Waves } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  onSearchClick: () => void;
}

export default function Navbar({ onSearchClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Select Marine Destination Hub", href: "#destinations-hub" },
    { name: "Private Voyages", href: "#voyage-planner" },
    { name: "Impact & Eco", href: "#about-us" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <header className="absolute top-0 left-0 w-full z-40 px-6 py-5 lg:px-12">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-12 lg:gap-16">
        {/* Brand Logo & Name */}
        <motion.div 
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-3 group cursor-pointer shrink-0"
        >
          <div className="relative flex items-center justify-center w-11 h-11 rounded-full border border-cyan-400/30 bg-blue-950/40 backdrop-blur-md overflow-hidden group-hover:border-cyan-400 transition-colors duration-500">
            <Waves className="w-5.5 h-5.5 text-cyan-300 group-hover:rotate-12 transition-transform duration-500" />
            <div className="absolute inset-0 bg-cyan-400/10 scale-0 group-hover:scale-100 rounded-full transition-transform duration-500" />
          </div>
          <div>
            <span className="font-sans font-semibold tracking-[0.24em] text-lg text-white uppercase block sm:inline-block">
              Thalassa
            </span>
            <span className="font-mono text-[9px] min-w-max tracking-widest text-cyan-300/80 block -mt-1 lg:-mt-1.5 uppercase">
              Journeys
            </span>
          </div>
        </motion.div>

        {/* Desktop Navigation Group with generous, responsive spacing and a strong gap to separate it from the logo */}
        <div className="hidden md:flex items-center gap-8 lg:gap-12 xl:gap-16 grow justify-end">
          <nav className="flex items-center gap-8 lg:gap-10 xl:gap-12">
            {navLinks.map((link, idx) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative text-sm font-sans font-medium text-slate-200/90 hover:text-white tracking-widest transition-colors py-2 uppercase text-[10px] lg:text-[11px] whitespace-nowrap"
              >
                {link.name}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-cyan-400 transition-all duration-300 hover:w-full group-hover:w-full font-sans"></span>
              </motion.a>
            ))}
          </nav>

          {/* Luxury CTA Button as part of the same gap layout */}
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={onSearchClick}
            className="relative px-6 py-2.5 rounded-full bg-cyan-500/10 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 font-sans font-bold text-xs tracking-wider border border-cyan-400/30 hover:border-cyan-300 transition-all duration-300 uppercase shadow-[0_0_15px_rgba(34,211,238,0.1)] hover:shadow-[0_0_25px_rgba(34,211,238,0.3)] cursor-pointer whitespace-nowrap shrink-0"
          >
            Book Expedition
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-slate-200 hover:text-white bg-blue-950/40 backdrop-blur-md rounded-full border border-cyan-400/20"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-[74px] left-0 w-full bg-slate-950/95 backdrop-blur-xl border-b border-blue-900/30 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="font-sans text-lg font-medium text-slate-300 hover:text-cyan-400 transition-colors uppercase tracking-widest text-sm"
                >
                  {link.name}
                </a>
              ))}
              <hr className="border-blue-900/20" />
              <button
                onClick={() => {
                  setIsOpen(false);
                  onSearchClick();
                }}
                className="w-full flex items-center justify-between px-5 py-3 rounded-xl bg-cyan-400 text-slate-950 font-sans font-bold tracking-widest text-xs uppercase"
              >
                <span>Reserve Expedition</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
