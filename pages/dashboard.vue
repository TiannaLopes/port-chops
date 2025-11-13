<template>
  <div class="min-h-screen bg-seasalt-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Welcome Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-display font-bold text-breezeway-800">
          Welcome back, {{ userName }}!
        </h1>
        <p class="mt-2 text-gray-600">Continue your Portuguese learning journey</p>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="card p-6 bg-gradient-to-br from-breezeway-500 to-breezeway-600 text-white">
          <div class="text-3xl font-bold">{{ userStats.completedLessons }}</div>
          <div class="text-breezeway-100 mt-1">Lessons Completed</div>
        </div>
        <div class="card p-6 bg-gradient-to-br from-butter-500 to-cottage-500 text-white">
          <div class="text-3xl font-bold">{{ userStats.totalPoints }}</div>
          <div class="text-butter-100 mt-1">Points Earned</div>
        </div>
        <div class="card p-6 bg-gradient-to-br from-garden-500 to-garden-600 text-white">
          <div class="text-3xl font-bold">{{ userStats.currentStreak }}</div>
          <div class="text-garden-100 mt-1">Day Streak</div>
        </div>
        <div class="card p-6 bg-gradient-to-br from-brick-500 to-brick-600 text-white">
          <div class="text-3xl font-bold">{{ userStats.vocabWords }}</div>
          <div class="text-brick-100 mt-1">Vocabulary Words</div>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left Column: Current Lesson & Progress -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Continue Learning -->
          <div class="card p-6">
            <h2 class="text-2xl font-bold text-breezeway-800 mb-4">Continue Learning</h2>
            <div v-if="currentLesson" class="bg-gradient-to-r from-breezeway-50 to-seasalt-50 p-6 rounded-lg border border-breezeway-200">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="text-sm font-semibold text-breezeway-600 mb-2">{{ currentLesson.category }}</div>
                  <h3 class="text-xl font-bold text-gray-900 mb-2">{{ currentLesson.title }}</h3>
                  <p class="text-gray-600 mb-4">{{ currentLesson.description }}</p>
                  
                  <!-- Progress Bar -->
                  <div class="mb-4">
                    <div class="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{{ currentLesson.progress }}%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        class="bg-breezeway-600 h-2 rounded-full transition-all duration-300"
                        :style="{ width: currentLesson.progress + '%' }"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <NuxtLink to="/learn" class="btn-primary inline-block">
                Continue Lesson
              </NuxtLink>
            </div>
            <div v-else class="text-center py-8">
              <p class="text-gray-600 mb-4">You haven't started any lessons yet!</p>
              <NuxtLink to="/learn" class="btn-primary inline-block">
                Browse Lessons
              </NuxtLink>
            </div>
          </div>

          <!-- Recent Activity -->
          <div class="card p-6">
            <h2 class="text-2xl font-bold text-breezeway-800 mb-4">Recent Activity</h2>
            <div class="space-y-4">
              <div v-for="activity in recentActivity" :key="activity.id" class="flex items-start gap-4 pb-4 border-b border-seasalt-200 last:border-0">
                <div class="flex-1">
                  <p class="font-semibold text-gray-900">{{ activity.title }}</p>
                  <p class="text-sm text-gray-600">{{ activity.description }}</p>
                  <p class="text-xs text-gray-500 mt-1">{{ activity.time }}</p>
                </div>
                <div class="text-right">
                  <div class="text-lg font-bold text-butter-600">+{{ activity.points }}</div>
                  <div class="text-xs text-gray-500">points</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Learning Path -->
          <div class="card p-6">
            <h2 class="text-2xl font-bold text-breezeway-800 mb-4">Your Learning Path</h2>
            <div class="space-y-3">
              <div v-for="level in learningPath" :key="level.id" class="flex items-center gap-4">
                <div 
                  class="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white"
                  :class="level.completed ? 'bg-garden-500' : level.current ? 'bg-breezeway-600' : 'bg-gray-300'"
                >
                  {{ level.level }}
                </div>
                <div class="flex-1">
                  <div class="flex items-center justify-between">
                    <h3 class="font-semibold text-gray-900">{{ level.title }}</h3>
                    <span 
                      class="text-xs font-semibold px-2 py-1 rounded"
                      :class="level.completed ? 'bg-garden-100 text-garden-700' : level.current ? 'bg-breezeway-100 text-breezeway-700' : 'bg-gray-100 text-gray-600'"
                    >
                      {{ level.completed ? 'Completed' : level.current ? 'In Progress' : 'Locked' }}
                    </span>
                  </div>
                  <p class="text-sm text-gray-600">{{ level.lessons }} lessons</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Quick Links & Achievements -->
        <div class="space-y-6">
          <!-- Quick Actions -->
          <div class="card p-6">
            <h2 class="text-xl font-bold text-breezeway-800 mb-4">Quick Actions</h2>
            <div class="space-y-3">
              <NuxtLink to="/learn" class="block w-full btn-primary text-center">
                Browse Lessons
              </NuxtLink>
              <NuxtLink to="/recipes" class="block w-full btn-secondary text-center">
                Explore Recipes
              </NuxtLink>
              <NuxtLink to="/media" class="block w-full btn-secondary text-center">
                Media Resources
              </NuxtLink>
              <NuxtLink to="/cultural" class="block w-full btn-secondary text-center">
                Cultural Tips
              </NuxtLink>
            </div>
          </div>

          <!-- Achievements -->
          <div class="card p-6">
            <h2 class="text-xl font-bold text-breezeway-800 mb-4">Achievements</h2>
            <div class="space-y-2">
              <div v-for="achievement in achievements" :key="achievement.id" class="flex items-center justify-between p-2 rounded-lg" :class="achievement.earned ? 'bg-breezeway-50' : 'bg-gray-50'">
                <p class="text-sm font-semibold" :class="achievement.earned ? 'text-breezeway-900' : 'text-gray-400'">
                  {{ achievement.title }}
                </p>
                <span v-if="achievement.earned" class="text-xs bg-garden-500 text-white px-2 py-1 rounded font-semibold">
                  Earned
                </span>
              </div>
            </div>
          </div>

          <!-- Daily Goal -->
          <div class="card p-6 bg-gradient-to-br from-butter-50 to-cottage-50">
            <h2 class="text-xl font-bold text-breezeway-800 mb-4">Daily Goal</h2>
            <div class="text-center">
              <div class="relative w-32 h-32 mx-auto mb-4">
                <svg class="transform -rotate-90 w-32 h-32">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    stroke-width="8"
                    fill="transparent"
                    class="text-gray-200"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    stroke-width="8"
                    fill="transparent"
                    :stroke-dasharray="circumference"
                    :stroke-dashoffset="circumference - (dailyGoal.progress / 100) * circumference"
                    class="text-breezeway-600 transition-all duration-300"
                  />
                </svg>
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="text-center">
                    <div class="text-3xl font-bold text-breezeway-800">{{ dailyGoal.progress }}%</div>
                    <div class="text-xs text-gray-600">Complete</div>
                  </div>
                </div>
              </div>
              <p class="text-sm text-gray-700 mb-2">
                {{ dailyGoal.completed }} of {{ dailyGoal.target }} lessons today
              </p>
              <p class="text-xs text-gray-600">
                Keep going! You're almost there!
              </p>
            </div>
          </div>

          <!-- Profile Summary -->
          <div class="card p-6">
            <h2 class="text-xl font-bold text-breezeway-800 mb-4">Profile</h2>
            <div class="text-center">
              <div class="w-20 h-20 bg-breezeway-600 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-3xl font-bold">
                {{ userInitials }}
              </div>
              <p class="font-semibold text-gray-900">{{ userName }}</p>
              <p class="text-sm text-gray-600">{{ userEmail }}</p>
              <p class="text-xs text-gray-500 mt-2">Member since {{ memberSince }}</p>
              <div class="mt-4 space-y-2">
                <NuxtLink to="/profile" class="block w-full btn-secondary text-center">
                  Edit Profile
                </NuxtLink>
                <button @click="handleLogout" class="block w-full text-brick-600 hover:text-brick-700 font-semibold text-sm">
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

