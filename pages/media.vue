<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-breezeway-600 to-breezeway-800 text-white py-20">
      <div class="container-custom">
        <h1 class="text-5xl font-display font-bold mb-4">Media Resources</h1>
        <p class="text-xl text-breezeway-100 max-w-2xl">
          Immerse yourself in authentic Portuguese content. Curated TV shows, movies, podcasts, 
          books, and YouTube channels for every learning level.
        </p>
      </div>
    </section>

    <!-- Filter Tabs -->
    <section class="container-custom py-8">
      <div class="flex flex-wrap gap-4">
        <button
          v-for="tab in tabs"
          :key="tab"
          @click="activeTab = tab"
          :class="[
            'px-6 py-3 rounded-lg font-semibold transition-all duration-200',
            activeTab === tab
              ? 'bg-breezeway-600 text-white shadow-md'
              : 'bg-white text-gray-700 hover:bg-seasalt-100 shadow-sm'
          ]"
        >
          {{ tab }}
        </button>
      </div>
    </section>

    <!-- Content Grid -->
    <section class="container-custom pb-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="resource in filteredResources" 
          :key="resource.title"
          class="card p-6"
        >
          <div class="flex items-start justify-between mb-4">
            <div class="w-12 h-12 bg-gradient-to-br from-butter-400 to-cottage rounded-xl flex-shrink-0"></div>
            <span 
              :class="[
                'px-3 py-1 rounded-full text-sm font-semibold',
                resource.level === 'Beginner' ? 'bg-garden-100 text-garden-800' :
                resource.level === 'Intermediate' ? 'bg-butter-100 text-butter-800' :
                'bg-brick-100 text-brick-800'
              ]"
            >
              {{ resource.level }}
            </span>
          </div>
          
          <h3 class="text-xl font-display font-bold mb-3 text-breezeway-800">{{ resource.title }}</h3>
          <p class="text-gray-600 mb-4">{{ resource.description }}</p>
          
          <div class="flex flex-wrap gap-2 mb-4">
            <span 
              v-for="tag in resource.tags" 
              :key="tag"
              class="text-xs bg-seasalt-100 text-breezeway-700 px-3 py-1 rounded-full font-medium"
            >
              {{ tag }}
            </span>
          </div>
          
          <a 
            :href="resource.link" 
            target="_blank"
            rel="noopener noreferrer"
            class="btn-primary inline-block text-center w-full"
          >
            {{ resource.linkText }}
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

useSeoMeta({
  title: 'Portuguese Media Resources - TV, Books, Podcasts | Port-Chops',
  ogTitle: 'Portuguese Media Resources',
  description: 'Free Portuguese TV shows, movies, podcasts, YouTube channels, and books. Immerse yourself in European Portuguese with curated content for all levels.',
  ogDescription: 'Curated Portuguese media resources for language learners.',
  ogImage: '/og-media.jpg',
})

const activeTab = ref('All')
const tabs = ['All', 'TV & Movies', 'Podcasts', 'YouTube', 'Books', 'Music']

