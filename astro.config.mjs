import { defineConfig } from 'astro/config';

import icon from "astro-icon";
import netlify from "@astrojs/netlify";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  prefetch: {
    prefetchAll: true
  },
  site: "https://robsportfolio.netlify.app",
  integrations: [icon(), sitemap()],
  output: "static",
  adapter: netlify()
});