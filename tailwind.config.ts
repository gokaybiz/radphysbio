import type { Config } from "tailwindcss";

export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        "light-blue": {
          50: "#e1f5fe",
          100: "#b3e5fc",
          200: "#81d4fa",
          300: "#4fc3f7",
          400: "#29b6f6",
          500: "#03a9f4",
          600: "#039be5",
          700: "#0288d1",
          800: "#0277bd",
          900: "#01579b",
          "100-accent": "#80d8ff",
          "200-accent": "#40c4ff",
          "400-accent": "#00b0ff",
          "700-accent": "#0091ea",
        },
      },
      minHeight: {
        "screen-75": "75vh",
      },
    },
  },
  darkMode: "class",
} satisfies Config;
