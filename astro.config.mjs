import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://varano-detail.pages.dev",
  vite: {
    plugins: [tailwindcss()],
  },
});