<template>
  <div 
    class="achievement-badge p-4 rounded-lg transition-all duration-300"
    :class="badgeClasses"
  >
    <div class="flex items-center gap-3">
      <div 
        class="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg"
        :class="iconClasses"
      >
        {{ initials }}
      </div>
      <div class="flex-1 min-w-0">
        <h4 class="font-semibold truncate" :class="titleClasses">
          {{ achievement.title }}
        </h4>
        <p v-if="showDescription" class="text-sm truncate" :class="descClasses">
          {{ achievement.description }}
        </p>
        <div class="flex items-center gap-2 mt-1">
          <span v-if="achievement.points" class="text-xs font-semibold" :class="pointsClasses">
            +{{ achievement.points }} pts
          </span>
          <span v-if="achievement.earned && achievement.earnedAt" class="text-xs" :class="dateClasses">
            {{ formatDate(achievement.earnedAt) }}
          </span>
        </div>
      </div>
      <div v-if="achievement.earned" class="shrink-0">
        <span class="text-xs font-semibold px-2 py-1 rounded bg-garden-500 text-white">
          Earned
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  achievement: {
    type: Object,
    required: true
  },
  showDescription: {
    type: Boolean,
    default: true
  },
  size: {
    type: String,
    default: 'normal',
    validator: (value) => ['small', 'normal', 'large'].includes(value)
  }
})

const initials = computed(() => {
  const words = props.achievement.title.split(' ')
  if (words.length >= 2) {
    return words[0][0] + words[1][0]
  }
  return props.achievement.title.substring(0, 2).toUpperCase()
})

const badgeClasses = computed(() => {
  return props.achievement.earned 
    ? 'bg-breezeway-50 border border-breezeway-200' 
    : 'bg-gray-50 border border-gray-200 opacity-60'
})

const iconClasses = computed(() => {
  return props.achievement.earned
    ? 'bg-breezeway-600 text-white'
    : 'bg-gray-300 text-gray-500'
})

const titleClasses = computed(() => {
  return props.achievement.earned ? 'text-breezeway-900' : 'text-gray-500'
})

const descClasses = computed(() => {
  return props.achievement.earned ? 'text-gray-600' : 'text-gray-400'
})

const pointsClasses = computed(() => {
  return props.achievement.earned ? 'text-butter-600' : 'text-gray-400'
})

const dateClasses = computed(() => {
  return 'text-gray-400'
})

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
</script>
