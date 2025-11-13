<template>
  <div class="card group cursor-pointer">
    <div class="relative overflow-hidden h-48">
      <img 
        :src="recipe.image" 
        :alt="recipe.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div v-if="recipe.difficulty" class="absolute top-4 right-4">
        <span class="bg-white px-3 py-1 rounded-full text-sm font-medium shadow-sm">
          {{ recipe.difficulty }}
        </span>
      </div>
    </div>
    
    <div class="p-6">
      <h3 class="text-xl font-display font-semibold text-breezeway-900 mb-2">
        {{ recipe.title }}
      </h3>
      
      <p v-if="recipe.portugueseName" class="text-breezeway-600 italic mb-2 font-medium">
        {{ recipe.portugueseName }}
      </p>
      
      <p class="text-gray-600 mb-4 line-clamp-2">
        {{ recipe.description }}
      </p>

      <div v-if="recipe.cookTime || recipe.servings" class="flex items-center gap-4 text-sm text-gray-600 mb-4 font-medium">
        <span v-if="recipe.cookTime" class="flex items-center gap-2">
          <span class="text-breezeway-600">Time:</span> {{ recipe.cookTime }}
        </span>
        <span v-if="recipe.servings" class="flex items-center gap-2">
          <span class="text-breezeway-600">Serves:</span> {{ recipe.servings }}
        </span>
      </div>
      
      <NuxtLink 
        :to="`/recipes/${recipe.slug || recipe.id}`"
        class="btn-primary inline-block text-center w-full"
      >
        View Recipe
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
defineProps({
  recipe: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