const resources = [
  // TV & Movies
  {
    category: 'TV & Movies',
    title: 'RTP Play',
    description: 'Free streaming service with Portuguese TV shows, news, and documentaries. Great for authentic listening practice.',
    level: 'Intermediate',
    tags: ['Free', 'Subtitles Available', 'Native Content'],
    link: 'https://www.rtp.pt/play/',
    linkText: 'Watch Now'
  },
  {
    category: 'TV & Movies',
    title: 'Glória (Netflix)',
    description: 'Portuguese spy thriller set during the Cold War. Perfect for intermediate learners with English subtitles available.',
    level: 'Intermediate',
    tags: ['Netflix', 'Drama', 'Historical'],
    link: 'https://www.netflix.com/',
    linkText: 'View on Netflix'
  },
  {
    category: 'TV & Movies',
    title: '3%',
    description: 'Brazilian Portuguese sci-fi series. While not European Portuguese, great for comparing dialects.',
    level: 'Intermediate',
    tags: ['Netflix', 'Sci-Fi', 'Brazilian'],
    link: 'https://www.netflix.com/',
    linkText: 'View on Netflix'
  },
  
  // Podcasts
  {
    category: 'Podcasts',
    title: 'Portuguese Lab',
    description: 'Podcast specifically for Portuguese learners with slow, clear speech and transcripts.',
    level: 'Beginner',
    tags: ['Educational', 'Transcripts', 'Slow Speed'],
    link: 'https://www.portugueselab.com/',
    linkText: 'Listen Now'
  },
  {
    category: 'Podcasts',
    title: 'Fala Português',
    description: 'Intermediate-level conversations about Portuguese culture, history, and daily life.',
    level: 'Intermediate',
    tags: ['Culture', 'Conversation', 'Weekly'],
    link: 'https://www.falaportugues.com/',
    linkText: 'Listen Now'
  },
  {
    category: 'Podcasts',
    title: 'Rádio Renascença',
    description: 'Popular Portuguese radio station with news, talk shows, and entertainment.',
    level: 'Advanced',
    tags: ['News', 'Current Events', 'Native Speed'],
    link: 'https://rr.sapo.pt/',
    linkText: 'Listen Live'
  },

  // YouTube
  {
    category: 'YouTube',
    title: 'Portuguese with Leo',
    description: 'Comprehensive Portuguese lessons covering grammar, vocabulary, and pronunciation.',
    level: 'Beginner',
    tags: ['Lessons', 'Grammar', 'Free'],
    link: 'https://www.youtube.com/',
    linkText: 'Watch Channel'
  },
  {
    category: 'YouTube',
    title: 'Talk the Streets',
    description: 'Street interviews with native Portuguese speakers. Real conversations, authentic accents.',
    level: 'Intermediate',
    tags: ['Street Interviews', 'Authentic', 'Subtitles'],
    link: 'https://www.youtube.com/',
    linkText: 'Watch Channel'
  },
  {
    category: 'YouTube',
    title: 'Portuguese with Carla',
    description: 'Cultural insights, travel tips, and language lessons from a native Portuguese teacher.',
    level: 'Beginner',
    tags: ['Culture', 'Travel', 'Lessons'],
    link: 'https://www.youtube.com/',
    linkText: 'Watch Channel'
  },

  // Books
  {
    category: 'Books',
    title: 'O Príncipe com Orelhas de Burro',
    description: 'Portuguese fairy tale perfect for beginners. Simple language with cultural significance.',
    level: 'Beginner',
    tags: ['Fairy Tale', 'Children\'s Book', 'Classic'],
    link: '#',
    linkText: 'Find Book'
  },
  {
    category: 'Books',
    title: 'Memorial do Convento',
    description: 'José Saramago\'s masterpiece about 18th century Portugal. For advanced learners.',
    level: 'Advanced',
    tags: ['Literature', 'Historical', 'Nobel Prize'],
    link: '#',
    linkText: 'Find Book'
  },
  {
    category: 'Books',
    title: 'Portuguese Short Stories for Beginners',
    description: 'Collection of graded readers with vocabulary support and comprehension questions.',
    level: 'Beginner',
    tags: ['Graded Reader', 'Vocabulary', 'Educational'],
    link: '#',
    linkText: 'Find Book'
  },

  // Music
  {
    category: 'Music',
    title: 'Fado Playlist',
    description: 'Traditional Portuguese music genre. Listen to Amália Rodrigues, Mariza, and modern fado artists.',
    level: 'All Levels',
    tags: ['Traditional', 'Cultural', 'Spotify'],
    link: 'https://open.spotify.com/',
    linkText: 'Listen on Spotify'
  },
  {
    category: 'Music',
    title: 'Top 50 Portugal',
    description: 'Current Portuguese pop hits. Learn modern slang and contemporary expressions.',
    level: 'Intermediate',
    tags: ['Pop', 'Modern', 'Charts'],
    link: 'https://open.spotify.com/',
    linkText: 'Listen on Spotify'
  }
]

const filteredResources = computed(() => {
  if (activeTab.value === 'All') {
    return resources
  }
  return resources.filter(r => r.category === activeTab.value)
})
</script>
