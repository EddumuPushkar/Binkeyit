import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    proxy: {
      "/api": "https://binkeyit-ww2a.onrender.com"
    },
  },
  plugins: [react()],
});
