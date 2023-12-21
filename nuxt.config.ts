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
      "https://raw.githubusercontent.com/gokaybiz/radphysbio/data/all-json/all.json",
    lastUpdateUrl:
      "https://raw.githubusercontent.com/gokaybiz/radphysbio/data/lastUpdate.txt",
  },
};

export default defineNuxtConfig(CONFIG);
