import { defineConfig } from 'astro/config';

import icon from 'astro-icon';
import netlify from '@astrojs/netlify';
import sitemap from '@astrojs/sitemap';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [icon(), sitemap(), react()],
  output: "static",
  adapter: netlify()
});