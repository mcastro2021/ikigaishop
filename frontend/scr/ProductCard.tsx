'use client';
import { motion } from 'framer-motion';

interface ProductProps {
  name: string;
  anime: string;
  price: number;
  image: string;
}

export default function ProductCard({ name, anime, price, image }: ProductProps) {
  return (
    <motion.div 
      whileHover={{ y: -10, scale: 1.02 }}
      className="relative group bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-300 shadow-lg hover:shadow-cyan-500/20"
    >
      {/* Imagen con Overlay al hacer Hover */}
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 opacity-60" />
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Badge de Anime */}
        <span className="absolute top-3 right-3 z-20 bg-black/70 text-cyan-400 text-xs font-bold px-2 py-1 rounded border border-cyan-500/30 uppercase tracking-wider">
          {anime}
        </span>
      </div>

      {/* Info del Producto */}
      <div className="p-5 relative z-20">
        <h3 className="text-xl font-bold text-white mb-1 font-mono truncate">{name}</h3>
        <div className="flex justify-between items-end mt-4">
          <div>
            <p className="text-gray-400 text-xs uppercase tracking-widest">Precio</p>
            <p className="text-2xl font-bold text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
              ${price.toLocaleString('es-AR')}
            </p>
          </div>
          
          <button className="bg-cyan-600 hover:bg-cyan-500 text-black font-bold p-3 rounded-full transition-colors shadow-lg shadow-cyan-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
}