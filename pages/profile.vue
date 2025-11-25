<template>
  <div class="min-h-screen bg-seasalt-50 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <NuxtLink to="/dashboard" class="text-breezeway-600 hover:text-breezeway-700 text-sm font-medium">
          Back to Dashboard
        </NuxtLink>
        <h1 class="text-3xl font-display font-bold text-breezeway-800 mt-2">
          Profile Settings
        </h1>
        <p class="mt-1 text-gray-600">Manage your account and preferences</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left Column: Profile Form -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Profile Card -->
          <div class="card p-6">
            <h2 class="text-xl font-bold text-breezeway-800 mb-6">Personal Information</h2>
            
            <form @submit.prevent="handleUpdateProfile" class="space-y-6">
              <!-- Avatar Preview -->
              <div class="flex items-center gap-4">
                <div class="w-20 h-20 bg-breezeway-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  {{ userInitials }}
                </div>
                <div>
                  <p class="font-semibold text-gray-900">{{ form.name || 'Your Name' }}</p>
                  <p class="text-sm text-gray-600">{{ form.email }}</p>
                </div>
              </div>

              <!-- Name -->
              <div>
                <label for="name" class="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-seasalt-300 rounded-lg focus:ring-2 focus:ring-breezeway-500 focus:border-transparent outline-none transition-all"
                  placeholder="Your name"
                />
              </div>

              <!-- Email (Read-only) -->
              <div>
                <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  disabled
                  class="w-full px-4 py-3 border border-seasalt-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                />
                <p class="mt-1 text-xs text-gray-500">Email cannot be changed</p>
              </div>

              <!-- Success/Error Messages -->
              <div v-if="successMessage" class="bg-garden-50 border border-garden-200 text-garden-700 px-4 py-3 rounded-lg text-sm">
                {{ successMessage }}
              </div>
              
              <div v-if="errorMessage" class="bg-brick-50 border border-brick-200 text-brick-700 px-4 py-3 rounded-lg text-sm">
                {{ errorMessage }}
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                class="btn-primary"
                :disabled="isUpdating"
              >
                {{ isUpdating ? 'Saving...' : 'Save Changes' }}
              </button>
            </form>
          </div>

          <!-- Daily Goal Settings -->
          <div class="card p-6">
            <h2 class="text-xl font-bold text-breezeway-800 mb-4">Learning Goals</h2>
            <p class="text-gray-600 mb-4">Set your daily learning target to stay motivated</p>
            
            <div class="flex items-center gap-4">
              <label for="dailyGoal" class="text-sm font-semibold text-gray-700">
                Daily Goal (lessons per day)
              </label>
              <select
                id="dailyGoal"
                v-model="form.dailyGoal"
                @change="handleUpdateDailyGoal"
                class="px-4 py-2 border border-seasalt-300 rounded-lg focus:ring-2 focus:ring-breezeway-500 focus:border-transparent outline-none"
              >
                <option :value="1">1 lesson</option>
                <option :value="2">2 lessons</option>
                <option :value="3">3 lessons</option>
                <option :value="5">5 lessons</option>
                <option :value="10">10 lessons</option>
              </select>
            </div>
          </div>

          <!-- Export Data -->
          <div class="card p-6">
            <h2 class="text-xl font-bold text-breezeway-800 mb-4">Export Your Data</h2>
            <p class="text-gray-600 mb-4">Download a copy of your learning progress and achievements</p>
            
            <div class="flex gap-3">
              <button 
                @click="handleExport('json')" 
                class="btn-secondary"
                :disabled="isExporting"
              >
                {{ isExporting ? 'Exporting...' : 'Export as JSON' }}
              </button>
              <button 
                @click="handleExport('csv')" 
                class="btn-secondary"
                :disabled="isExporting"
              >
                {{ isExporting ? 'Exporting...' : 'Export as CSV' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Right Column: Stats Summary -->
        <div class="space-y-6">
          <!-- Stats Card -->
          <div class="card p-6">
            <h2 class="text-xl font-bold text-breezeway-800 mb-4">Your Stats</h2>
            <div class="space-y-4">
              <div class="flex justify-between items-center pb-3 border-b border-seasalt-200">
                <span class="text-gray-600">Total Points</span>
                <span class="font-bold text-breezeway-800">{{ userStats.totalPoints }}</span>
              </div>
              <div class="flex justify-between items-center pb-3 border-b border-seasalt-200">
                <span class="text-gray-600">Lessons Completed</span>
                <span class="font-bold text-breezeway-800">{{ userStats.completedLessons }}</span>
              </div>
              <div class="flex justify-between items-center pb-3 border-b border-seasalt-200">
                <span class="text-gray-600">Current Streak</span>
                <span class="font-bold text-breezeway-800">{{ userStats.currentStreak }} days</span>
              </div>
              <div class="flex justify-between items-center pb-3 border-b border-seasalt-200">
                <span class="text-gray-600">Longest Streak</span>
                <span class="font-bold text-breezeway-800">{{ userStats.longestStreak }} days</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600">Vocabulary Words</span>
                <span class="font-bold text-breezeway-800">{{ userStats.vocabWords }}</span>
              </div>
            </div>
          </div>

          <!-- Member Since -->
          <div class="card p-6 bg-gradient-to-br from-breezeway-50 to-seasalt-50">
            <p class="text-sm text-gray-600">Member since</p>
            <p class="text-lg font-bold text-breezeway-800">{{ memberSince }}</p>
          </div>

          <!-- Danger Zone -->
          <div class="card p-6 border-brick-200">
            <h2 class="text-xl font-bold text-brick-700 mb-4">Danger Zone</h2>
            <p class="text-gray-600 text-sm mb-4">Sign out of your account</p>
            <button @click="handleLogout" class="w-full text-brick-600 hover:text-brick-700 font-semibold text-sm py-2 border border-brick-300 rounded-lg hover:bg-brick-50 transition-colors">
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

useSeoMeta({
  title: 'Profile - Port-Chops',
  description: 'Manage your Port-Chops profile and settings',
  robots: 'noindex, nofollow'
})

const form = ref({
  name: '',
  email: '',
  dailyGoal: 3
})

const userStats = ref({
  totalPoints: 0,
  completedLessons: 0,
  currentStreak: 0,
  longestStreak: 0,
  vocabWords: 0
})

const userId = ref(null)
const isUpdating = ref(false)
const isExporting = ref(false)
const successMessage = ref('')
const errorMessage = ref('')
const memberSinceDate = ref(null)

const userInitials = computed(() => {
  if (!form.value.name) return 'U'
  const names = form.value.name.split(' ')
  return names.length > 1 
    ? names[0][0] + names[names.length - 1][0]
    : names[0][0]
})

const memberSince = computed(() => {
  if (!memberSinceDate.value) return 'N/A'
  const date = new Date(memberSinceDate.value)
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
})

const loadUserData = async () => {
  try {
    const storedUser = localStorage.getItem('user')
    if (!storedUser) {
      navigateTo('/login')
      return
    }
    
    const userData = JSON.parse(storedUser)
    form.value.name = userData.name || ''
    form.value.email = userData.email || ''
    memberSinceDate.value = userData.createdAt
    userId.value = userData.userId
    
    // Try to fetch stats from API
    if (userId.value) {
      try {
        const response = await $fetch(`/api/progress/stats?userId=${userId.value}`)
        if (response.success) {
          userStats.value = response.stats
          form.value.dailyGoal = response.user.dailyGoalTarget || 3
        }
      } catch {
        // Use defaults if API fails
      }
    }
  } catch {
    navigateTo('/login')
  }
}

const handleUpdateProfile = async () => {
  isUpdating.value = true
  successMessage.value = ''
  errorMessage.value = ''

  try {
    // Update in localStorage
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const userData = JSON.parse(storedUser)
      userData.name = form.value.name
      localStorage.setItem('user', JSON.stringify(userData))
    }
    
    // Update via API if we have userId
    if (userId.value) {
      await $fetch('/api/user/profile', {
        method: 'PUT',
        body: {
          userId: userId.value,
          name: form.value.name
        }
      })
    }
    
    successMessage.value = 'Profile updated successfully!'
  } catch {
    errorMessage.value = 'Failed to update profile. Please try again.'
  } finally {
    isUpdating.value = false
  }
}

const handleUpdateDailyGoal = async () => {
  if (!userId.value) return
  
  try {
    await $fetch('/api/user/profile', {
      method: 'PUT',
      body: {
        userId: userId.value,
        dailyGoal: form.value.dailyGoal
      }
    })
    successMessage.value = 'Daily goal updated!'
    setTimeout(() => { successMessage.value = '' }, 3000)
  } catch {
    errorMessage.value = 'Failed to update daily goal'
    setTimeout(() => { errorMessage.value = '' }, 3000)
  }
}

const handleExport = async (format) => {
  if (!userId.value) return
  
  isExporting.value = true
  
  try {
    const response = await $fetch(`/api/progress/export?userId=${userId.value}&format=${format}`)
    
    if (format === 'json') {
      const blob = new Blob([JSON.stringify(response.data, null, 2)], { type: 'application/json' })
      downloadBlob(blob, `progress-export-${userId.value}.json`)
    } else {
      const blob = new Blob([response], { type: 'text/csv' })
      downloadBlob(blob, `progress-export-${userId.value}.csv`)
    }
    
    successMessage.value = 'Export downloaded successfully!'
    setTimeout(() => { successMessage.value = '' }, 3000)
  } catch {
    errorMessage.value = 'Failed to export data. Please try again.'
  } finally {
    isExporting.value = false
  }
}

const downloadBlob = (blob, filename) => {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

const handleLogout = () => {
  localStorage.removeItem('user')
  navigateTo('/login')
}

onMounted(() => {
  loadUserData()
})
</script>
