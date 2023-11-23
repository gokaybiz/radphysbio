import { type NuxtConfig } from "nuxt/schema";

// https://nuxt.com/docs/api/configuration/nuxt-config
const CONFIG: NuxtConfig = {
  devtools: { enabled: true },
  modules: ["@nuxtjs/fontaine", "@nuxtjs/critters", "@nuxtjs/google-fonts", "@nuxtjs/tailwindcss"],
  nitro: {
    compressPublicAssets: true,
    preset: "netlify",
  },
  googleFonts: {
    display: "swap",
    families: {
      "Roboto+Condensed": {
        wght: [300, 400, 700],
        ital: [300, 400, 700],
      },
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
      cssnano:
        process.env.NODE_ENV === "production"
          ? { preset: ["default", { discardComments: { removeAll: true } }] }
          : false, // disable cssnano when not in production
    },
  },

  app: {
    head: {
      titleTemplate: "%s - RadPhysBio",
      title: "RadPhysBio",
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
    rootId: "__app",
    baseURL: "/radphysbio",
  },

  vite: {
    build: {
      sourcemap: false,
    },
  },
};

CONFIG.runtimeConfig = {
  app: {
    rootId: "__app",
    dataUrl:
      "https://gist.githubusercontent.com/gokaybiz/6dd46ee65764a07ddc8580d0bc4a8c86/raw/806546e9ea37a2b895cb48584ace31bc5dc1cb8b/all.json",
    lastUpdateUrl:
      "https://gist.githubusercontent.com/gokaybiz/6dd46ee65764a07ddc8580d0bc4a8c86/raw/806546e9ea37a2b895cb48584ace31bc5dc1cb8b/last_update.txt",
  },
};

export default defineNuxtConfig(CONFIG);
