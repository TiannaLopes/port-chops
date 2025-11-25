<template>
  <nav class="bg-white shadow-sm sticky top-0 z-50">
    <div class="container-custom">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center space-x-2">
          <span class="text-2xl font-display font-bold text-breezeway-700">Port-Chops</span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <NuxtLink 
            v-for="item in navigation" 
            :key="item.name"
            :to="item.href"
            class="text-gray-700 hover:text-breezeway-600 font-medium transition-colors"
            active-class="text-breezeway-600 font-semibold"
          >
            {{ item.name }}
          </NuxtLink>
          
          <!-- Search Icon -->
          <button
            @click="openSearch"
            class="text-gray-700 hover:text-breezeway-600 transition-colors p-2"
            aria-label="Search"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>

        <!-- Mobile Buttons -->
        <div class="md:hidden flex items-center space-x-2">
          <!-- Mobile Search -->
          <button
            @click="openSearch"
            class="p-2 rounded-lg hover:bg-seasalt-100 transition-colors"
            aria-label="Search"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          
          <!-- Mobile Menu Button -->
          <button 
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="p-2 rounded-lg hover:bg-seasalt-100 transition-colors"
            aria-label="Toggle menu"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                v-if="!mobileMenuOpen"
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path 
                v-else
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div 
        v-show="mobileMenuOpen"
        class="md:hidden py-4 border-t border-seasalt-200"
      >
        <NuxtLink
          v-for="item in navigation"
          :key="item.name"
          :to="item.href"
          @click="mobileMenuOpen = false"
          class="block py-2 text-gray-700 hover:text-breezeway-600 font-medium transition-colors"
          active-class="text-breezeway-600 font-semibold"
        >
          {{ item.name }}
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const mobileMenuOpen = ref(false)

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Learn Portuguese', href: '/learn' },
  { name: 'Recipes', href: '/recipes' },
  { name: 'Media Resources', href: '/media' },
  { name: 'Cultural Notes', href: '/cultural' },
  { name: 'Contact Us', href: '/contact' },
]

const openSearch = () => {
  router.push('/search')
}
</script>
