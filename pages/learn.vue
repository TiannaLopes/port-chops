<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-breezeway-600 to-breezeway-800 text-white py-20">
      <div class="container-custom">
        <h1 class="text-5xl font-display font-bold mb-4">Learn Portuguese</h1>
        <p class="text-xl text-breezeway-100 max-w-2xl">
          Master European Portuguese with structured lessons, from basic greetings to advanced grammar. 
          Learn at your own pace with practical, real-world examples.
        </p>
      </div>
    </section>

    <!-- Available Lessons -->
    <section class="container-custom py-16">
      <h2 class="text-3xl font-display font-bold mb-8 text-gray-900">Available Lessons</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <NuxtLink 
          v-for="lesson in lessons" 
          :key="lesson.lessonId"
          :to="`/lessons/${lesson.slug}`"
          class="card p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300 border-l-4 border-breezeway-500"
        >
          <div class="flex items-center gap-3 mb-4">
            <span class="px-3 py-1 bg-breezeway-100 text-breezeway-800 rounded-full text-xs font-semibold">
              {{ lesson.category }}
            </span>
            <span class="px-3 py-1 bg-butter-100 text-butter-800 rounded-full text-xs font-semibold">
              {{ lesson.difficulty }}
            </span>
          </div>
          
          <h3 class="text-2xl font-display font-bold mb-3 text-breezeway-800">{{ lesson.title }}</h3>
          <p class="text-gray-600 mb-4 line-clamp-3">{{ lesson.description }}</p>
          
          <div class="flex items-center text-sm text-breezeway-600 font-semibold mb-6">
            <span>{{ lesson.estimatedTime }}</span>
          </div>
          
          <div class="btn-primary w-full text-center">
            Start Lesson
          </div>
        </NuxtLink>
      </div>
      
      <div v-if="lessons.length === 0" class="text-center py-12">
        <p class="text-gray-600 text-lg">More lessons coming soon!</p>
      </div>
    </section>

    <!-- Lesson Categories Overview -->
    <section class="container-custom py-16">
      <h2 class="text-3xl font-display font-bold mb-8 text-gray-900">Learning Path</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="category in lessonCategories" 
          :key="category.title"
          class="card p-8 border-l-4 border-breezeway-500"
        >
          <div class="w-16 h-16 bg-gradient-to-br from-butter-400 to-cottage rounded-2xl mb-6"></div>
          <h3 class="text-2xl font-display font-bold mb-3 text-breezeway-800">{{ category.title }}</h3>
          <p class="text-gray-600 mb-4">{{ category.description }}</p>
          <div class="text-sm text-breezeway-600 font-semibold mb-4">
            {{ category.lessons }} lessons • {{ category.level }}
          </div>
          <ul class="space-y-3">
            <li v-for="topic in category.topics" :key="topic" class="flex items-start">
              <span class="inline-block w-2 h-2 bg-breezeway-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span class="text-gray-700">{{ topic }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Learning Path -->
    <section class="bg-white py-20">
      <div class="container-custom">
        <h2 class="text-4xl font-display font-bold text-gray-900 mb-12 text-center">
          Your Learning Path
        </h2>
        <div class="max-w-4xl mx-auto">
          <div 
            v-for="(step, index) in learningPath" 
            :key="step.title"
            class="flex gap-6 mb-12"
          >
            <div class="flex-shrink-0">
              <div class="w-14 h-14 rounded-full bg-gradient-to-br from-breezeway-500 to-breezeway-700 text-white flex items-center justify-center font-bold text-xl shadow-lg">
                {{ index + 1 }}
              </div>
            </div>
            <div class="flex-grow pb-8 border-l-2 border-seasalt-300 pl-8 -ml-px">
              <h3 class="text-xl font-semibold mb-3 text-breezeway-800">{{ step.title }}</h3>
              <p class="text-gray-600 leading-relaxed">{{ step.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import lessonsIndex from '~/data/lessons/index.json'

useSeoMeta({
  title: 'Learn European Portuguese - Structured Lessons | Port-Chops',
  ogTitle: 'Learn Portuguese - Interactive Lessons',
  description: 'Master European Portuguese with structured lessons covering greetings, travel, grammar, and conversation. From beginner to advanced, learn Portuguese effectively.',
  ogDescription: 'Interactive Portuguese lessons organized by topic and difficulty level.',
  ogImage: '/og-learn.jpg',
})

const lessons = ref(lessonsIndex)

const lessonCategories = [
  {
    title: 'Basics & Greetings',
    description: 'Start your Portuguese journey with essential phrases and introductions.',
    lessons: 8,
    level: 'Beginner',
    topics: [
      'Hello, goodbye, thank you',
      'Introducing yourself',
      'Numbers 1-100',
      'Days, months, time'
    ]
  },
  {
    title: 'Travel & Directions',
    description: 'Navigate Portugal like a local with practical travel vocabulary.',
    lessons: 12,
    level: 'Beginner/Intermediate',
    topics: [
      'Asking for directions',
      'Transportation',
      'Hotel & accommodation',
      'Emergency phrases'
    ]
  },
  {
    title: 'Food & Dining',
    description: 'Order confidently at restaurants and markets across Portugal.',
    lessons: 10,
    level: 'Beginner/Intermediate',
    topics: [
      'Restaurant vocabulary',
      'Food items & ingredients',
      'Ordering & paying',
      'Dietary restrictions'
    ]
  },
  {
    title: 'Grammar Essentials',
    description: 'Build a solid foundation with Portuguese grammar rules.',
    lessons: 15,
    level: 'Intermediate',
    topics: [
      'Verb conjugations',
      'Pronouns & articles',
      'Ser vs. Estar',
      'Past & future tenses'
    ]
  },
  {
    title: 'Conversation Skills',
    description: 'Practice real conversations and improve your fluency.',
    lessons: 14,
    level: 'Intermediate/Advanced',
    topics: [
      'Small talk & opinions',
      'Expressing emotions',
      'Storytelling',
      'Debates & discussions'
    ]
  },
  {
    title: 'Business Portuguese',
    description: 'Professional language for work and formal situations.',
    lessons: 10,
    level: 'Advanced',
    topics: [
      'Emails & correspondence',
      'Meetings & presentations',
      'Negotiations',
      'Industry-specific terms'
    ]
  }
]

const learningPath = [
  {
    title: 'Start with Basics',
    description: 'Begin with essential greetings, introductions, and common phrases. Build your foundation with pronunciation guides and simple conversations.'
  },
  {
    title: 'Practice with Recipes',
    description: 'Apply your learning by following Portuguese recipes. Learn food vocabulary, measurements, and cooking instructions in context.'
  },
  {
    title: 'Immerse in Media',
    description: 'Watch Portuguese TV shows, listen to podcasts, and read books. Train your ear with authentic content from native speakers.'
  },
  {
    title: 'Study Grammar',
    description: 'Deepen your understanding with structured grammar lessons. Master verb conjugations, tenses, and sentence structure.'
  },
  {
    title: 'Engage with Culture',
    description: 'Learn idioms, slang, and cultural context. Understand Portuguese traditions, festivals, and regional differences.'
  }
]
</script>
