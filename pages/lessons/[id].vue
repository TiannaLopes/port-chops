<template>
  <div v-if="lesson" class="min-h-screen bg-seasalt-50">
    <!-- Header -->
    <section class="bg-gradient-to-br from-breezeway-600 to-breezeway-800 text-white py-16">
      <div class="container-custom">
        <NuxtLink to="/learn" class="text-breezeway-100 hover:text-white mb-4 inline-block">
          ← Back to Lessons
        </NuxtLink>
        
        <div class="flex flex-wrap items-center gap-3 mb-4">
          <span class="px-3 py-1 bg-breezeway-500 rounded-full text-sm font-semibold">
            {{ lesson.category }}
          </span>
          <span class="px-3 py-1 bg-butter-500 text-breezeway-900 rounded-full text-sm font-semibold">
            {{ lesson.difficulty }}
          </span>
          <span class="text-breezeway-100 text-sm">
            {{ lesson.estimatedTime }}
          </span>
        </div>
        
        <h1 class="text-5xl font-display font-bold mb-4">{{ lesson.title }}</h1>
        <p class="text-xl text-breezeway-100 max-w-3xl">{{ lesson.description }}</p>
      </div>
    </section>

    <!-- Learning Objectives -->
    <section class="container-custom py-12">
      <div class="card p-8 mb-8">
        <h2 class="text-2xl font-display font-bold mb-6 text-breezeway-800">Learning Objectives</h2>
        <ul class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <li v-for="(objective, index) in lesson.objectives" :key="index" class="flex items-start gap-3">
            <span class="w-6 h-6 bg-garden-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
              {{ index + 1 }}
            </span>
            <span class="text-gray-700">{{ objective }}</span>
          </li>
        </ul>
      </div>
    </section>

    <!-- Vocabulary Section -->
    <section class="container-custom pb-12">
      <div class="card p-8">
        <h2 class="text-3xl font-display font-bold mb-8 text-breezeway-800">Vocabulary</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div 
            v-for="(word, index) in lesson.vocabulary" 
            :key="index"
            class="bg-seasalt-50 p-6 rounded-xl border border-seasalt-200 hover:shadow-md transition-shadow"
          >
            <div class="flex items-start justify-between mb-3">
              <div class="flex-1">
                <h3 class="text-2xl font-display font-bold text-breezeway-700 mb-1">
                  {{ word.portuguese }}
                </h3>
                <p class="text-sm text-gray-500 italic mb-2">{{ word.pronunciation }}</p>
              </div>
            </div>
            
            <p class="text-lg text-gray-900 font-semibold mb-3">{{ word.english }}</p>
            
            <div v-if="word.example" class="bg-white p-3 rounded-lg mb-2">
              <p class="text-sm text-gray-600 mb-1">Example:</p>
              <p class="text-breezeway-700 italic">{{ word.example }}</p>
            </div>
            
            <p v-if="word.notes" class="text-sm text-gray-600">
              <span class="font-semibold">Note:</span> {{ word.notes }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Grammar Section -->
    <section v-if="lesson.grammar && lesson.grammar.length > 0" class="container-custom pb-12">
      <div class="card p-8">
        <h2 class="text-3xl font-display font-bold mb-8 text-breezeway-800">Grammar Notes</h2>
        <div class="space-y-8">
          <div v-for="(note, index) in lesson.grammar" :key="index" class="border-l-4 border-butter-500 pl-6">
            <h3 class="text-xl font-semibold mb-3 text-breezeway-700">{{ note.title }}</h3>
            <p class="text-gray-700 mb-4 leading-relaxed">{{ note.content }}</p>
            <div v-if="note.examples && note.examples.length > 0" class="space-y-2">
              <p class="text-sm font-semibold text-gray-600 mb-2">Examples:</p>
              <div v-for="(example, exIdx) in note.examples" :key="exIdx" 
                   class="bg-seasalt-50 p-3 rounded-lg text-breezeway-700">
                {{ example }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Exercises Section -->
    <section class="container-custom pb-12">
      <div class="card p-8">
        <h2 class="text-3xl font-display font-bold mb-8 text-breezeway-800">Practice Exercises</h2>
        
        <div v-if="!showResults" class="space-y-8">
          <div v-for="(exercise, index) in lesson.exercises" :key="index" class="border-b border-seasalt-200 pb-8 last:border-0">
            <div class="flex items-start gap-3 mb-4">
              <span class="w-8 h-8 bg-breezeway-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                {{ index + 1 }}
              </span>
              <div class="flex-1">
                <p class="text-lg font-semibold text-gray-900 mb-4">{{ exercise.question }}</p>
                
                <!-- Multiple Choice -->
                <div v-if="exercise.type === 'multiple-choice'" class="space-y-3">
                  <button
                    v-for="(option, optIdx) in exercise.options"
                    :key="optIdx"
                    @click="selectAnswer(index, optIdx)"
                    :class="[
                      'w-full text-left p-4 rounded-lg border-2 transition-all',
                      userAnswers[index] === optIdx
                        ? 'border-breezeway-600 bg-breezeway-50'
                        : 'border-seasalt-300 bg-white hover:border-breezeway-400'
                    ]"
                  >
                    {{ option }}
                  </button>
                </div>
                
                <!-- Fill in Blank -->
                <div v-else-if="exercise.type === 'fill-in-blank' || exercise.type === 'translation'" class="max-w-md">
                  <input
                    v-model="userAnswers[index]"
                    type="text"
                    class="w-full px-4 py-3 border-2 border-seasalt-300 rounded-lg focus:border-breezeway-600 focus:outline-none"
                    placeholder="Type your answer..."
                  />
                </div>
                
                <!-- Matching -->
                <div v-else-if="exercise.type === 'matching'" class="space-y-3">
                  <div v-for="(pair, pairIdx) in exercise.pairs" :key="pairIdx" class="flex items-center gap-4">
                    <div class="flex-1 bg-breezeway-50 p-3 rounded-lg font-semibold text-breezeway-800">
                      {{ pair.portuguese }}
                    </div>
                    <span class="text-gray-400">→</span>
                    <select
                      v-model="userAnswers[index][pairIdx]"
                      class="flex-1 px-4 py-3 border-2 border-seasalt-300 rounded-lg focus:border-breezeway-600 focus:outline-none"
                    >
                      <option value="">Select match...</option>
                      <option v-for="(p, i) in exercise.pairs" :key="i" :value="p.english">
                        {{ p.english }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Results -->
        <div v-else class="space-y-8">
          <div class="bg-gradient-to-r from-breezeway-500 to-breezeway-600 text-white p-8 rounded-2xl text-center">
            <h3 class="text-3xl font-bold mb-2">Your Score</h3>
            <p class="text-6xl font-bold mb-2">{{ score }}%</p>
            <p class="text-breezeway-100">{{ correctAnswers }} out of {{ lesson.exercises.length }} correct</p>
          </div>

          <div v-for="(exercise, index) in lesson.exercises" :key="index" class="border-l-4 pl-6"
               :class="isCorrect(index) ? 'border-garden-500' : 'border-brick-500'">
            <div class="flex items-start gap-3 mb-2">
              <span class="text-2xl">{{ isCorrect(index) ? '✓' : '✗' }}</span>
              <div class="flex-1">
                <p class="font-semibold text-gray-900 mb-2">{{ exercise.question }}</p>
                <p class="text-sm text-gray-600 mb-2">
                  <span class="font-semibold">Your answer:</span> {{ formatUserAnswer(index) }}
                </p>
                <p v-if="!isCorrect(index)" class="text-sm text-gray-600 mb-2">
                  <span class="font-semibold">Correct answer:</span> {{ formatCorrectAnswer(exercise) }}
                </p>
                <p class="text-sm text-gray-700 bg-seasalt-50 p-3 rounded-lg">
                  {{ exercise.explanation }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="mt-8 flex gap-4 justify-center">
          <button
            v-if="!showResults"
            @click="checkAnswers"
            class="btn-primary"
            :disabled="!allQuestionsAnswered"
          >
            Check Answers
          </button>
          <button
            v-else
            @click="resetExercises"
            class="btn-secondary"
          >
            Try Again
          </button>
          <NuxtLink to="/learn" class="btn-secondary">
            Back to Lessons
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Cultural Notes -->
    <section v-if="lesson.culturalNotes && lesson.culturalNotes.length > 0" class="container-custom pb-16">
      <div class="card p-8 bg-gradient-to-br from-butter-50 to-cottage-50">
        <h2 class="text-3xl font-display font-bold mb-8 text-breezeway-800">Cultural Notes</h2>
        <div class="space-y-6">
          <div v-for="(note, index) in lesson.culturalNotes" :key="index" class="bg-white p-6 rounded-xl shadow-sm">
            <h3 class="text-xl font-semibold mb-3 text-breezeway-700">{{ note.title }}</h3>
            <p class="text-gray-700 leading-relaxed">{{ note.content }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>

  <div v-else class="min-h-screen bg-seasalt-50 flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">Lesson not found</h1>
      <NuxtLink to="/learn" class="btn-primary">
        Back to Lessons
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const slug = route.params.id

const lesson = ref(null)
const userAnswers = ref({})
const showResults = ref(false)
const correctAnswers = ref(0)
const score = ref(0)

// Load lesson data
onMounted(async () => {
  try {
    const lessonsIndex = await import('~/data/lessons/index.json')
    const lessonMeta = lessonsIndex.default.find(l => l.slug === slug)
    
    if (lessonMeta) {
      const lessonModule = await import(`~/data/lessons/${lessonMeta.lessonId.replace(/^[^-]+-/, '')}.json`)
      lesson.value = lessonModule.default
      initializeAnswers()
    }
  } catch (error) {
    console.error('Error loading lesson:', error)
  }
})

const initializeAnswers = () => {
  const answers = {}
  lesson.value.exercises.forEach((exercise, index) => {
    if (exercise.type === 'matching') {
      answers[index] = {}
    } else {
      answers[index] = null
    }
  })
  userAnswers.value = answers
}

const selectAnswer = (exerciseIndex, optionIndex) => {
  userAnswers.value[exerciseIndex] = optionIndex
}

const allQuestionsAnswered = computed(() => {
  return lesson.value?.exercises.every((exercise, index) => {
    if (exercise.type === 'matching') {
      return Object.keys(userAnswers.value[index] || {}).length === exercise.pairs.length
    }
    return userAnswers.value[index] !== null && userAnswers.value[index] !== ''
  })
})

const checkAnswers = () => {
  let correct = 0
  lesson.value.exercises.forEach((exercise, index) => {
    if (isCorrect(index)) correct++
  })
  correctAnswers.value = correct
  score.value = Math.round((correct / lesson.value.exercises.length) * 100)
  showResults.value = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const isCorrect = (index) => {
  const exercise = lesson.value.exercises[index]
  const userAnswer = userAnswers.value[index]
  
  if (exercise.type === 'multiple-choice') {
    return userAnswer === exercise.correctAnswer
  } else if (exercise.type === 'fill-in-blank' || exercise.type === 'translation') {
    const acceptable = exercise.acceptableAnswers || [exercise.correctAnswer]
    return acceptable.some(ans => 
      ans.toLowerCase().trim() === String(userAnswer).toLowerCase().trim()
    )
  } else if (exercise.type === 'matching') {
    return exercise.pairs.every((pair, pairIdx) => 
      userAnswer[pairIdx] === pair.english
    )
  }
  return false
}

const formatUserAnswer = (index) => {
  const exercise = lesson.value.exercises[index]
  const answer = userAnswers.value[index]
  
  if (exercise.type === 'multiple-choice') {
    return exercise.options[answer]
  } else if (exercise.type === 'matching') {
    return 'See matches above'
  }
  return answer
}

const formatCorrectAnswer = (exercise) => {
  if (exercise.type === 'multiple-choice') {
    return exercise.options[exercise.correctAnswer]
  } else if (exercise.type === 'matching') {
    return 'See correct matches'
  }
  return exercise.correctAnswer
}

const resetExercises = () => {
  initializeAnswers()
  showResults.value = false
  correctAnswers.value = 0
  score.value = 0
}

useSeoMeta({
  title: computed(() => lesson.value ? `${lesson.value.title} - Learn Portuguese | Port-Chops` : 'Lesson - Port-Chops'),
  description: computed(() => lesson.value?.description || 'Learn Portuguese with interactive lessons')
})
</script>
