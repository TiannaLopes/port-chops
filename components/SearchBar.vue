<template>
  <div ref="searchBarRef" class="relative w-full max-w-2xl">
    <div class="relative">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search lessons, recipes, cultural content..."
        class="w-full px-4 py-3 pl-12 pr-4 border-2 border-seasalt-300 rounded-lg focus:outline-none focus:border-breezeway-500 transition-colors"
        @keyup.enter="handleSearch"
        @input="handleInput"
      />
      <div class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <button
        v-if="searchQuery"
        @click="clearSearch"
        class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Autocomplete Suggestions -->
    <div
      v-if="showSuggestions && suggestions.length > 0"
      class="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-seasalt-300 rounded-lg shadow-xl max-h-96 overflow-y-auto z-50"
    >
      <div
        v-for="(suggestion, index) in suggestions"
        :key="index"
        @click="selectSuggestion(suggestion)"
        class="px-4 py-3 hover:bg-seasalt-100 cursor-pointer border-b border-seasalt-200 last:border-b-0"
      >
        <div class="flex items-start gap-3">
          <div class="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-butter-400 to-cottage rounded-lg"></div>
          <div class="flex-grow">
            <div class="flex items-center gap-2 mb-1">
              <span class="text-sm font-semibold text-breezeway-600 uppercase">{{ suggestion.type }}</span>
            </div>
            <div class="text-gray-900 font-medium">{{ suggestion.title }}</div>
            <div v-if="suggestion.description" class="text-sm text-gray-600 mt-1 line-clamp-1">
              {{ suggestion.description }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchQuery = ref('')
const showSuggestions = ref(false)
const suggestions = ref([])
const debounceTimer = ref(null)
const searchBarRef = ref(null)

const handleInput = () => {
  if (debounceTimer.value) {
    clearTimeout(debounceTimer.value)
  }

  if (searchQuery.value.trim().length < 2) {
    showSuggestions.value = false
    suggestions.value = []
    return
  }

  debounceTimer.value = setTimeout(async () => {
    await fetchSuggestions()
  }, 300)
}

const fetchSuggestions = async () => {
  try {
    const response = await $fetch('/api/search/suggestions', {
      params: { q: searchQuery.value }
    })
    if (response.success && response.suggestions) {
      suggestions.value = response.suggestions
      showSuggestions.value = true
    }
  } catch (error) {
    console.error('Failed to fetch suggestions:', error)
  }
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    showSuggestions.value = false
    router.push({
      path: '/search',
      query: { q: searchQuery.value }
    })
  }
}

const selectSuggestion = (suggestion) => {
  searchQuery.value = suggestion.title
  showSuggestions.value = false
  router.push({
    path: '/search',
    query: { q: suggestion.title }
  })
}

const clearSearch = () => {
  searchQuery.value = ''
  showSuggestions.value = false
  suggestions.value = []
}

// Close suggestions when clicking outside
const handleClickOutside = (e) => {
  if (searchBarRef.value && !searchBarRef.value.contains(e.target)) {
    showSuggestions.value = false
  }
}

onMounted(() => {
  if (process.client) {
    document.addEventListener('click', handleClickOutside)
  }
})

onUnmounted(() => {
  if (process.client) {
    document.removeEventListener('click', handleClickOutside)
  }
  if (debounceTimer.value) {
    clearTimeout(debounceTimer.value)
  }
})
</script>
