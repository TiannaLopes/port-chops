<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-breezeway-600 to-breezeway-800 text-white py-12">
      <div class="container-custom">
        <h1 class="text-4xl font-display font-bold mb-4">Search Results</h1>
        <p v-if="searchQuery" class="text-xl text-breezeway-100">
          {{ totalResults }} results for "{{ searchQuery }}"
        </p>
        <p v-else class="text-xl text-breezeway-100">
          Enter a search term to find lessons, recipes, and cultural content
        </p>
      </div>
    </section>

    <!-- Search Bar -->
    <section class="container-custom py-8">
      <SearchBar />
    </section>

    <!-- Filters and Sort -->
    <section v-if="searchQuery" class="container-custom pb-8">
      <div class="flex flex-wrap gap-4 items-center justify-between">
        <!-- Content Type Filters -->
        <div class="flex flex-wrap gap-3">
          <button
            v-for="filter in contentTypeFilters"
            :key="filter.value"
            @click="selectedType = filter.value"
            :class="[
              'px-4 py-2 rounded-lg font-semibold transition-all duration-200 text-sm',
              selectedType === filter.value
                ? 'bg-breezeway-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-seasalt-100 shadow-sm border border-seasalt-300'
            ]"
          >
            {{ filter.label }}
          </button>
        </div>

        <!-- Sort Options -->
        <div class="flex items-center gap-3">
          <span class="text-sm text-gray-600 font-medium">Sort by:</span>
          <select
            v-model="selectedSort"
            class="px-4 py-2 rounded-lg border border-seasalt-300 focus:outline-none focus:border-breezeway-500 text-sm"
          >
            <option value="relevance">Relevance</option>
            <option value="title">Title</option>
            <option value="type">Type</option>
          </select>
        </div>
      </div>
    </section>

    <!-- Loading State -->
    <section v-if="loading" class="container-custom py-16">
      <div class="text-center">
        <div class="inline-block w-12 h-12 border-4 border-breezeway-200 border-t-breezeway-600 rounded-full animate-spin"></div>
        <p class="mt-4 text-gray-600">Searching...</p>
      </div>
    </section>

    <!-- No Results -->
    <section v-else-if="!loading && searchQuery && results.length === 0" class="container-custom py-16">
      <div class="text-center max-w-2xl mx-auto">
        <div class="w-20 h-20 bg-seasalt-200 rounded-full mx-auto mb-6 flex items-center justify-center">
          <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h2 class="text-2xl font-display font-bold text-gray-900 mb-3">No results found</h2>
        <p class="text-gray-600 mb-6">
          We couldn't find any content matching "{{ searchQuery }}". Try different keywords or browse our content categories.
        </p>
        <div class="flex flex-wrap gap-3 justify-center">
          <NuxtLink to="/learn" class="btn-primary">
            Browse Lessons
          </NuxtLink>
          <NuxtLink to="/recipes" class="btn-secondary">
            View Recipes
          </NuxtLink>
          <NuxtLink to="/cultural" class="btn-secondary">
            Cultural Notes
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Search Results -->
    <section v-else-if="!loading && results.length > 0" class="container-custom pb-16">
      <div class="space-y-6">
        <div
          v-for="result in results"
          :key="result.title"
          class="card p-6 hover:shadow-2xl transition-shadow cursor-pointer"
          @click="navigateToResult(result)"
        >
          <div class="flex items-start gap-4">
            <div class="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-butter-400 to-cottage rounded-xl"></div>
            <div class="flex-grow">
              <div class="flex items-center gap-3 mb-2">
                <span
                  :class="[
                    'px-3 py-1 rounded-full text-xs font-semibold uppercase',
                    result.type === 'lesson' ? 'bg-garden-100 text-garden-800' :
                    result.type === 'recipe' ? 'bg-butter-100 text-butter-800' :
                    result.type === 'cultural' ? 'bg-brick-100 text-brick-800' :
                    'bg-breezeway-100 text-breezeway-800'
                  ]"
                >
                  {{ result.type }}
                </span>
                <span v-if="result.category" class="text-sm text-gray-500">
                  {{ result.category }}
                </span>
                <span v-if="result.difficulty" class="text-sm text-gray-500">
                  {{ result.difficulty }}
                </span>
              </div>
              <h3 class="text-xl font-display font-bold text-breezeway-800 mb-2">
                {{ result.title }}
              </h3>
              <p class="text-gray-600 leading-relaxed">
                {{ result.description }}
              </p>
            </div>
            <div class="flex-shrink-0">
              <svg class="w-6 h-6 text-breezeway-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Popular Searches / Trending Content -->
    <section v-if="!searchQuery" class="bg-white py-16">
      <div class="container-custom">
        <h2 class="text-3xl font-display font-bold text-gray-900 mb-8">Popular Searches</h2>
        <div class="flex flex-wrap gap-3">
          <button
            v-for="popular in popularSearches"
            :key="popular"
            @click="performSearch(popular)"
            class="px-5 py-2 bg-seasalt-100 hover:bg-breezeway-100 text-gray-700 hover:text-breezeway-800 rounded-full font-medium transition-colors"
          >
            {{ popular }}
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

useSeoMeta({
  title: 'Search - Find Portuguese Lessons, Recipes & Cultural Content | Port-Chops',
  ogTitle: 'Search Port-Chops Content',
  description: 'Search for Portuguese lessons, authentic recipes, cultural insights, and media resources. Find exactly what you need to learn Portuguese.',
  ogDescription: 'Search all Port-Chops content in one place.',
  ogImage: '/og-search.jpg',
})

const searchQuery = ref('')
const selectedType = ref('')
const selectedSort = ref('relevance')
const results = ref([])
const totalResults = ref(0)
const loading = ref(false)

const contentTypeFilters = [
  { label: 'All Content', value: '' },
  { label: 'Lessons', value: 'lessons' },
  { label: 'Recipes', value: 'recipes' },
  { label: 'Cultural', value: 'cultural' },
  { label: 'Media', value: 'media' }
]

const popularSearches = [
  'greetings',
  'pastéis de nata',
  'fado music',
  'grammar',
  'travel phrases',
  'portuguese coffee',
  'bacalhau',
  'verb conjugation'
]

const performSearch = async (query = null) => {
  const q = query || searchQuery.value
  if (!q || q.trim() === '') {
    results.value = []
    totalResults.value = 0
    return
  }

  loading.value = true
  
  try {
    const params = {
      q: q
    }
    
    if (selectedType.value) {
      params.type = selectedType.value
    }
    
    if (selectedSort.value) {
      params.sort = selectedSort.value
    }

    const response = await $fetch('/api/search', { params })
    
    if (response.success) {
      results.value = response.results
      totalResults.value = response.total
    }
  } catch (error) {
    console.error('Search failed:', error)
    results.value = []
    totalResults.value = 0
  } finally {
    loading.value = false
  }
}

const navigateToResult = (result) => {
  if (result.link) {
    router.push(result.link)
  }
}

// Watch for URL query changes
watch(() => route.query.q, (newQuery) => {
  if (newQuery) {
    searchQuery.value = newQuery
    performSearch()
  }
}, { immediate: true })

// Watch for filter and sort changes
watch([selectedType, selectedSort], () => {
  if (searchQuery.value) {
    performSearch()
  }
})

onMounted(() => {
  if (route.query.q) {
    searchQuery.value = route.query.q
    performSearch()
  }
})
</script>
