'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

export default function Home() {
  const [message, setMessage] = useState<string>("Iniciando conexión neuronal...");
  const [status, setStatus] = useState<string>("loading");

  useEffect(() => {
    // Esta función conecta Next.js (Puerto 3000) con Python (Puerto 8000)
    const fetchBackend = async () => {
      try {
        // Intentamos hablar con el backend
        const response = await axios.get('http://127.0.0.1:8000/');
        setMessage(response.data.message);
        setStatus("online");
      } catch (error) {
        console.error("Error de conexión:", error);
        setMessage("ERROR CRÍTICO: El Backend no responde. ¿Está corriendo Uvicorn?");
        setStatus("offline");
      }
    };

    fetchBackend();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#050505] p-24 relative overflow-hidden text-white">
      
      {/* 1. FONDO DE GRID ANIMADO (Estilo Tron) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a202c_1px,transparent_1px),linear-gradient(to_bottom,#1a202c_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />

      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex flex-col">
        
        {/* 2. LOGO ANIMADO (Simulación) */}
        <motion.div 
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="relative flex place-items-center mb-12"
        >
            {/* Aura Neon */}
            <div className="absolute -inset-4 rounded-full bg-cyan-500 blur-xl opacity-50 animate-pulse"></div>
            
            {/* Contenedor del Logo */}
            <div className="relative bg-black rounded-full p-6 border-2 border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.6)]">
                {/* Si tenés la imagen en public/logo-ikigai.png descomentá la línea de abajo */}
                {/* <img src="/logo-ikigai.png" alt="Ikigai Logo" className="w-20 h-20" /> */}
                
                {/* Placeholder mientras ponés la imagen */}
                <span className="text-5xl">生き甲斐</span> 
            </div>
        </motion.div>

        {/* 3. TÍTULO PRINCIPAL */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 mb-2 text-center tracking-tighter"
        >
          IKIGAI SYSTEM
        </motion.h1>

        <p className="text-gray-400 mb-10 tracking-[0.5em] text-xs uppercase">Arquitectura de Importación Autónoma</p>

        {/* 4. TARJETA DE DIAGNÓSTICO (Conecta con Python) */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className={`group relative rounded-xl border px-8 py-6 transition-all w-full max-w-2xl text-center backdrop-blur-sm
            ${status === 'online' 
              ? 'border-cyan-500/30 bg-cyan-950/10 shadow-[0_0_50px_-12px_rgba(6,182,212,0.2)]' 
              : 'border-red-500/30 bg-red-950/10 shadow-[0_0_50px_-12px_rgba(239,68,68,0.2)]'}
          `}
        >
          {/* Luz indicadora de estado */}
          <div className={`absolute top-4 right-4 w-3 h-3 rounded-full ${status === 'online' ? 'bg-green-400 shadow-[0_0_10px_#4ade80]' : 'bg-red-500 shadow-[0_0_10px_#ef4444]'}`}></div>

          <h2 className={`mb-4 text-xl font-bold ${status === 'online' ? 'text-cyan-400' : 'text-red-400'}`}>
            Estado del Núcleo: 
            <span className="ml-2 font-mono">{status === 'online' ? 'OPERATIVO' : 'DESCONECTADO'}</span>
          </h2>
          
          <div className="bg-black/50 rounded p-4 font-mono text-sm border border-white/10 text-left">
            <span className="text-gray-500">$ curl api/status</span><br/>
            <span className="text-green-400">{`> ${message}`}</span>
            <span className="animate-pulse">_</span>
          </div>
        </motion.div>

      </div>
    </main>
  );
}