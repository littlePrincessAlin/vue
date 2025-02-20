import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      "@": resolve(__dirname, "src"),
      "@router": resolve(__dirname, "router"),
      "@components": resolve(__dirname, "src/components"),
      "@assets": resolve(__dirname, "src/assets"),
      "@pages": resolve(__dirname, "src/pages"),
    },
  },
  plugins: [vue()],
});
