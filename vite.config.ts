import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Long-lived vendor chunks cache independently of app code changes.
        manualChunks(id) {
          if (id.includes("node_modules/react-dom") || id.includes("node_modules/react/") || id.includes("node_modules/scheduler")) return "react";
          if (id.includes("node_modules/framer-motion") || id.includes("node_modules/motion")) return "motion";
          if (id.includes("node_modules/react-icons") || id.includes("node_modules/lucide-react")) return "icons";
          return undefined;
        },
      },
    },
  },
})
