import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
      <span className="text-cyan-400 text-[0.6rem] tracking-[0.5em] ml-0.5 uppercase">Anime Shop</span>
    </span>
  </div>
);

// --- FLOATING TEXT BACKGROUND ---
const FloatingLetters = () => {
  const letters = "IKIGAIANIME".split("");
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10 select-none">
      {letters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%",
            opacity: 0 
          }}
          animate={{ 
            y: ["0%", "100%", "0%"],
            x: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
            opacity: [0.1, 0.5, 0.1],
            rotate: [0, 360]
          }}
          transition={{ 
            duration: 20 + Math.random() * 20, 
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute text-[15vw] font-black text-white/5 whitespace-nowrap"
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
};

const ProductCard = ({ name, anime, price, image, index }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: (index % 4) * 0.1, duration: 0.5 }}
    viewport={{ once: true }}
    whileHover={{ y: -15, scale: 1.02 }}
    className="group relative bg-[#0d0d0d] border border-white/5 rounded-3xl overflow-hidden hover:border-cyan-500/40 transition-all duration-700 shadow-2xl"
  >
    <div className="h-[400px] overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent z-10" />
      <motion.img 
        src={image} 
        alt={name} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale-[20%] group-hover:grayscale-0" 
        onError={(e) => e.target.src = "https://placehold.co/400x600/0a0a0a/06b6d4?text=IKIGAI+ANIME"}
      />
      <div className="absolute top-6 left-6 z-20">
        <span className="bg-cyan-500/10 backdrop-blur-xl text-cyan-400 text-[10px] font-black px-4 py-2 rounded-full border border-cyan-500/30 uppercase tracking-[0.2em]">
          {anime}
        </span>
      </div>
    </div>
    <div className="p-8 relative z-20">
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors line-clamp-1">{name}</h3>
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-black mb-1">Precio Premium</span>
          <p className="text-3xl font-black text-white tracking-tighter">${price.toLocaleString('es-AR')}</p>
        </div>
        <motion.button 
          whileTap={{ scale: 0.9 }}
          whileHover={{ rotate: 90 }}
          className="bg-white text-black h-14 w-14 rounded-2xl flex items-center justify-center hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
        </motion.button>
      </div>
    </div>
  </motion.div>
);

function App() {
  const [products, setProducts] = useState([]);
  const catalogRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const yRange = useTransform(scrollYProgress, [0, 1], [0, -200]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products");
      }
    };
    fetchProducts();
  }, []);

  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-cyan-500 selection:text-black font-sans overflow-x-hidden">
      
      {/* BACKGROUND EFFECTS */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 blur-[150px] rounded-full" />
      </div>

      {/* NAVBAR */}
      <nav className="fixed w-full z-50 bg-black/60 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-10 h-24 flex justify-between items-center">
          <Logo />
          <div className="hidden md:flex gap-12 text-[11px] font-black uppercase tracking-[0.4em]">
            <a href="#catalog" onClick={(e) => { e.preventDefault(); scrollToCatalog(); }} className="hover:text-cyan-400 transition-all relative group">
              Catálogo
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all group-hover:w-full" />
            </a>
            <a href="#" className="hover:text-cyan-400 transition-all relative group">
              Pre-Venta
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all group-hover:w-full" />
            </a>
            <a href="#" className="text-cyan-400 hover:text-white transition-all">Limited Edition</a>
          </div>
          <button className="relative group p-3 bg-white/5 rounded-2xl hover:bg-cyan-500 transition-all border border-white/10">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:text-black"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6zM3 6h18M16 10a4 4 0 01-8 0"/></svg>
            <span className="absolute -top-1 -right-1 bg-white text-black text-[10px] font-black h-5 w-5 flex items-center justify-center rounded-full border-2 border-black">0</span>
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden">
        <FloatingLetters />
        
        <motion.div 
          style={{ y: yRange }}
          className="z-10 mt-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="mb-8"
          >
             <span className="px-6 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-[10px] font-black tracking-[0.5em] text-cyan-400 uppercase">
               Premium Collector Shop
             </span>
          </motion.div>

          <h1 className="text-7xl md:text-[10rem] font-black mb-8 tracking-tighter leading-[0.85] select-none">
            <span className="text-white block">ANIME</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-500 animate-gradient-x drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]">REVOLUTION</span>
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-16 font-medium tracking-wide leading-relaxed">
            Explora la selección más exclusiva de figuras originales importadas de Japón. Calidad de museo para tu colección personal.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(6,182,212,0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToCatalog}
              className="group px-12 py-6 bg-cyan-500 text-black font-black text-sm rounded-2xl transition-all relative overflow-hidden"
            >
              <span className="relative z-10 tracking-[0.3em] uppercase">VER CATÁLOGO</span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 opacity-20" />
            </motion.button>
            <button className="px-12 py-6 bg-white/5 hover:bg-white/10 text-white font-black text-sm rounded-2xl transition-all border border-white/10 tracking-[0.3em] uppercase backdrop-blur-md">
              Próximos Lanzamientos
            </button>
          </div>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-cyan-500 cursor-pointer"
          onClick={scrollToCatalog}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 13l5 5 5-5M7 6l5 5 5-5"/></svg>
        </motion.div>
      </section>

      {/* CATALOG SECTION */}
      <section ref={catalogRef} id="catalog" className="max-w-7xl mx-auto px-10 py-40 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-1.5 w-20 bg-cyan-500 rounded-full" />
              <span className="text-cyan-500 text-sm font-black uppercase tracking-[0.4em]">Collector Drop // 2026</span>
            </div>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none">NUEVAS ADQUISICIONES</h2>
          </div>
          <div className="flex gap-6 pb-2">
            <button className="px-8 py-4 bg-white/5 rounded-2xl text-[10px] font-black tracking-widest hover:bg-cyan-500 hover:text-black transition-all border border-white/10 uppercase">Scales</button>
            <button className="px-8 py-4 bg-white/5 rounded-2xl text-[10px] font-black tracking-widest hover:bg-cyan-500 hover:text-black transition-all border border-white/10 uppercase">Nendoroids</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {products.map((product, index) => (
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
      <footer className="border-t border-white/10 bg-black py-32 px-10 backdrop-blur-3xl mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-20 items-center">
          <div className="flex flex-col items-center md:items-start">
            <Logo />
            <p className="mt-8 text-gray-500 text-sm leading-relaxed max-w-xs text-center md:text-left font-medium">
              Especialistas en importación de figuras de alta gama y coleccionables premium directamente desde Japón.
            </p>
          </div>
          <div className="flex justify-center gap-12 text-[11px] font-black uppercase tracking-[0.3em] text-gray-400">
            <a href="#" className="hover:text-cyan-400 transition-colors">Instagram</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">TikTok</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">WhatsApp</a>
          </div>
          <div className="flex flex-col items-center md:items-end">
             <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.4em] text-center md:text-right">
              © 2026 IKIGAI ANIME SHOP<br/>MADE FOR COLLECTORS
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default App;
