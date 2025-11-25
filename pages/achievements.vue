<template>
  <div class="min-h-screen bg-seasalt-50 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <NuxtLink to="/dashboard" class="text-breezeway-600 hover:text-breezeway-700 text-sm font-medium">
          Back to Dashboard
        </NuxtLink>
        <h1 class="text-3xl font-display font-bold text-breezeway-800 mt-2">
          Your Achievements
        </h1>
        <p class="mt-1 text-gray-600">Track your learning milestones and share your progress</p>
      </div>

      <!-- Stats Summary -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div class="card p-6 text-center">
          <div class="text-3xl font-bold text-breezeway-800">{{ earnedCount }}</div>
          <div class="text-gray-600 mt-1">Achievements Earned</div>
        </div>
        <div class="card p-6 text-center">
          <div class="text-3xl font-bold text-butter-600">{{ totalPoints }}</div>
          <div class="text-gray-600 mt-1">Total Points from Achievements</div>
        </div>
        <div class="card p-6 text-center">
          <div class="text-3xl font-bold text-garden-600">{{ progressPercent }}%</div>
          <div class="text-gray-600 mt-1">Progress</div>
        </div>
      </div>

      <!-- Share All Button -->
      <div class="card p-4 mb-8 bg-gradient-to-r from-breezeway-50 to-seasalt-50">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 class="font-semibold text-breezeway-800">Share Your Progress</h3>
            <p class="text-sm text-gray-600">Let your friends know about your learning journey!</p>
          </div>
          <div class="flex gap-2">
            <button 
              @click="shareToTwitter"
              class="px-4 py-2 bg-breezeway-600 text-white rounded-lg hover:bg-breezeway-700 transition-colors text-sm font-medium"
            >
              Share on X
            </button>
            <button 
              @click="shareToFacebook"
              class="px-4 py-2 bg-breezeway-600 text-white rounded-lg hover:bg-breezeway-700 transition-colors text-sm font-medium"
            >
              Share on Facebook
            </button>
            <button 
              @click="copyShareLink"
              class="px-4 py-2 bg-seasalt-200 text-gray-700 rounded-lg hover:bg-seasalt-300 transition-colors text-sm font-medium"
            >
              Copy Link
            </button>
          </div>
        </div>
        <div v-if="copySuccess" class="mt-2 text-sm text-garden-600 font-medium">
          Link copied to clipboard!
        </div>
      </div>

      <!-- Earned Achievements -->
      <div class="mb-8">
        <h2 class="text-xl font-bold text-breezeway-800 mb-4">Earned Achievements</h2>
        <div v-if="earnedAchievements.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AchievementBadge 
            v-for="achievement in earnedAchievements"
            :key="achievement.id"
            :achievement="achievement"
            :show-share="true"
            @share="shareAchievement"
          />
        </div>
        <div v-else class="card p-8 text-center">
          <p class="text-gray-500">You haven't earned any achievements yet.</p>
          <p class="text-sm text-gray-400 mt-1">Complete lessons to unlock achievements!</p>
          <NuxtLink to="/learn" class="btn-primary inline-block mt-4">
            Start Learning
          </NuxtLink>
        </div>
      </div>

      <!-- Locked Achievements -->
      <div>
        <h2 class="text-xl font-bold text-breezeway-800 mb-4">Locked Achievements</h2>
        <div v-if="lockedAchievements.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AchievementBadge 
            v-for="achievement in lockedAchievements"
            :key="achievement.id"
            :achievement="achievement"
          />
        </div>
        <div v-else class="card p-8 text-center">
          <p class="text-garden-600 font-semibold">Congratulations! You've earned all achievements!</p>
        </div>
      </div>

      <!-- Share Modal -->
      <div v-if="showShareModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="card p-6 max-w-md w-full">
          <h3 class="text-xl font-bold text-breezeway-800 mb-4">Share Achievement</h3>
          <div v-if="selectedAchievement" class="mb-4">
            <AchievementBadge :achievement="selectedAchievement" />
          </div>
          <div class="space-y-3">
            <button 
              @click="shareAchievementToTwitter"
              class="w-full px-4 py-3 bg-breezeway-600 text-white rounded-lg hover:bg-breezeway-700 transition-colors font-medium"
            >
              Share on X (Twitter)
            </button>
            <button 
              @click="shareAchievementToFacebook"
              class="w-full px-4 py-3 bg-breezeway-600 text-white rounded-lg hover:bg-breezeway-700 transition-colors font-medium"
            >
              Share on Facebook
            </button>
            <button 
              @click="shareAchievementToLinkedIn"
              class="w-full px-4 py-3 bg-breezeway-600 text-white rounded-lg hover:bg-breezeway-700 transition-colors font-medium"
            >
              Share on LinkedIn
            </button>
            <button 
              @click="copyAchievementLink"
              class="w-full px-4 py-3 bg-seasalt-200 text-gray-700 rounded-lg hover:bg-seasalt-300 transition-colors font-medium"
            >
              Copy Link
            </button>
          </div>
          <button 
            @click="closeShareModal"
            class="w-full mt-4 px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

