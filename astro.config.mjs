import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: "https://varano-detail.pages.dev",
  adapter: cloudflare({ prerenderEnvironment: "node" }),
  vite: {
    plugins: [tailwindcss()],
  },
});