# API Integration Examples

## Frontend Usage with Nuxt Components

### 1. Update Login Page to Use Real API

Replace the mock code in `/pages/login.vue`:

```vue
<script setup>
import { ref } from 'vue'

const form = ref({
  email: '',
  password: '',
  remember: false
})

const isLoading = ref(false)
const error = ref('')

const handleLogin = async () => {
  isLoading.value = true
  error.value = ''

  try {
    const response = await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        email: form.value.email,
        password: form.value.password
      }
    })
    
    // Store user data and token
    localStorage.setItem('user', JSON.stringify(response.user))
    localStorage.setItem('token', response.token)
    
    // Redirect to dashboard
    await navigateTo('/dashboard')
  } catch (err) {
    console.error('Login error:', err)
    error.value = err.data?.message || 'Invalid email or password. Please try again.'
  } finally {
    isLoading.value = false
  }
}
</script>
```

### 2. Update Signup Page to Use Real API

Replace the mock code in `/pages/signup.vue`:

```vue
<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreedToTerms: false
})

const isLoading = ref(false)
const error = ref('')
const success = ref('')

const handleSignup = async () => {
  isLoading.value = true
  error.value = ''
  success.value = ''

  // Validate passwords match
  if (form.value.password !== form.value.confirmPassword) {
    error.value = 'Passwords do not match'
    isLoading.value = false
    return
  }

  // Validate password length
  if (form.value.password.length < 8) {
    error.value = 'Password must be at least 8 characters'
    isLoading.value = false
    return
  }

  try {
    const response = await $fetch('/api/auth/signup', {
      method: 'POST',
      body: {
        name: form.value.name,
        email: form.value.email,
        password: form.value.password
      }
    })
    
    success.value = 'Account created successfully! Redirecting...'
    
    // Store user data
    localStorage.setItem('user', JSON.stringify(response.user))
    
    // Redirect to dashboard
    setTimeout(async () => {
      await navigateTo('/dashboard')
    }, 1500)
  } catch (err) {
    console.error('Signup error:', err)
    error.value = err.data?.message || 'Failed to create account. Please try again.'
  } finally {
    isLoading.value = false
  }
}
</script>
```

### 3. Update Dashboard to Load Real User Data

Replace the mock data loading in `/pages/dashboard.vue`:

```vue
<script setup>
import { ref, computed, onMounted } from 'vue'

const user = ref(null)
const userStats = ref({
  completedLessons: 0,
  totalPoints: 0,
  currentStreak: 0,
  vocabWords: 0
})
const userProgress = ref([])
const isLoading = ref(true)

onMounted(async () => {
  const storedUser = localStorage.getItem('user')
  if (!storedUser) {
    await navigateTo('/login')
    return
  }

  const userData = JSON.parse(storedUser)
  
  try {
    // Fetch latest user data from API
    const userResponse = await $fetch(`/api/user/${userData.userId}`)
    user.value = userResponse.user
    
    // Update stats
    userStats.value = {
      completedLessons: user.value.completedLessons?.length || 0,
      totalPoints: user.value.totalPoints || 0,
      currentStreak: user.value.currentStreak || 0,
      vocabWords: user.value.completedLessons?.length * 10 || 0 // Estimate
    }
    
    // Fetch user progress
    const progressResponse = await $fetch(`/api/progress/${userData.userId}`)
    userProgress.value = progressResponse.progress
    
    // Update localStorage with latest data
    localStorage.setItem('user', JSON.stringify(user.value))
  } catch (err) {
    console.error('Error loading user data:', err)
    // If token is invalid, redirect to login
    if (err.statusCode === 401 || err.statusCode === 404) {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      await navigateTo('/login')
    }
  } finally {
    isLoading.value = false
  }
})

const userName = computed(() => user.value?.name || 'User')
const userEmail = computed(() => user.value?.email || '')
// ... rest of computed properties
</script>
```

### 4. Create a Lesson Page with Progress Saving

