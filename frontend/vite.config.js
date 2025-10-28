import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
  },
  build: {
    // Output directory for production build
    outDir: "dist",

    // Generate sourcemaps for production (disable for smaller bundles)
    sourcemap: false,

    // Chunk size warning limit (in kbs)
    chunkSizeWarningLimit: 1000,

    // Rollup options for code splitting
    rollupOptions: {
      output: {
        // Manual chunks for better code splitting
        manualChunks: {
          // Vendor chunks
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "react-query": ["@tanstack/react-query"],
          "ui-vendor": ["react-hot-toast", "react-hook-form", "react-icons"],
          animation: ["gsap", "@gsap/react", "swiper"],
        },
        // Naming pattern for chunks
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
      },
    },

    // Minification (using default esbuild minifier)
    minify: "esbuild",
  },

  // Optimize dependencies
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom"],
  },
});
