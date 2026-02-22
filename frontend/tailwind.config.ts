import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Extraídos del Logo Concept 2
        ikigai: {
          dark: "#050505",       // Fondo casi negro
          metal: "#2D3748",      // Gris metálico del borde
          cyan: "#00F0FF",       // El brillo neón principal (Cyberpunk Cyan)
          glow: "#00bcd4",       // Un tono más suave para efectos de luz
          silver: "#E2E8F0",     // Texto principal
        },
      },
      boxShadow: {
        'neon': '0 0 10px #00F0FF, 0 0 20px #00F0FF', // Efecto resplandor para botones
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite', // Para rotar el sello suavemente
      }
    },
  },
  plugins: [],
};
export default config;