useSeoMeta({
  title: 'Dashboard - Port-Chops',
  description: 'Your Portuguese learning dashboard',
  robots: 'noindex, nofollow'
})

// User Data (TODO: Replace with actual API calls)
const user = ref({
  name: 'João Silva',
  email: 'joao@example.com',
  createdAt: '2024-01-15'
})

const userStats = ref({
  completedLessons: 12,
  totalPoints: 450,
  currentStreak: 7,
  vocabWords: 85
})

const currentLesson = ref({
  category: 'Basics',
  title: 'Greetings and Introductions',
  description: 'Learn essential phrases for meeting people in Portuguese',
  progress: 65
})

const recentActivity = ref([
  {
    id: 1,
    title: 'Completed: Basic Verbs',
    description: 'Learned 15 essential Portuguese verbs',
    time: '2 hours ago',
    points: 50,
    color: 'bg-breezeway-500'
  },
  {
    id: 2,
    title: 'Recipe Added',
    description: 'Saved Pastéis de Nata to your favorites',
    time: '5 hours ago',
    points: 10,
    color: 'bg-butter-500'
  },
  {
    id: 3,
    title: 'Completed: Numbers',
    description: 'Mastered counting from 1-100',
    time: '1 day ago',
    points: 40,
    color: 'bg-garden-500'
  }
])

const learningPath = ref([
  { id: 1, level: 1, title: 'Beginner', lessons: 10, completed: true, current: false },
  { id: 2, level: 2, title: 'Elementary', lessons: 15, completed: false, current: true },
  { id: 3, level: 3, title: 'Intermediate', lessons: 20, completed: false, current: false },
  { id: 4, level: 4, title: 'Advanced', lessons: 25, completed: false, current: false }
])

const achievements = ref([
  { id: 1, title: 'First Step', earned: true, color: 'bg-breezeway-500' },
  { id: 2, title: '10 Lessons', earned: true, color: 'bg-butter-500' },
  { id: 3, title: 'Week Streak', earned: true, color: 'bg-garden-500' },
  { id: 4, title: '100 Words', earned: false, color: 'bg-brick-500' },
  { id: 5, title: 'Recipe Pro', earned: false, color: 'bg-cottage-500' },
  { id: 6, title: 'Month Streak', earned: false, color: 'bg-seasalt-500' }
])

const dailyGoal = ref({
  target: 3,
  completed: 2,
  progress: 67
})

// Computed properties
const userName = computed(() => user.value.name)
const userEmail = computed(() => user.value.email)
const userInitials = computed(() => {
  const names = user.value.name.split(' ')
  return names.length > 1 
    ? names[0][0] + names[names.length - 1][0]
    : names[0][0]
})
const memberSince = computed(() => {
  const date = new Date(user.value.createdAt)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
})

const circumference = computed(() => 2 * Math.PI * 56)

// Load user data from localStorage
onMounted(() => {
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    const userData = JSON.parse(storedUser)
    user.value.name = userData.name || 'User'
    user.value.email = userData.email || ''
    user.value.createdAt = userData.createdAt || new Date().toISOString()
  } else {
    // Redirect to login if no user
    navigateTo('/login')
  }
})

const handleLogout = () => {
  localStorage.removeItem('user')
  navigateTo('/login')
}
</script>
