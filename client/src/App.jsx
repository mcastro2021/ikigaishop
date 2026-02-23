import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import axios from 'axios';

// --- LOGO COMPONENT ---
const Logo = () => (
  <div className="relative flex items-center gap-4 group cursor-pointer scale-110">
    <div className="relative">
      <div className="absolute inset-0 bg-cyan-500 blur-xl opacity-20 group-hover:opacity-100 transition-opacity duration-700 rounded-full" />
      <svg width="48" height="48" viewBox="0 0 100 100" className="relative z-10 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">
        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1" className="text-white/10" />
        <circle cx="50" cy="50" r="45" fill="none" stroke="url(#logoGradient)" strokeWidth="5" strokeDasharray="283" strokeDashoffset="70" className="animate-[spin_6s_linear_infinite]" />
        <path d="M30 35 L70 35 M50 35 L50 65 M30 65 L70 65" stroke="white" strokeWidth="10" strokeLinecap="square" />
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>
    </div>
    <span className="font-black tracking-[0.3em] text-2xl flex flex-col leading-none italic">
      <span className="text-white drop-shadow-md">IKIGAI</span>
      <span className="text-cyan-400 text-[0.6rem] tracking-[0.6em] ml-1 uppercase opacity-80">Anime Collector</span>
    </span>
  </div>
);

// --- GRAPHICAL FLOATING BACKGROUND ---
const GraphicalBackground = () => {
  const elements = Array.from({ length: 15 });
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-20 select-none">
      {elements.map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%",
            rotate: Math.random() * 360,
            scale: 0.5 + Math.random() * 1.5
          }}
          animate={{ 
            y: ["-10%", "110%"],
            rotate: [0, 360],
            opacity: [0, 0.5, 0]
          }}
          transition={{ 
            duration: 15 + Math.random() * 25, 
            repeat: Infinity,
            ease: "linear",
            delay: -Math.random() * 20
          }}
          className="absolute font-black text-[12vw] leading-none text-white/5 pointer-events-none whitespace-nowrap"
        >
          {["IKIGAI", "ANIME", "REVOLUTION", "生きがい"][i % 4]}
        </motion.div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/80 to-[#050505]" />
    </div>
  );
};

const ProductCard = ({ name, anime, price, image, index }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9, y: 50 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ delay: (index % 4) * 0.1, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
    viewport={{ once: true, margin: "-100px" }}
    whileHover={{ y: -20 }}
    className="group relative bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] overflow-hidden hover:border-cyan-500/50 transition-all duration-700 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
  >
    <div className="h-[450px] overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10 opacity-60" />
      <motion.img 
        src={image} 
        alt={name} 
        loading="lazy"
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s] ease-out" 
        onError={(e) => {
          e.target.src = `https://placehold.co/400x600/0a0a0a/06b6d4?text=${encodeURIComponent(name)}`;
          e.target.onerror = null;
        }}
      />
      <div className="absolute top-8 right-8 z-20">
        <div className="bg-black/80 backdrop-blur-2xl text-cyan-400 text-[10px] font-black px-5 py-2 rounded-full border border-cyan-500/30 uppercase tracking-[0.3em] shadow-xl">
          {anime}
        </div>
      </div>
    </div>
    <div className="p-10 relative z-20">
      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors line-clamp-1 tracking-tight">{name}</h3>
      <div className="flex justify-between items-end">
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-500 uppercase tracking-[0.4em] font-black mb-2 opacity-60">Valor de Colección</span>
          <p className="text-4xl font-black text-white tracking-tighter shadow-cyan-500/20 drop-shadow-lg">
            <span className="text-cyan-500 text-xl mr-1">$</span>{price.toLocaleString('es-AR')}
          </p>
        </div>
        <motion.button 
          whileTap={{ scale: 0.8 }}
          className="bg-white text-black h-16 w-16 rounded-[1.5rem] flex items-center justify-center hover:bg-cyan-400 transition-all shadow-[0_10px_30px_rgba(255,255,255,0.1)] group/btn overflow-hidden"
        >
          <motion.div className="relative z-10" whileHover={{ rotate: 180 }} transition={{ duration: 0.5 }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
          </motion.div>
          <div className="absolute inset-0 bg-cyan-400 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
        </motion.button>
      </div>
    </div>
    <div className="absolute -bottom-2 -right-2 w-32 h-32 bg-cyan-500/5 blur-[50px] group-hover:bg-cyan-500/20 transition-all duration-700 rounded-full" />
  </motion.div>
);