Create `/pages/lessons/[id].vue`:

```vue
<template>
  <div class="min-h-screen bg-seasalt-50 py-8">
    <div class="max-w-4xl mx-auto px-4">
      <div v-if="isLoading" class="text-center py-12">
        <p class="text-gray-600">Loading lesson...</p>
      </div>
      
      <div v-else-if="lesson" class="card p-8">
        <div class="mb-6">
          <span class="text-sm font-semibold text-breezeway-600 uppercase">
            {{ lesson.category }}
          </span>
          <h1 class="text-3xl font-display font-bold text-breezeway-800 mt-2">
            {{ lesson.title }}
          </h1>
          <p class="text-gray-600 mt-2">{{ lesson.description }}</p>
        </div>

        <!-- Progress Bar -->
        <div class="mb-8">
          <div class="flex justify-between text-sm text-gray-600 mb-2">
            <span>Your Progress</span>
            <span>{{ progress }}%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-3">
            <div 
              class="bg-breezeway-600 h-3 rounded-full transition-all duration-300"
              :style="{ width: progress + '%' }"
            ></div>
          </div>
        </div>

        <!-- Lesson Content -->
        <div class="prose max-w-none mb-8">
          <div v-html="lesson.content"></div>
        </div>

        <!-- Exercise Section -->
        <div v-if="lesson.exercises" class="bg-breezeway-50 p-6 rounded-lg mb-8">
          <h3 class="text-xl font-bold text-breezeway-800 mb-4">Practice Exercises</h3>
          <!-- Add your exercise components here -->
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-4">
          <button 
            @click="saveProgress(50)" 
            class="btn-secondary"
            :disabled="isSaving"
          >
            {{ isSaving ? 'Saving...' : 'Save Progress' }}
          </button>
          <button 
            @click="completeLesson" 
            class="btn-primary"
            :disabled="isSaving"
          >
            {{ isSaving ? 'Saving...' : 'Mark as Complete' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const route = useRoute()
const lessonId = route.params.id

const lesson = ref(null)
const progress = ref(0)
const isLoading = ref(true)
const isSaving = ref(false)
const userId = ref(null)

onMounted(async () => {
  const storedUser = localStorage.getItem('user')
  if (!storedUser) {
    await navigateTo('/login')
    return
  }

  const userData = JSON.parse(storedUser)
  userId.value = userData.userId

  try {
    // Fetch lesson data
    const lessonResponse = await $fetch(`/api/lessons/${lessonId}`)
    lesson.value = lessonResponse.lesson

    // Fetch user's progress for this lesson
    const progressResponse = await $fetch(`/api/progress/${userId.value}`)
    const lessonProgress = progressResponse.progress.find(
      p => p.lessonId === lessonId
    )
    
    if (lessonProgress) {
      progress.value = lessonProgress.progress || 0
    }
  } catch (err) {
    console.error('Error loading lesson:', err)
  } finally {
    isLoading.value = false
  }
})

const saveProgress = async (progressPercent) => {
  isSaving.value = true
  try {
    await $fetch('/api/progress/save', {
      method: 'POST',
      body: {
        userId: userId.value,
        lessonId: lessonId,
        progress: progressPercent,
        completed: false
      }
    })
    
    progress.value = progressPercent
    alert('Progress saved!')
  } catch (err) {
    console.error('Error saving progress:', err)
    alert('Failed to save progress')
  } finally {
    isSaving.value = false
  }
}

const completeLesson = async () => {
  isSaving.value = true
  try {
    await $fetch('/api/progress/save', {
      method: 'POST',
      body: {
        userId: userId.value,
        lessonId: lessonId,
        progress: 100,
        score: 100,
        completed: true
      }
    })
    
    progress.value = 100
    alert('Congratulations! Lesson completed! 🎉')
    await navigateTo('/dashboard')
  } catch (err) {
    console.error('Error completing lesson:', err)
    alert('Failed to complete lesson')
  } finally {
    isSaving.value = false
  }
}
</script>
```

