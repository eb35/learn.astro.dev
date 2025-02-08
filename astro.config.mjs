import { defineConfig } from 'astro/config';

import db from '@astrojs/db';

import icon from 'astro-icon';

import tailwindcss from '@tailwindcss/vite';

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  integrations: [db(), icon()],
  output: "server",
  adapter: netlify(),
  vite: {
    plugins: [tailwindcss()]
  },
});