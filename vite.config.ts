import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  publicDir: "../public",
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        about: resolve(__dirname, "src/about/index.html"),
        contact: resolve(__dirname, "src/contact/index.html"),
        folder: resolve(__dirname, "src/folder/index.html"),
      },
    },
  },
});