### 5. Create a Composable for Auth

Create `/composables/useAuth.js`:

```javascript
export const useAuth = () => {
  const user = useState('user', () => null)
  const token = useState('token', () => null)

  const isAuthenticated = computed(() => !!user.value && !!token.value)

  const loadUser = () => {
    if (import.meta.client) {
      const storedUser = localStorage.getItem('user')
      const storedToken = localStorage.getItem('token')
      
      if (storedUser) user.value = JSON.parse(storedUser)
      if (storedToken) token.value = storedToken
    }
  }

  const login = async (email, password) => {
    try {
      const response = await $fetch('/api/auth/login', {
        method: 'POST',
        body: { email, password }
      })
      
      user.value = response.user
      token.value = response.token
      
      if (import.meta.client) {
        localStorage.setItem('user', JSON.stringify(response.user))
        localStorage.setItem('token', response.token)
      }
      
      return { success: true }
    } catch (err) {
      return { success: false, error: err.data?.message || 'Login failed' }
    }
  }

  const logout = () => {
    user.value = null
    token.value = null
    
    if (import.meta.client) {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    }
    
    navigateTo('/login')
  }

  const signup = async (name, email, password) => {
    try {
      const response = await $fetch('/api/auth/signup', {
        method: 'POST',
        body: { name, email, password }
      })
      
      user.value = response.user
      
      if (import.meta.client) {
        localStorage.setItem('user', JSON.stringify(response.user))
      }
      
      return { success: true, user: response.user }
    } catch (err) {
      return { success: false, error: err.data?.message || 'Signup failed' }
    }
  }

  return {
    user,
    token,
    isAuthenticated,
    loadUser,
    login,
    logout,
    signup
  }
}
```

### 6. Create Auth Middleware

Create `/middleware/auth.js`:

```javascript
export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.server) return

  const storedUser = localStorage.getItem('user')
  const storedToken = localStorage.getItem('token')

  // Protected routes
  const protectedRoutes = ['/dashboard', '/lessons']
  const isProtectedRoute = protectedRoutes.some(route => 
    to.path.startsWith(route)
  )

  if (isProtectedRoute && (!storedUser || !storedToken)) {
    return navigateTo('/login')
  }

  // If user is logged in and trying to access login/signup, redirect to dashboard
  if ((to.path === '/login' || to.path === '/signup') && storedUser) {
    return navigateTo('/dashboard')
  }
})
```

Add to `nuxt.config.ts`:
```typescript
export default defineNuxtConfig({
  // ... existing config
  router: {
    middleware: ['auth']
  }
})
```

## Testing the API

### Using cURL:

```bash
# Signup
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get user (replace USER_ID)
curl http://localhost:3000/api/user/USER_ID

# Save progress
curl -X POST http://localhost:3000/api/progress/save \
  -H "Content-Type: application/json" \
  -d '{"userId":"USER_ID","lessonId":"lesson_1","progress":75,"score":85,"completed":false}'

# Get user progress
curl http://localhost:3000/api/progress/USER_ID
```

## Summary

1. ✅ **Database**: `/server/utils/db.js` with DynamoDB operations
2. ✅ **Auth APIs**: `/server/api/auth/signup.post.js` and `login.post.js`
3. ✅ **User API**: `/server/api/user/[id].get.js`
4. ✅ **Progress APIs**: `/server/api/progress/save.post.js` and `[userId].get.js`
5. ✅ **Lessons APIs**: `/server/api/lessons/index.get.js` and `[id].get.js`
6. ✅ **Frontend integration examples** above
7. ✅ **Environment variables** in `.env.example`
8. ✅ **Documentation** in `DATABASE_SETUP.md`

Next steps:
1. Set up DynamoDB tables (follow `DATABASE_SETUP.md`)
2. Add environment variables to `.env`
3. Update frontend components with API integration code above
4. Seed initial lesson data
5. Test the full flow!
