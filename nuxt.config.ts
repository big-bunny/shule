export default {
  ssr: false, // Disable server-side rendering
  
  target: 'static', // Build the application as a static website
  
  // Global page headers
  head: {
    title: 'SCHIELD', // Set the title of the website
    htmlAttrs: {
      lang: 'en' // Set the language attribute of the HTML document
    },
    meta: [
      { charset: 'utf-8' }, // Set the character encoding
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' }, // Set the viewport meta tag
      { hid: 'description', name: 'description', content: '' }, // Set the description meta tag
    ],
    script: [
      { src: 'https://www.paypalobjects.com/donate/sdk/donate-sdk.js', body: true, charset: 'UTF-8' }, // Include an external script
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }, // Set the favicon
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' }, // Preconnect to a font provider
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap' }, // Include a stylesheet from a font provider
    ],
  },

  // Plugins to run before rendering page
  plugins: [], // No plugins are configured

  // Auto import components
  components: true, // Automatically import components

  // Prisma configuration
  prisma: {
    client: {
      connectionString: process.env.DATABASE_URL, // Set the database connection string
      connectionOptions: {} // Additional options for the database connection
    }
  },

  // Pages configuration
  pages: {
    routes: [
      '/pages/protected/Donate.vue',
      '/pages/Gallery.vue',
      '/pages/Home.vue',
      '/pages/index.vue',
      '/pages/News.vue',
      '/pages/Sponsor-program.vue',
      '/pages/Sponsor.vue',
    ], // Specify the routes for the pages
  },

  // Build Configuration
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {}, // Use Tailwind CSS for styling
          autoprefixer: {}, // Apply vendor prefixes to CSS
        },
      },
    },
  },

  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/auth-next', '@nuxtjs/tailwindcss'], // Enable build modules

  css: ['@fortawesome/fontawesome-free/css/all.min.css'], // Include CSS files

  modules: ['@nuxtjs/tailwindcss', '@sidebase/nuxt-auth' ], // Enable modules

  tailwindcss: {
    jit: true, // Enable Just-in-Time (JIT) mode for Tailwind CSS
  },
  experimentalFeatures: {
    nodeModules: true, // Enable experimental features related to node_modules
  },

  // Router configuration
  router: {
    middleware: ['auth'], // Apply the 'auth' middleware to the router
  },

  auth: {
    origin: process.env.ORIGIN, // Set the origin for authentication
    enableGlobalAppMiddleware: true, // Enable global app middleware for authentication
  },
};
