<template>
  <div class="min-h-screen flex flex-col">
    <!-- Navigation -->
    <NavBar />

    <!-- Main Content -->
    <main class="flex-grow">
      <slot />
    </main>

    <!-- Footer -->
    <Footer />

    <!-- Newsletter Popup -->
    <NewsletterPopup />
  </div>
</template>

<script setup>
// This is the default layout that wraps all pages
// Components are auto-imported in Nuxt 3
</script>
