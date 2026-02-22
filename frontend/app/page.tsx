'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

// --- LOGO COMPONENT ---
const Logo = () => (
  <div className="relative flex items-center gap-3 group cursor-pointer">
    <div className="relative">
      <div className="absolute inset-0 bg-cyan-500 blur-md opacity-40 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
      <svg width="40" height="40" viewBox="0 0 100 100" className="relative z-10 drop-shadow-2xl">
        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/20" />
        <circle cx="50" cy="50" r="45" fill="none" stroke="url(#logoGradient)" strokeWidth="4" strokeDasharray="283" strokeDashoffset="70" className="animate-[spin_4s_linear_infinite]" />
        <path d="M35 30 L65 30 M50 30 L50 70 M35 70 L65 70" stroke="white" strokeWidth="8" strokeLinecap="round" />
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>
    </div>
    <span className="font-black tracking-[0.2em] text-xl flex flex-col leading-none">
      <span className="text-white">IKIGAI</span>
      <span className="text-cyan-400 text-[0.6rem] tracking-[0.5em] ml-0.5">ANIME SHOP</span>
    </span>
  </div>
);

// --- FALLBACK DB CON LINKS MÁS FIABLES ---
const fallback_db = [
    {
        "id": 1,
        "name": "Satoru Gojo - Unlimited Void",
        "anime": "Jujutsu Kaisen",
        "price": 85000,
        "image_url": "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=1000&auto=format&fit=crop",
        "stock": 5
    },
    {
        "id": 2,
        "name": "Luffy Gear 5 - Sun God Nika",
        "anime": "One Piece",
        "price": 92000,
        "image_url": "https://images.unsplash.com/photo-1613333151422-7917737c7af1?q=80&w=1000&auto=format&fit=crop",
        "stock": 2
    },
    {
        "id": 3,
        "name": "Chainsaw Man - Pochita Edition",
        "anime": "Chainsaw Man",
        "price": 60000,
        "image_url": "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1000&auto=format&fit=crop",
        "stock": 10
    },
    {
        "id": 4,
        "name": "Goku Super Saiyan God",
        "anime": "Dragon Ball Z",
        "price": 75000,
        "image_url": "https://images.unsplash.com/photo-1534333237741-03919e82db9a?q=80&w=1000&auto=format&fit=crop",
        "stock": 10
    }
];

// --- COMPONENTES INTERNOS ---
const ProductCard = ({ name, anime, price, image, index }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    viewport={{ once: true }}
    whileHover={{ y: -10 }}
    className="group relative bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-500"
  >
    <div className="h-80 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10" />
      <img 
        src={image} 
        alt={name} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
        onError={(e: any) => e.target.src = "https://placehold.co/400x600/0a0a0a/06b6d4?text=IKIGAI+ANIME"}
      />
      <div className="absolute top-4 left-4 z-20">
        <span className="bg-black/50 backdrop-blur-md text-cyan-400 text-[10px] font-black px-3 py-1 rounded-full border border-cyan-500/30 uppercase tracking-[0.2em]">
          {anime}
        </span>
      </div>
    </div>
    <div className="p-6 relative z-20">
      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{name}</h3>
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Precio</span>
          <p className="text-2xl font-black text-white">${price.toLocaleString('es-AR')}</p>
        </div>
        <motion.button 
          whileTap={{ scale: 0.9 }}
          className="bg-white text-black h-12 w-12 rounded-xl flex items-center justify-center hover:bg-cyan-400 transition-colors shadow-lg"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
        </motion.button>
      </div>
    </div>
  </motion.div>
);

