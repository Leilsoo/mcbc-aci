// tailwind.config.ts
// ⛳ À mettre à la RACINE du projet (même dossier que package.json)
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",       // ✅ scanne tes pages (App Router)
    "./src/components/**/*.{ts,tsx}" // ✅ scanne tes composants
  ],
  theme: {
    container: {
      center: true,                  // ✅ centre automatiquement .container
      padding: { DEFAULT: "1rem", lg: "2rem" },
      screens: { lg: "1120px" },     // ✅ largeur idéale de lecture
    },
    extend: {
      colors: {
        // 🎨 Palette simple
        brand: {
          50:  "#eef6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",  // bleu principal
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        ink: {
          50:  "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1f2937",
          900: "#0f172a",
        },
      },
      fontFamily: {
        // ✅ utilise les variables Next/font
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular"],
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
      },
      // ✅ la clé "soft" crée l’utilitaire Tailwind "shadow-soft"
      boxShadow: {
        soft: "0 6px 20px rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
};
export default config;
