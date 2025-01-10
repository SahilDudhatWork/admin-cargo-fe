import local_en from "./config/lang/en.json";

export default {
  ssr: false,

  head: {
    title: "Admin-Cargo-Connect-FE",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  css: ["@/assets/css/tailwind.css", "@/assets/css/global.css"],

  plugins: [
    { src: "~/plugins/vue-slick-carousel.js", mode: "client" },
    { src: "~/plugins/v-click-outside.js", mode: "client" },
    { src: "~/plugins/toast-notification.js", mode: "client" },
    "~/plugins/js-cookie.js",
    "~/plugins/lodash.js",
    "~/plugins/validation.js",
    "~/plugins/downloadFile.js",
    "~/plugins/moment.js",
    { src: "~/plugins/vue2-google-maps.js", ssr: false },
    "~/plugins/statusPlugin.js",
    "~/plugins/vue2-editor.js",
    "~/plugins/vue2-daterange-picker.js",
    "~/plugins/loading-overlay.js",
  ],

  components: [{ path: "~/components/", pathPrefix: false }],

  buildModules: [
    [
      "nuxt-i18n",
      {
        vueI18nLoader: true,
        defaultLocale: "en",
        locales: [
          {
            code: "en",
            name: "English",
          },
        ],
        globalInjection: true,
        vueI18n: {
          locale: "en",
          fallbackLocale: "en",
          messages: { en: { ...local_en } },
        },
      },
    ],
  ],

  modules: [],

  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
  router: {
    prefetchLinks: true,
    extendRoutes(routes, resolve) {
      routes.push({
        name: "operators",
        path: "/carrier/:id/operators",
        component: resolve(__dirname, "pages/carrier/operators/_.vue"),
      });
      routes.push({
        name: "vehicles",
        path: "/carrier/:id/vehicles",
        component: resolve(__dirname, "pages/carrier/vehicles/_.vue"),
      });
    },
  },
};