export default function Home() {
  const [products, setProducts] = useState<any[]>(fallback_db);
  const catalogRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
          setProducts(response.data);
        }
      } catch (error) {
        console.error("API offline, usando fallback.");
      }
    };
    fetchProducts();
  }, []);

  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-cyan-500 selection:text-black font-sans">
      
      {/* GLOWING BACKGROUND DECORATION */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* NAVBAR */}
      <nav className="fixed w-full z-50 bg-black/40 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-8 h-20 flex justify-between items-center">
          <Logo />
          <div className="hidden md:flex gap-10 text-[10px] font-black uppercase tracking-[0.3em]">
            <a href="#catalog" onClick={(e) => { e.preventDefault(); scrollToCatalog(); }} className="hover:text-cyan-400 transition-colors">Catálogo</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Pre-Venta</a>
            <a href="#" className="text-cyan-400 hover:text-white transition-colors">Venta Flash</a>
          </div>
          <button className="relative p-2 hover:text-cyan-400 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6zM3 6h18M16 10a4 4 0 01-8 0"/></svg>
            <span className="absolute -top-1 -right-1 bg-cyan-500 text-black text-[8px] font-bold h-4 w-4 flex items-center justify-center rounded-full">0</span>
          </button>
        </div>
      </nav>

      {/* HERO SECTION MEJORADA */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_50%)]" />
        
        {/* Elementos Flotantes de Animación */}
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-tr from-cyan-500/20 to-transparent blur-2xl rounded-full"
        />
        <motion.div 
          animate={{ y: [0, 30, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-bl from-purple-500/20 to-transparent blur-3xl rounded-full"
        />

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="z-10"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <span className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-white text-[10px] font-black tracking-[0.4em] uppercase backdrop-blur-md">
              Buenos Aires // Argentina
            </span>
          </motion.div>

          <h1 className="text-6xl md:text-9xl font-black mb-6 tracking-tighter leading-none">
            <span className="text-white block">ANIME</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-500 animate-gradient-x">REVOLUTION</span>
          </h1>

          <p className="text-lg text-gray-400 max-w-xl mx-auto mb-12 font-medium tracking-wide">
            Coleccionables premium importados. Encuentra tu propósito en cada detalle de nuestras figuras originales.
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(6,182,212,0.5)" }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToCatalog}
              className="group px-10 py-5 bg-cyan-500 text-black font-black text-sm rounded-2xl transition-all relative overflow-hidden"
            >
              <span className="relative z-10 tracking-[0.2em] uppercase">Explorar Catálogo</span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 opacity-20" />
            </motion.button>
            <button className="px-10 py-5 bg-white/5 hover:bg-white/10 text-white font-black text-sm rounded-2xl transition-all border border-white/10 tracking-[0.2em] uppercase backdrop-blur-md">
              Pre-Ordenes
            </button>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-cyan-500 opacity-50"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 13l5 5 5-5M7 6l5 5 5-5"/></svg>
        </motion.div>
      </section>

      {/* PRODUCT GRID */}
      <section ref={catalogRef} id="catalog" className="max-w-7xl mx-auto px-8 py-32 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-1 w-12 bg-cyan-500 rounded-full" />
              <span className="text-cyan-500 text-xs font-black uppercase tracking-[0.3em]">Drop 01 // 2026</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter">NUEVAS LLEGADAS</h2>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-white/5 rounded-xl text-xs font-bold hover:bg-cyan-500 hover:text-black transition-all border border-white/10">FIGURAS</button>
            <button className="px-6 py-3 bg-white/5 rounded-xl text-xs font-bold hover:bg-cyan-500 hover:text-black transition-all border border-white/10">RESINAS</button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product: any, index: number) => (
            <ProductCard 
              key={product.id}
              index={index}
              name={product.name}
              anime={product.anime}
              price={product.price}
              image={product.image_url}
            />
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 bg-black/50 py-20 px-8 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <Logo />
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">TikTok</a>
            <a href="#" className="hover:text-white transition-colors">WhatsApp</a>
          </div>
          <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">
            © 2026 IKIGAI ANIME SHOP // MADE FOR COLLECTORS
          </p>
        </div>
      </footer>
    </main>
  );
}