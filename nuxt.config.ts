export default defineNuxtConfig({
  css: ["~/assets/css/tailwind.css"], // Ensure this file exists
  modules: ["@nuxt/ui", "@nuxtjs/tailwindcss", "nuxt-icon"],

  ui: {
    global: true,
    icons: ["heroicons", "ph"],
  },

  app: {
    head: {
      title: "Cosyal Platform",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content: "Platform for environmental impact projects",
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  devtools: { enabled: true },
  compatibilityDate: "2024-12-10",
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
});