useSeoMeta({
  title: 'Achievements - Port-Chops',
  description: 'View and share your Portuguese learning achievements',
  robots: 'noindex, nofollow'
})

const achievements = ref([])
const userId = ref(null)
const userName = ref('')
const showShareModal = ref(false)
const selectedAchievement = ref(null)
const copySuccess = ref(false)

const earnedAchievements = computed(() => achievements.value.filter(a => a.earned))
const lockedAchievements = computed(() => achievements.value.filter(a => !a.earned))
const earnedCount = computed(() => earnedAchievements.value.length)
const totalPoints = computed(() => earnedAchievements.value.reduce((sum, a) => sum + (a.points || 0), 0))
const progressPercent = computed(() => {
  if (achievements.value.length === 0) return 0
  return Math.round((earnedCount.value / achievements.value.length) * 100)
})

const loadData = async () => {
  try {
    const storedUser = localStorage.getItem('user')
    if (!storedUser) {
      navigateTo('/login')
      return
    }
    
    const userData = JSON.parse(storedUser)
    userId.value = userData.userId
    userName.value = userData.name || 'User'
    
    if (userId.value) {
      try {
        const response = await $fetch(`/api/progress/stats?userId=${userId.value}`)
        if (response.success) {
          achievements.value = response.achievements || []
        }
      } catch {
        // Use default achievements if API fails
        achievements.value = getDefaultAchievements()
      }
    } else {
      achievements.value = getDefaultAchievements()
    }
  } catch {
    navigateTo('/login')
  }
}

const getDefaultAchievements = () => [
  { id: 'first_step', title: 'First Step', description: 'Complete your first lesson', points: 10, earned: false },
  { id: 'ten_lessons', title: '10 Lessons', description: 'Complete 10 lessons', points: 50, earned: false },
  { id: 'fifty_lessons', title: '50 Lessons', description: 'Complete 50 lessons', points: 200, earned: false },
  { id: 'week_streak', title: 'Week Streak', description: 'Maintain a 7-day streak', points: 100, earned: false },
  { id: 'month_streak', title: 'Month Streak', description: 'Maintain a 30-day streak', points: 500, earned: false },
  { id: 'hundred_words', title: '100 Words', description: 'Learn 100 vocabulary words', points: 150, earned: false },
  { id: 'five_hundred_words', title: '500 Words', description: 'Learn 500 vocabulary words', points: 500, earned: false },
  { id: 'recipe_pro', title: 'Recipe Pro', description: 'Save 10 recipes to favorites', points: 75, earned: false },
  { id: 'points_500', title: 'Point Collector', description: 'Earn 500 points', points: 50, earned: false },
  { id: 'points_1000', title: 'Point Master', description: 'Earn 1000 points', points: 100, earned: false }
]

const getShareText = () => {
  return `I'm learning Portuguese on Port-Chops! I've earned ${earnedCount.value} achievements and ${totalPoints.value} points. Join me!`
}

const getShareUrl = () => {
  return typeof window !== 'undefined' ? window.location.origin : 'https://port-chops.com'
}

const shareToTwitter = () => {
  const text = encodeURIComponent(getShareText())
  const url = encodeURIComponent(getShareUrl())
  window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'width=600,height=400')
}

const shareToFacebook = () => {
  const url = encodeURIComponent(getShareUrl())
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400')
}

const copyShareLink = async () => {
  try {
    await navigator.clipboard.writeText(getShareUrl())
    copySuccess.value = true
    setTimeout(() => { copySuccess.value = false }, 3000)
  } catch {
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = getShareUrl()
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    copySuccess.value = true
    setTimeout(() => { copySuccess.value = false }, 3000)
  }
}

const shareAchievement = (achievement) => {
  selectedAchievement.value = achievement
  showShareModal.value = true
}

const closeShareModal = () => {
  showShareModal.value = false
  selectedAchievement.value = null
}

const getAchievementShareText = () => {
  if (!selectedAchievement.value) return ''
  return `I just earned the "${selectedAchievement.value.title}" achievement on Port-Chops! ${selectedAchievement.value.description}. Learning Portuguese is fun!`
}

const shareAchievementToTwitter = () => {
  const text = encodeURIComponent(getAchievementShareText())
  const url = encodeURIComponent(getShareUrl())
  window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'width=600,height=400')
  closeShareModal()
}

const shareAchievementToFacebook = () => {
  const url = encodeURIComponent(getShareUrl())
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400')
  closeShareModal()
}

const shareAchievementToLinkedIn = () => {
  const url = encodeURIComponent(getShareUrl())
  const title = encodeURIComponent(`Achievement Unlocked: ${selectedAchievement.value?.title || ''}`)
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'width=600,height=400')
  closeShareModal()
}

const copyAchievementLink = async () => {
  try {
    await navigator.clipboard.writeText(getShareUrl())
    closeShareModal()
  } catch {
    // Fallback
    closeShareModal()
  }
}

onMounted(() => {
  loadData()
})
</script>
