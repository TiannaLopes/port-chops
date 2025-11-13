<template>
  <footer class="bg-breezeway-900 text-white mt-16">
    <div class="container-custom py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- About Section -->
        <div class="col-span-1 md:col-span-2">
          <h3 class="text-2xl font-display font-bold mb-4">Port-Chops</h3>
          <p class="text-breezeway-200 mb-4">
            Learn European Portuguese through authentic recipes, cultural insights, 
            and immersive media resources. Your journey to fluency starts here.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="font-semibold mb-4">Quick Links</h4>
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/learn" class="text-breezeway-200 hover:text-white transition-colors">>
                Lessons
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/recipes" class="text-breezeway-200 hover:text-white transition-colors">
                Recipes
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/media" class="text-breezeway-200 hover:text-white transition-colors">
                Media
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/cultural" class="text-breezeway-200 hover:text-white transition-colors">
                Culture
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Connect -->
        <div>
          <h4 class="font-semibold mb-4">Connect</h4>
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/contact" class="text-breezeway-200 hover:text-white transition-colors">
                Contact Us
              </NuxtLink>
            </li>
            <li>
              <a href="#newsletter" class="text-breezeway-200 hover:text-white transition-colors">
                Newsletter
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-breezeway-800 mt-8 pt-8 text-center text-breezeway-300">
        <p>&copy; {{ currentYear }} Port-Chops. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>
