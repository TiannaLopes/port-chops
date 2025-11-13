# Port-Chops - Learn European Portuguese 🇵🇹

A modern, SSR-enabled Portuguese learning website built with Nuxt 4 and TailwindCSS. Learn European Portuguese through authentic recipes, cultural insights, and immersive media resources.

## ✨ Features

- 🎓 **Structured Lessons** - Progressive learning path from basics to advanced
- 🍽️ **Portuguese Recipes** - Learn through authentic cuisine with vocabulary notes
- 📺 **Media Resources** - Curated TV shows, podcasts, books, and YouTube channels
- 🎭 **Cultural Insights** - Deep dives into traditions, idioms, and regional differences
- 📱 **Fully Responsive** - Beautiful design on all devices
- ⚡ **SSR Optimized** - Fast loading with server-side rendering
- 🎨 **Modern UI** - Clean design with TailwindCSS and ocean/sand color palette

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn or pnpm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see your site!

## 📦 Project Structure

```
port-chops/
├── assets/
│   └── css/
│       └── main.css          # Global styles & Tailwind imports
├── components/
│   ├── NavBar.vue             # Main navigation
│   ├── Footer.vue             # Site footer
│   ├── NewsletterPopup.vue    # Newsletter subscription modal
│   └── RecipeCard.vue         # Recipe display card
├── layouts/
│   └── default.vue            # Default layout wrapper
├── pages/
│   ├── index.vue              # Home page
│   ├── learn.vue              # Portuguese lessons
│   ├── recipes.vue            # Recipe collection
│   ├── media.vue              # Media resources
│   ├── cultural.vue           # Cultural notes
│   └── contact.vue            # Contact form
├── public/                    # Static assets
├── nuxt.config.ts             # Nuxt configuration
├── tailwind.config.js         # Tailwind configuration
└── package.json
```

## 🛠️ Tech Stack

- **Framework**: Nuxt 4 (Vue 3)
- **Styling**: TailwindCSS
- **Fonts**: Inter (body), Playfair Display (headings)
- **Rendering**: Server-Side Rendering (SSR)
- **Deployment**: Ready for Vercel, Netlify, or Node.js

## 🎨 Design System

### Colors

- **Ocean Blue**: Primary brand color (`ocean-600`, `ocean-700`)
- **Sand Beige**: Secondary/background (`sand-50`, `sand-100`)
- **Text**: Gray scale for readability

### Typography

- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

## 📄 Pages Overview

### Home (`/`)
Hero section, features, featured recipes, and CTA

### Learn Portuguese (`/learn`)
Organized lesson categories by topic and difficulty level

### Recipes (`/recipes`)
Portuguese recipes with filters and cultural notes

### Media Resources (`/media`)
Curated content: TV shows, podcasts, YouTube, books, music

### Cultural Notes (`/cultural`)
Articles on traditions, idioms, festivals, and etiquette

### Contact (`/contact`)
Contact form and FAQ section

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Vercel auto-detects Nuxt and deploys

Or use Vercel CLI:
```bash
npm install -g vercel
vercel
```

### Netlify

1. Push to GitHub
2. Connect repository in Netlify
3. Build command: `npm run build`
4. Publish directory: `.output/public`

Or use Netlify CLI:
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Node.js Server

```bash
# Build for production
npm run build

# Start production server
node .output/server/index.mjs
```

### Static Generation (SSG)

For static hosting:
```bash
npm run generate
```

Deploy the `.output/public` directory to any static host.

## 🔧 Configuration

### Environment Variables

Create a `.env` file:

```env
NUXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Changing Deployment Target

In `nuxt.config.ts`, modify the `nitro.preset`:

```typescript
nitro: {
  preset: 'vercel',  // or 'netlify', 'node-server', etc.
}
```

## 📝 Customization

### Adding New Pages

Create a `.vue` file in `/pages`:

```vue
<template>
  <div>
    <!-- Your content -->
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'Your Page Title',
  description: 'Your page description'
})
</script>
```

Nuxt automatically creates routes based on file names.

### Modifying Navigation

Edit `components/NavBar.vue` and update the `navigation` array:

```javascript
const navigation = [
  { name: 'Your Page', href: '/your-page' },
  // ...
]
```

### Styling

- Global styles: `assets/css/main.css`
- Tailwind config: `tailwind.config.js`
- Component styles: Use `<style scoped>` in components

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Add new recipes
- Suggest media resources
- Write cultural articles
- Improve translations
- Report bugs

## 📞 Support

Questions or issues? Contact us at hello@port-chops.com

## 📜 License

MIT License - feel free to use this project for your own learning platform!

---

Built with ❤️ for Portuguese language learners
