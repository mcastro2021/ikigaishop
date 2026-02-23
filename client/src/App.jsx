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

// --- PRODUCT DETAIL MODAL ---
const ProductDetail = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-20"
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-3xl" onClick={onClose} />
      <motion.div 
        initial={{ scale: 0.9, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 50, opacity: 0 }}
        className="relative bg-[#0a0a0a] border border-white/10 w-full max-w-6xl rounded-[3rem] overflow-hidden flex flex-col md:flex-row shadow-[0_0_100px_rgba(6,182,212,0.15)]"
      >
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 z-50 h-12 w-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 text-white transition-all"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>

        {/* Image Section */}
        <div className="w-full md:w-1/2 h-[400px] md:h-auto bg-black relative">
          <img 
            src={product.image_url} 
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 p-10 md:p-20 flex flex-col justify-center">
          <span className="text-cyan-500 text-xs font-black uppercase tracking-[0.5em] mb-4">{product.anime} // AUTHENTIC</span>
          <h2 className="text-4xl md:text-6xl font-black italic text-white mb-8 tracking-tighter leading-tight">{product.name}</h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-10 font-medium">{product.description}</p>
          
          <div className="grid grid-cols-2 gap-10 mb-10 border-y border-white/5 py-10">
            <div>
              <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-black mb-2">Precio Coleccionista</p>
              <p className="text-5xl font-black text-white italic tracking-tighter">
                <span className="text-cyan-500 text-2xl mr-1">$</span>{product.price.toLocaleString('es-AR')}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-black mb-2">Disponibilidad</p>
              <p className="text-2xl font-bold text-cyan-400">{product.stock > 0 ? `${product.stock} Unidades` : 'Out of Stock'}</p>
            </div>
          </div>

          <button className="w-full py-8 bg-cyan-500 text-black font-black uppercase tracking-[0.4em] rounded-[2rem] hover:bg-white transition-all shadow-2xl shadow-cyan-500/20 active:scale-95">
            Reservar Ahora
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- PRODUCT CARD COMPONENT ---
const ProductCard = ({ product, index, onClick }) => {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: (index % 4) * 0.05, duration: 0.5 }}
      onClick={() => onClick(product)}
      className="group relative bg-[#0a0a0a] border border-white/10 rounded-[2rem] overflow-hidden hover:border-cyan-500/30 transition-all duration-500 shadow-2xl cursor-pointer"
    >
      <div className="h-[350px] relative overflow-hidden bg-black">
        {!imgError ? (
          <motion.img 
            src={product.image_url} 
            alt={product.name}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#050505] to-[#111] flex flex-col items-center justify-center p-8 text-center">
            <h4 className="text-lg font-black italic text-white/40 uppercase tracking-tighter leading-none mb-2">
              {product.name.split(' ').slice(0, 3).join(' ')}
            </h4>
            <p className="text-[9px] text-cyan-500/30 font-black uppercase tracking-[0.4em]">Masterpiece Edition</p>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />
        <div className="absolute top-6 right-6">
          <span className="bg-black/60 backdrop-blur-md text-cyan-400 text-[9px] font-black px-4 py-2 rounded-full border border-white/10 uppercase tracking-[0.2em]">
            {product.anime}
          </span>
        </div>
      </div>

      <div className="p-8">
        <h3 className="text-xl font-bold text-white mb-6 group-hover:text-cyan-400 transition-colors line-clamp-1 italic">{product.name}</h3>
        <div className="flex justify-between items-center">
          <p className="text-3xl font-black text-white italic tracking-tighter">
            <span className="text-cyan-500 text-lg mr-1">$</span>{product.price.toLocaleString('es-AR')}
          </p>
          <div className="h-10 w-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-black transition-all">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All Items");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const catalogRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const titleY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        if (response.data && Array.isArray(response.data)) {
          setProducts(response.data);
          setFilteredProducts(response.data);
        }
      } catch (error) {
        console.error("API error");
      } finally {
        setTimeout(() => setLoading(false), 800);
      }
    };
    fetchProducts();
  }, []);

  // Filtering Logic
  useEffect(() => {
    if (activeFilter === "All Items") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.anime === activeFilter));
    }
  }, [activeFilter, products]);

  const categories = ["All Items", ...new Set(products.map(p => p.anime))];

  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="h-screen w-full bg-[#050505] flex flex-col items-center justify-center gap-6">
        <Logo />
        <div className="h-1 w-48 bg-white/5 rounded-full overflow-hidden">
          <motion.div initial={{ x: "-100%" }} animate={{ x: "100%" }} transition={{ repeat: Infinity, duration: 1.5 }} className="h-full w-1/2 bg-cyan-500" />
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-cyan-500 selection:text-black font-sans overflow-x-hidden">
      
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetail product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        )}
      </AnimatePresence>

      {/* NAVBAR */}
      <nav className="fixed w-full z-50 px-6 md:px-10 py-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center bg-black/40 backdrop-blur-3xl px-6 md:px-10 h-24 rounded-[2rem] border border-white/10">
          <Logo />
          <div className="hidden lg:flex gap-16 text-[11px] font-black uppercase tracking-[0.5em] text-white/60">
            <a href="#catalog" onClick={(e) => { e.preventDefault(); scrollToCatalog(); }} className="hover:text-cyan-400 transition-all">Catálogo</a>
            <a href="#" className="hover:text-cyan-400 transition-all">Exclusivos</a>
          </div>
          <div className="flex items-center gap-6">
            <button className="relative group p-4 bg-white/10 rounded-2xl hover:bg-cyan-500 transition-all border border-white/20">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:text-black"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6zM3 6h18M16 10a4 4 0 01-8 0"/></svg>
              <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-black h-6 w-6 flex items-center justify-center rounded-xl">{products.length}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative h-[110vh] flex flex-col justify-center items-center text-center px-10">
        <GraphicalBackground />
        <motion.div style={{ y: titleY, opacity }} className="z-10 relative">
          <h1 className="text-[12vw] font-black mb-10 tracking-[-0.05em] leading-[0.8] select-none italic">
            <span className="text-white block">ANIME</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-300 via-white to-purple-600">REVOLUTION</span>
          </h1>
          <button onClick={scrollToCatalog} className="px-16 py-8 bg-cyan-500 text-black font-black text-sm rounded-[2rem] tracking-[0.4em] uppercase hover:shadow-[0_0_50px_rgba(6,182,212,0.5)] transition-all">
            Explorar Catálogo
          </button>
        </motion.div>
      </section>

      {/* CATALOG SECTION */}
      <section ref={catalogRef} id="catalog" className="max-w-[1400px] mx-auto px-6 md:px-10 py-40">
        <div className="flex flex-col md:flex-row justify-between items-start mb-20 gap-10">
          <div>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter italic mb-4 uppercase">NEW <span className="text-cyan-500">ARRIVALS</span></h2>
            <p className="text-gray-500 text-lg font-bold tracking-widest uppercase">Drop #01 // Collector Edition</p>
          </div>
          
          {/* Dynamic Filters */}
          <div className="flex flex-wrap gap-4 pt-10">
            {categories.map((filter) => (
              <button 
                key={filter} 
                onClick={() => setActiveFilter(filter)}
                className={`px-8 py-4 rounded-xl text-[10px] font-black tracking-[0.2em] transition-all border uppercase ${
                  activeFilter === filter 
                    ? "bg-cyan-500 text-black border-cyan-500" 
                    : "bg-white/5 text-white/60 border-white/10 hover:border-white/30"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <ProductCard 
                key={product.id}
                product={product}
                index={index}
                onClick={setSelectedProduct}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <footer className="py-20 text-center border-t border-white/5">
        <Logo />
        <p className="mt-10 text-gray-600 text-xs font-black uppercase tracking-[0.5em]">© 2026 IKIGAI ANIME SHOP // MASTER COLLECTORS</p>
      </footer>
    </main>
  );
}

export default App;