// --- FALLBACK DATA FOR ROBUSTNESS ---
const FALLBACK_PRODUCTS = [
  { id: 1, name: "Kaido - Ichibansho", anime: "One Piece", price: 285000, image_url: "/images/one-piece/kaido.webp" },
  { id: 2, name: "Luffy Gear 5 - Ichibansho", anime: "One Piece", price: 195000, image_url: "/images/one-piece/luffy.webp" },
  { id: 3, name: "Zoro - King of Artist", anime: "One Piece", price: 165000, image_url: "/images/one-piece/zoro.webp" },
  { id: 4, name: "Trafalgar Law - DXF", anime: "One Piece", price: 145000, image_url: "/images/one-piece/law.webp" }
];

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const catalogRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const titleY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        if (response.data && response.data.length > 0) {
          setProducts(response.data);
        } else {
          console.warn("API returned empty list, using fallbacks");
          setProducts(FALLBACK_PRODUCTS);
        }
      } catch (error) {
        console.error("API error, using manual data for catalog stability");
        setProducts(FALLBACK_PRODUCTS);
      } finally {
        setTimeout(() => setLoading(false), 500); // Smooth transition
      }
    };
    fetchProducts();
  }, []);

  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="h-screen w-full bg-[#050505] flex flex-col items-center justify-center gap-6">
        <Logo />
        <div className="h-1 w-48 bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="h-full w-1/2 bg-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.8)]"
          />
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.6em] text-cyan-500/50">Initializing Core Systems...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-cyan-500 selection:text-black font-sans overflow-x-hidden">
      
      {/* GLOBAL OVERLAYS */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#050505] to-transparent opacity-80" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#050505] to-transparent opacity-80" />
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-cyan-500/10 blur-[180px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-purple-500/10 blur-[180px] rounded-full" />
      </div>

      {/* NAVBAR */}
      <nav className="fixed w-full z-50 px-10 py-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center bg-black/40 backdrop-blur-3xl px-10 h-24 rounded-[2rem] border border-white/10 shadow-2xl">
          <Logo />
          <div className="hidden lg:flex gap-16 text-[11px] font-black uppercase tracking-[0.5em] text-white/60">
            <a href="#catalog" onClick={(e) => { e.preventDefault(); scrollToCatalog(); }} className="hover:text-cyan-400 transition-all hover:tracking-[0.7em]">Catálogo</a>
            <a href="#" className="hover:text-cyan-400 transition-all hover:tracking-[0.7em]">Exclusivos</a>
            <a href="#" className="text-cyan-400">Pre-Order</a>
          </div>
          <div className="flex items-center gap-6">
            <button className="bg-white/5 p-4 rounded-2xl hover:bg-cyan-500 hover:text-black transition-all border border-white/10">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </button>
            <button className="relative group p-4 bg-white/10 rounded-2xl hover:bg-cyan-500 transition-all border border-white/20">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:text-black"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6zM3 6h18M16 10a4 4 0 01-8 0"/></svg>
              <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-black h-6 w-6 flex items-center justify-center rounded-xl border-4 border-black group-hover:bg-black group-hover:text-white transition-colors">0</span>
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative h-[120vh] flex flex-col justify-center items-center text-center px-10 overflow-hidden">
        <GraphicalBackground />
        
        <motion.div 
          style={{ y: titleY, opacity }}
          className="z-10 relative mt-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex items-center justify-center gap-4 mb-10"
          >
             <div className="h-px w-12 bg-cyan-500/50" />
             <span className="text-cyan-400 text-xs font-black tracking-[1em] uppercase">The Ultimate Collection</span>
             <div className="h-px w-12 bg-cyan-500/50" />
          </motion.div>

          <h1 className="text-[10vw] md:text-[14vw] font-black mb-10 tracking-[-0.05em] leading-[0.75] select-none italic">
            <span className="text-white block drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]">ANIME</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-300 via-white to-purple-600 animate-gradient-x drop-shadow-[0_0_80px_rgba(6,182,212,0.4)]">REVOLUTION</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-20 font-medium tracking-tight leading-relaxed opacity-80">
            Descubre piezas maestras de ingeniería japonesa. Cada figura es una obra de arte original certificada para coleccionistas de élite.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-10 justify-center items-center">
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 0 80px rgba(6,182,212,0.5)" }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToCatalog}
              className="group px-16 py-8 bg-cyan-500 text-black font-black text-sm rounded-[2rem] transition-all relative overflow-hidden shadow-2xl"
            >
              <span className="relative z-10 tracking-[0.4em] uppercase">Explorar Drop 01</span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 opacity-20" />
            </motion.button>
            <button className="px-16 py-8 bg-white/5 hover:bg-white/10 text-white font-black text-sm rounded-[2rem] transition-all border border-white/10 tracking-[0.4em] uppercase backdrop-blur-3xl shadow-2xl">
              Limited Edition
            </button>
          </div>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 text-cyan-500/50 cursor-pointer p-4 hover:text-cyan-400 transition-colors"
          onClick={scrollToCatalog}
        >
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 13l5 5 5-5M7 6l5 5 5-5"/></svg>
        </motion.div>
      </section>

      {/* CATALOG SECTION */}
      <section ref={catalogRef} id="catalog" className="max-w-[1400px] mx-auto px-10 py-60 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start mb-40 gap-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-6 mb-8">
              <div className="h-2 w-24 bg-cyan-500 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.5)]" />
              <span className="text-cyan-500 text-sm font-black uppercase tracking-[0.5em]">Curated Selection // 2026</span>
            </div>
            <h2 className="text-6xl md:text-[10rem] font-black tracking-tighter leading-[0.8] mb-10 italic">NEW<br/><span className="text-cyan-500">ARRIVALS</span></h2>
            <p className="text-gray-500 text-xl font-medium tracking-wide max-w-xl">
              Seleccionamos solo figuras de escalas premium y resinas limitadas. Calidad garantizada en cada envío.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 pt-10">
            {["All Items", "1/7 Scales", "Action Figures", "Busts"].map((filter) => (
              <button key={filter} className="px-10 py-5 bg-white/5 rounded-[1.5rem] text-[10px] font-black tracking-[0.3em] hover:bg-cyan-500 hover:text-black transition-all border border-white/10 uppercase">
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
          <AnimatePresence>
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
          </AnimatePresence>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-black/80 py-40 px-10 backdrop-blur-[100px] mt-40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-24">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-12 text-gray-500 text-lg leading-relaxed max-w-md font-medium">
              IKIGAI es el destino final para coleccionistas serios. Importamos directamente desde Akihabara las piezas más exclusivas del mundo del anime.
            </p>
            <div className="flex gap-10 mt-12">
              {["IG", "TW", "TK", "WA"].map(soc => (
                <a key={soc} href="#" className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-[10px] font-black hover:bg-cyan-500 hover:text-black transition-all border border-white/10">{soc}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-[0.5em] mb-10">Links Rápidos</h4>
            <ul className="space-y-6 text-gray-500 text-sm font-bold uppercase tracking-widest">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Términos de Envío</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Guía de Autenticidad</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Programa VIP</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Soporte 24/7</a></li>
            </ul>
          </div>
          <div className="flex flex-col items-center lg:items-end justify-end">
             <div className="text-center lg:text-right">
               <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.5em] leading-loose">
                AUTHENTIC JAPANESE IMPORT<br/>
                © 2026 IKIGAI ANIME SHOP<br/>
                DESIGNED FOR COLLECTORS
              </p>
             </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default App;
