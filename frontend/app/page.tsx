'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';

// --- BASE DE DATOS FALSA (EMBEBIDA) ---
const fake_db = [
    {
        "id": 1,
        "name": "Satoru Gojo - Hollow Purple",
        "anime": "Jujutsu Kaisen",
        "price": 85000,
        "image_url": "https://i.pinimg.com/736x/32/5a/6a/325a6a090680951a3788753238692634.jpg",
        "stock": 5
    },
    {
        "id": 2,
        "name": "Monkey D. Luffy - Gear 5",
        "anime": "One Piece",
        "price": 92000,
        "image_url": "https://m.media-amazon.com/images/I/61F2Kx+vLWL._AC_SL1500_.jpg",
        "stock": 2
    },
    {
        "id": 3,
        "name": "Denji & Pochita",
        "anime": "Chainsaw Man",
        "price": 60000,
        "image_url": "https://m.media-amazon.com/images/I/61eY27s+1OL._AC_UF894,1000_QL80_.jpg",
        "stock": 10
    },
    {
        "id": 4,
        "name": "Son Goku - Kaio-ken",
        "anime": "Dragon Ball Z",
        "price": 75000,
        "image_url": "placeholder",
        "stock": 10
    },
    {
        "id": 5,
        "name": "Naruto Uzumaki - Rasengan",
        "anime": "Naruto Shippuden",
        "price": 70000,
        "image_url": "placeholder",
        "stock": 8
    },
    {
        "id": 6,
        "name": "Eren Yeager - Attack Titan",
        "anime": "Attack on Titan",
        "price": 88000,
        "image_url": "placeholder",
        "stock": 4
    },
    {
        "id": 7,
        "name": "Tanjiro Kamado - Hinokami Kagura",
        "anime": "Demon Slayer",
        "price": 82000,
        "image_url": "placeholder",
        "stock": 6
    }
];

// --- COMPONENTES INTERNOS ---
const ProductCard = ({ name, anime, price, image }: any) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="group relative bg-[#0a0a0a] border border-gray-800 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300"
  >
    <div className="h-64 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent z-10" />
      <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      <span className="absolute top-3 right-3 z-20 bg-cyan-900/80 text-cyan-200 text-[10px] font-bold px-2 py-1 rounded border border-cyan-500/30 uppercase tracking-widest backdrop-blur-md">
        {anime}
      </span>
    </div>
    <div className="p-4 relative z-20">
      <h3 className="text-lg font-bold text-white mb-1 truncate">{name}</h3>
      <div className="flex justify-between items-end mt-2">
        <p className="text-xl font-bold text-cyan-400">${price.toLocaleString('es-AR')}</p>
        <button className="text-xs bg-white text-black font-bold px-3 py-1 rounded hover:bg-cyan-400 transition-colors uppercase">
          Agregar
        </button>
      </div>
    </div>
  </motion.div>
);

export default function Home() {
  const products = fake_db;
  const catalogRef = useRef<HTMLElement>(null);

  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-cyan-500 selection:text-black font-sans">
      
      {/* NAVBAR */}
      <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 animate-pulse"></div>
            <span className="font-bold tracking-widest text-lg">IKIGAI <span className="text-cyan-400">ANIME</span></span>
          </div>
          <div className="hidden md:flex gap-6 text-sm font-medium text-gray-400 uppercase tracking-wide">
            <a href="#catalog" onClick={(e) => { e.preventDefault(); scrollToCatalog(); }} className="hover:text-white transition-colors">Figuras</a>
            <a href="#" className="hover:text-white transition-colors">Pre-Venta</a>
            <a href="#" className="hover:text-white transition-colors text-cyan-400">Ofertas</a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative h-[80vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden">
        {/* Fondo Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-cyan-900/30 border border-cyan-500/30 text-cyan-400 text-xs font-bold tracking-[0.2em] mb-6 uppercase">
            Envíos a toda Argentina 🇦🇷
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
            IKIGAI ANIME
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 font-light">
            Coleccionables Originales & Cultura Japonesa. <br/>
            Encontrá tu propósito, completá tu colección.
          </p>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-cyan-500 text-black font-bold rounded-full shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:bg-cyan-400 transition-all"
            onClick={scrollToCatalog}
          >
            VER CATÁLOGO
          </motion.button>
        </motion.div>
      </section>

      {/* PRODUCT GRID */}
      <section ref={catalogRef} id="catalog" className="max-w-7xl mx-auto px-6 py-20 border-t border-white/5">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold">Novedades</h2>
            <p className="text-gray-500 text-sm mt-1">Importación directa // Febrero 2026</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product: any) => (
            <ProductCard 
              key={product.id}
              name={product.name}
              anime={product.anime}
              price={product.price}
              image={product.image_url}
            />
          ))}
        </div>
      </section>
    </main>
  );
}