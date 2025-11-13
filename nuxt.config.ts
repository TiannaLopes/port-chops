// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts'
  ],

  app: {
    head: {
      title: 'Port-Chops - Learn European Portuguese',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 
          hid: 'description', 
          name: 'description', 
          content: 'Learn European Portuguese through authentic recipes, cultural insights, media resources, and interactive lessons. Master Portuguese language and culture.' 
        },
        { name: 'format-detection', content: 'telephone=no' },
        { property: 'og:title', content: 'Port-Chops - Learn European Portuguese' },
        { property: 'og:description', content: 'Learn Portuguese through food, culture, and immersive content' },
        { property: 'og:type', content: 'website' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  googleFonts: {
    families: {
      'Inter': [400, 500, 600, 700],
      'Playfair Display': [400, 600, 700]
    },
    display: 'swap'
  },

  css: [
    '~/assets/css/main.css'
  ],

  // SSR Configuration
  ssr: true,

  // Nitro configuration for deployment
  nitro: {
    preset: 'aws-amplify', // AWS Amplify deployment
    compressPublicAssets: true
  },

  // Runtime config for environment variables
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    }
  }
})
