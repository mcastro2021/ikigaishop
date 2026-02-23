import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import axios from 'axios';

// --- CONFIGURACIÓN COMERCIAL ---
const WHATSAPP_NUMBER = "5493512046802";
const TRANSFER_DISCOUNT = 0.10;
const SHIPPING_COST = 8500;

// --- LOGO VISA SVG (INLINE PARA QUE NO FALLE) ---
const VisaLogo = ({ className }) => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor">
    <path d="M12.915 15.892l1.643-9.986h2.583l-1.643 9.986h-2.583zm-6.606-9.986l-2.613 6.944-.284-1.396C3.12 10.334 2.11 9.293.96 8.784L1.002 8.543H5.21c.915 0 1.745.626 1.956 1.543l1.168 5.806 2.614-9.986H6.309zm16.518 9.986h-2.426l-1.425-7.062c-.156-.63-.586-.884-1.127-.884h-3.834l-.053.255c.783.176 1.673.473 2.21 1.055.492.535.534.823.634 1.314l.97 4.965h2.426l1.643-9.986h2.425l-1.643 9.986z" />
  </svg>
);

// --- ANIMACIÓN DE LÍNEAS DE VELOCIDAD ANIME ---
const SpeedLines = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
    {Array.from({ length: 30 }).map((_, i) => (
      <motion.div
        key={i}
        initial={{ scaleX: 0, x: "-50%", y: "50%", rotate: i * 12 }}
        animate={{ scaleX: [0, 2, 0], opacity: [0, 1, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.05, ease: "easeInOut" }}
        className="absolute w-[100vw] h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent origin-left"
      />
    ))}
  </div>
);

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

// --- COMPONENTE DE PAGO LOGOS ---
const PaymentLogos = ({ className = "" }) => (
  <div className={`flex items-center gap-6 ${className}`}>
    <img src="https://logodownload.org/wp-content/uploads/2019/06/mercado-pago-logo-1.png" alt="MP" className="h-4 md:h-6 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100" />
    <VisaLogo className="h-4 md:h-6 text-[#1A1F71] grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100" />
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Master" className="h-6 md:h-10 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100" />
  </div>
);

// --- WHATSAPP FLOATING ---
const WhatsAppButton = () => (
  <motion.a
    href={`https://wa.me/${WHATSAPP_NUMBER}`}
    target="_blank" rel="noopener noreferrer"
    initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
    whileHover={{ scale: 1.1, rotate: 10 }}
    className="fixed bottom-10 right-10 z-[100] bg-[#25D366] text-white p-6 rounded-full shadow-[0_0_40px_rgba(37,211,102,0.4)] flex items-center justify-center border-4 border-white/20"
  >
    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
  </motion.a>
);

