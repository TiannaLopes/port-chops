<template>
  <div class="progress-chart">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-semibold text-breezeway-800">{{ title }}</h3>
      <div class="flex gap-2">
        <button
          v-for="period in periods"
          :key="period.value"
          @click="selectedPeriod = period.value"
          class="px-3 py-1 text-sm rounded-lg transition-colors"
          :class="selectedPeriod === period.value 
            ? 'bg-breezeway-600 text-white' 
            : 'bg-seasalt-100 text-gray-600 hover:bg-seasalt-200'"
        >
          {{ period.label }}
        </button>
      </div>
    </div>
    
    <!-- Chart Area -->
    <div class="h-48 flex items-end justify-between gap-2">
      <div
        v-for="(bar, index) in chartData"
        :key="index"
        class="flex-1 flex flex-col items-center"
      >
        <div class="w-full flex flex-col items-center justify-end h-40">
          <div
            class="w-full rounded-t-md transition-all duration-300"
            :class="getBarColor(bar.value)"
            :style="{ height: getBarHeight(bar.value) + '%' }"
          ></div>
        </div>
        <span class="text-xs text-gray-500 mt-2">{{ bar.label }}</span>
      </div>
    </div>
    
    <!-- Legend -->
    <div class="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-seasalt-200">
      <div class="flex items-center gap-2">
        <div class="w-3 h-3 rounded bg-breezeway-500"></div>
        <span class="text-sm text-gray-600">{{ legendLabel }}</span>
      </div>
      <div v-if="showTarget" class="flex items-center gap-2">
        <div class="w-3 h-3 rounded border-2 border-butter-500 border-dashed"></div>
        <span class="text-sm text-gray-600">Daily Goal</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Activity Chart'
  },
  data: {
    type: Array,
    default: () => []
  },
  legendLabel: {
    type: String,
    default: 'Lessons'
  },
  showTarget: {
    type: Boolean,
    default: false
  },
  target: {
    type: Number,
    default: 3
  }
})

const periods = [
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' }
]

const selectedPeriod = ref('week')

const chartData = computed(() => {
  if (props.data && props.data.length > 0) {
    return props.data.slice(0, selectedPeriod.value === 'week' ? 7 : 30)
  }
  
  // Generate placeholder data if none provided
  const days = selectedPeriod.value === 'week' ? 7 : 30
  const labels = selectedPeriod.value === 'week' 
    ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    : Array.from({ length: days }, (_, i) => (i + 1).toString())
  
  return labels.map((label, index) => ({
    label,
    value: 0
  }))
})

const maxValue = computed(() => {
  const max = Math.max(...chartData.value.map(d => d.value), props.target)
  return max > 0 ? max : 5
})

const getBarHeight = (value) => {
  return Math.max(5, (value / maxValue.value) * 100)
}

const getBarColor = (value) => {
  if (props.showTarget) {
    return value >= props.target ? 'bg-garden-500' : 'bg-breezeway-500'
  }
  return 'bg-breezeway-500'
}
</script>
