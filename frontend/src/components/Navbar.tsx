'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-ikigai-dark/80 backdrop-blur-md border-b border-ikigai-metal/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* LOGO ANIMADO */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="relative w-12 h-12"
            >
              {/* Efecto de "Resplandor" detrás del logo */}
              <div className="absolute inset-0 bg-ikigai-cyan blur-xl opacity-20 group-hover:opacity-60 transition-opacity duration-500 rounded-full" />
              
              {/* Tu Logo Concept 2 */}
              <Image 
                src="/logo-ikigai.png" 
                alt="Ikigai Logo" 
                width={50} 
                height={50}
                className="relative z-10 drop-shadow-[0_0_5px_rgba(0,240,255,0.5)]"
              />
            </motion.div>
            
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-widest text-white font-mono">
                IKIGAI <span className="text-ikigai-cyan">ANIME</span>
              </span>
              <span className="text-[10px] text-ikigai-silver/60 tracking-[0.3em] uppercase">
                Collect your purpose
              </span>
            </div>
          </Link>

          {/* MENÚ DE NAVEGACIÓN */}
          <div className="hidden md:flex space-x-8">
            {['Figuras', 'Mangas', 'Katanas', 'Ofertas'].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                whileHover={{ scale: 1.05, color: "#00F0FF" }}
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium uppercase tracking-wide cursor-pointer"
              >
                {item}
              </motion.a>
            ))}
          </div>

          {/* BOTÓN LOGIN / CART */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2 rounded border border-ikigai-cyan text-ikigai-cyan hover:bg-ikigai-cyan hover:text-black transition-all font-bold text-sm shadow-neon"
          >
            INGRESAR
          </motion.button>
        </div>
      </div>
    </nav>
  );
}