// --- CART DRAWER ---
const CartDrawer = ({ isOpen, onClose, cart, updateQuantity, removeItem }) => {
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const [shippingType, setShippingType] = useState(null);
  const total = shippingType === 'correo' ? subtotal + SHIPPING_COST : subtotal;

  const handleCheckout = () => {
    const text = encodeURIComponent(`¡Hola Ikigai! Me gustaría concretar el pedido:\n\n` + 
      cart.map(i => `- ${i.name} (x${i.quantity})`).join('\n') + 
      `\n\nEnvío: ${shippingType === 'correo' ? 'Correo Argentino ($' + SHIPPING_COST + ')' : 'Retiro en Local'}\n` +
      `Total: $${total.toLocaleString('es-AR')}`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[150]" onClick={onClose} />
          <motion.div 
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25 }}
            className="fixed top-0 right-0 h-screen w-full md:w-[500px] bg-[#0a0a0a] border-l border-white/10 z-[160] p-10 flex flex-col shadow-[-50px_0_100px_rgba(0,0,0,0.5)]"
          >
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-black italic uppercase tracking-tighter">Mi Carrito</h2>
              <button onClick={onClose} className="h-12 w-12 bg-white/5 rounded-full flex items-center justify-center text-white"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 18L18 6M6 6l12 12"/></svg></button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-8 pr-4 custom-scrollbar">
              {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-20 uppercase font-black tracking-widest text-xs opacity-50">Tu carrito está vacío</p>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-6 group">
                    <div className="h-24 w-24 bg-black rounded-2xl overflow-hidden border border-white/10 shrink-0">
                      <img src={item.image_url} alt={item.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-white uppercase tracking-tight mb-2 leading-none">{item.name}</h4>
                      <p className="text-cyan-500 font-black text-xs mb-4">$ {item.price.toLocaleString('es-AR')}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4 bg-white/5 rounded-xl p-1 border border-white/10">
                          <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 flex items-center justify-center text-white">-</button>
                          <span className="text-sm font-black">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 flex items-center justify-center text-white">+</button>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="text-[10px] text-red-500 font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Quitar</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-auto pt-10 border-t border-white/10 space-y-6">
              <div className="space-y-4">
                <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.4em]">Opción de Envío</p>
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => setShippingType('correo')} className={`p-4 rounded-2xl border text-[10px] font-black uppercase tracking-widest transition-all ${shippingType === 'correo' ? 'bg-cyan-500 text-black border-cyan-500' : 'bg-white/5 text-white/40 border-white/10'}`}>Correo Argentino (${SHIPPING_COST})</button>
                  <button onClick={() => setShippingType('retiro')} className={`p-4 rounded-2xl border text-[10px] font-black uppercase tracking-widest transition-all ${shippingType === 'retiro' ? 'bg-cyan-500 text-black border-cyan-500' : 'bg-white/5 text-white/40 border-white/10'}`}>Retiro en Local (Gratis)</button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-white text-2xl font-black italic uppercase pt-2">
                  <span>Total</span>
                  <span className="text-cyan-500">$ {total.toLocaleString('es-AR')}</span>
                </div>
              </div>

              <button onClick={handleCheckout} disabled={cart.length === 0 || !shippingType} className="w-full py-6 bg-cyan-500 text-black font-black uppercase tracking-[0.4em] rounded-2xl hover:bg-white transition-all disabled:opacity-50 text-xs">Finalizar Compra</button>
              <PaymentLogos className="justify-center grayscale opacity-40 scale-75" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// --- MAIN APP ---
function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All Items");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const catalogRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const titleY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const API_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000/api/products' : '/api/products';
        const response = await axios.get(API_URL);
        if (response.data && Array.isArray(response.data)) {
          setProducts(response.data);
          setFilteredProducts(response.data);
        }
      } catch (error) { console.error("API error"); }
      finally { setTimeout(() => setLoading(false), 800); }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (activeFilter === "All Items") setFilteredProducts(products);
    else setFilteredProducts(products.filter(p => p.category === activeFilter));
  }, [activeFilter, products]);

  const addToCart = (product, quantity) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      return [...prev, { ...product, quantity }];
    });
    setIsCartOpen(true);
  };

  const updateCartQuantity = (id, delta) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i));
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));

  const categories = ["All Items", "Figuras", "Comics & Manga"];
  const scrollToCatalog = () => catalogRef.current?.scrollIntoView({ behavior: 'smooth' });

  if (loading) return (
    <div className="h-screen w-full bg-[#050505] flex flex-col items-center justify-center gap-6">
      <Logo />
      <div className="h-1 w-48 bg-white/5 rounded-full overflow-hidden">
        <motion.div initial={{ x: "-100%" }} animate={{ x: "100%" }} transition={{ repeat: Infinity, duration: 1.5 }} className="h-full w-1/2 bg-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.5)]" />
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-cyan-500 selection:text-black font-sans overflow-x-hidden">
      
      <WhatsAppButton />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cart={cart} updateQuantity={updateCartQuantity} removeItem={removeFromCart} />

      <AnimatePresence>
        {selectedProduct && (
          <ProductDetailModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAddToCart={addToCart} />
        )}
      </AnimatePresence>

      <nav className="fixed w-full z-50 px-6 md:px-10 py-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center bg-black/40 backdrop-blur-3xl px-6 md:px-10 h-24 rounded-[2rem] border border-white/10 shadow-2xl">
          <Logo />
          <div className="hidden lg:flex gap-12 text-[10px] font-black uppercase tracking-[0.5em] text-white/60">
            <button onClick={() => { setActiveFilter("Figuras"); scrollToCatalog(); }} className="hover:text-cyan-400 transition-all uppercase">Figuras</button>
            <button onClick={() => { setActiveFilter("Comics & Manga"); scrollToCatalog(); }} className="hover:text-cyan-400 transition-all uppercase">Comics & Manga</button>
            <button onClick={() => { scrollToCatalog(); }} className="hover:text-cyan-400 transition-all uppercase">Formas de Pago</button>
          </div>
          <button onClick={() => setIsCartOpen(true)} className="relative group p-4 bg-white/10 rounded-2xl hover:bg-cyan-500 transition-all border border-white/20">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:text-black"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6zM3 6h18M16 10a4 4 0 01-8 0"/></svg>
            <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-black h-6 w-6 flex items-center justify-center rounded-xl border-2 border-black">
              {cart.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          </button>
        </div>
      </nav>

      <section className="relative h-[110vh] flex flex-col justify-center items-center text-center px-10">
        <SpeedLines />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/5 via-transparent to-transparent opacity-50" />
        <motion.div style={{ y: titleY, opacity }} className="z-10 relative mt-20">
          <h1 className="text-[9vw] font-black mb-10 tracking-[-0.05em] leading-[0.8] select-none italic uppercase">
            <span className="text-white block drop-shadow-2xl">ANIME</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-300 via-white to-purple-600">Revolution</span>
          </h1>
          <button onClick={() => { setActiveFilter("All Items"); scrollToCatalog(); }} className="px-16 py-8 bg-cyan-500 text-black font-black text-sm rounded-[2rem] tracking-[0.4em] uppercase hover:shadow-[0_0_50px_rgba(6,182,212,0.5)] transition-all">Explorar Productos</button>
        </motion.div>
      </section>

      <section ref={catalogRef} id="catalog" className="max-w-[1400px] mx-auto px-6 md:px-10 py-40">
        <div className="flex flex-col md:flex-row justify-between items-start mb-20 gap-10">
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter italic mb-4 uppercase">
            {activeFilter === "All Items" ? "NEW ARRIVALS" : activeFilter}
          </h2>
          <div className="flex flex-wrap gap-4 pt-10">
            {categories.map((filter) => (
              <button key={filter} onClick={() => setActiveFilter(filter)} className={`px-8 py-4 rounded-xl text-[10px] font-black tracking-[0.2em] transition-all border uppercase ${activeFilter === filter ? "bg-cyan-500 text-black border-cyan-500" : "bg-white/5 text-white/60 border-white/10 hover:border-white/30"}`}>{filter}</button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <motion.div layout key={product.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ delay: (index % 4) * 0.05, duration: 0.5 }}
                onClick={() => setSelectedProduct(product)}
                className="group relative bg-[#0a0a0a] border border-white/10 rounded-[2rem] overflow-hidden hover:border-cyan-500/30 transition-all duration-500 shadow-2xl cursor-pointer"
              >
                <div className="h-[350px] relative overflow-hidden bg-black">
                  <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold text-white mb-6 group-hover:text-cyan-400 transition-colors line-clamp-1 italic uppercase tracking-tighter">{product.name}</h3>
                  <div className="flex justify-between items-center">
                    <p className="text-3xl font-black text-white italic tracking-tighter"><span className="text-cyan-500 text-lg mr-1">$</span>{product.price.toLocaleString('es-AR')}</p>
                    <div className="h-10 w-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-black transition-all"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <footer className="py-40 border-t border-white/5 px-10 bg-black/50 backdrop-blur-3xl text-center">
        <Logo />
        <PaymentLogos className="justify-center mt-10" />
        <p className="mt-20 text-gray-600 text-[8px] font-black uppercase tracking-[0.5em]">© 2026 IKIGAI ANIME SHOP // MASTER COLLECTORS</p>
      </footer>
    </main>
  );
}

// --- PRODUCT DETAIL MODAL ---
const ProductDetailModal = ({ product, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-10">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-3xl" onClick={onClose} />
      <motion.div initial={{ scale: 0.9, y: 50, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.9, y: 50, opacity: 0 }} className="relative bg-[#0a0a0a] border border-white/10 w-full max-w-6xl rounded-[3rem] overflow-hidden flex flex-col md:flex-row max-h-[95vh] md:overflow-hidden">
        <button onClick={onClose} className="absolute top-6 right-6 z-50 h-12 w-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 text-white transition-all"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
        <div className="w-full md:w-1/2 h-[400px] md:h-auto bg-black"><img src={product.image_url} alt={product.name} className="w-full h-full object-cover" /></div>
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-[#0a0a0a]">
          <span className="text-cyan-500 text-xs font-black uppercase tracking-[0.5em] mb-4">{product.category}</span>
          <h2 className="text-4xl md:text-5xl font-black italic text-white mb-6 tracking-tighter leading-tight uppercase">{product.name}</h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-8 font-medium italic border-l-2 border-cyan-500/30 pl-6">{product.description}</p>
          <div className="mb-8 flex items-center justify-between">
            <p className="text-5xl font-black text-white italic tracking-tighter"><span className="text-cyan-500 text-2xl mr-1">$</span>{(product.price * quantity).toLocaleString('es-AR')}</p>
            <div className="flex items-center gap-6 bg-white/5 border border-white/10 p-2 rounded-2xl">
              <button onClick={() => setQuantity(q => Math.max(1, q-1))} className="w-10 h-10 flex items-center justify-center text-white">-</button>
              <span className="text-xl font-black text-white w-8 text-center">{quantity}</span>
              <button onClick={() => setQuantity(q => q+1)} className="w-10 h-10 flex items-center justify-center text-white">+</button>
            </div>
          </div>
          <button onClick={() => onAddToCart(product, quantity)} className="py-6 bg-cyan-500 text-black font-black uppercase tracking-[0.4em] rounded-2xl hover:bg-white transition-all text-[10px] shadow-xl">Añadir al Carrito</button>
          <PaymentLogos className="mt-8 justify-center grayscale opacity-40 scale-75" />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default App;
