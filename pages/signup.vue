<template>
  <div class="min-h-screen bg-seasalt-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full">
      <!-- Logo/Brand -->
      <div class="text-center mb-8">
        <NuxtLink to="/" class="inline-block">
          <h1 class="text-4xl font-display font-bold text-breezeway-700">Port-Chops</h1>
        </NuxtLink>
        <p class="mt-2 text-gray-600">Start your Portuguese learning journey</p>
      </div>

      <!-- Signup Card -->
      <div class="card p-8">
        <h2 class="text-2xl font-bold text-center mb-6 text-breezeway-800">Create Your Account</h2>

        <form @submit.prevent="handleSignup" class="space-y-6">
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
              autocomplete="name"
              class="w-full px-4 py-3 border border-seasalt-300 rounded-lg focus:ring-2 focus:ring-breezeway-500 focus:border-transparent outline-none transition-all"
              placeholder="João Silva"
            />
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              autocomplete="email"
              class="w-full px-4 py-3 border border-seasalt-300 rounded-lg focus:ring-2 focus:ring-breezeway-500 focus:border-transparent outline-none transition-all"
              placeholder="you@example.com"
            />
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              autocomplete="new-password"
              class="w-full px-4 py-3 border border-seasalt-300 rounded-lg focus:ring-2 focus:ring-breezeway-500 focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
            />
            <p class="mt-1 text-xs text-gray-500">Must be at least 8 characters</p>
          </div>

          <!-- Confirm Password -->
          <div>
            <label for="confirmPassword" class="block text-sm font-semibold text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              v-model="form.confirmPassword"
              type="password"
              required
              autocomplete="new-password"
              class="w-full px-4 py-3 border border-seasalt-300 rounded-lg focus:ring-2 focus:ring-breezeway-500 focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <!-- Terms & Conditions -->
          <div>
            <label class="flex items-start">
              <input
                v-model="form.agreedToTerms"
                type="checkbox"
                required
                class="w-4 h-4 text-breezeway-600 border-gray-300 rounded focus:ring-breezeway-500 mt-1"
              />
              <span class="ml-2 text-sm text-gray-600">
                I agree to the 
                <NuxtLink to="/terms" class="text-breezeway-600 hover:text-breezeway-700 font-medium">Terms of Service</NuxtLink>
                and
                <NuxtLink to="/privacy" class="text-breezeway-600 hover:text-breezeway-700 font-medium">Privacy Policy</NuxtLink>
              </span>
            </label>
          </div>

          <!-- Error Message -->
          <div v-if="error" class="bg-brick-50 border border-brick-200 text-brick-700 px-4 py-3 rounded-lg text-sm">
            {{ error }}
          </div>

          <!-- Success Message -->
          <div v-if="success" class="bg-garden-50 border border-garden-200 text-garden-700 px-4 py-3 rounded-lg text-sm">
            {{ success }}
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full btn-primary"
            :disabled="isLoading"
          >
            {{ isLoading ? 'Creating account...' : 'Create Account' }}
          </button>
        </form>

        <!-- Social Signup (Optional) -->
        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-seasalt-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">Or sign up with</span>
            </div>
          </div>

          <div class="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              class="w-full btn-secondary"
            >
              Google
            </button>
            <button
              type="button"
              class="w-full btn-secondary"
            >
              Facebook
            </button>
          </div>
        </div>

        <!-- Sign In Link -->
        <div class="mt-6 text-center">
          <p class="text-gray-600">
            Already have an account?
            <NuxtLink to="/login" class="text-breezeway-600 hover:text-breezeway-700 font-semibold">
              Sign in
            </NuxtLink>
          </p>
        </div>
      </div>

      <!-- Back to Home -->
      <div class="mt-6 text-center">
        <NuxtLink to="/" class="text-gray-600 hover:text-gray-800 text-sm">
          ← Back to home
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

useSeoMeta({
  title: 'Sign Up - Port-Chops',
  description: 'Create a free Port-Chops account and start learning Portuguese today.',
  robots: 'noindex, nofollow'
})

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
    // TODO: Implement AWS Amplify Auth signup
    // For now, simulate signup
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Store user data (replace with actual auth)
    const userData = {
      name: form.value.name,
      email: form.value.email,
      createdAt: new Date().toISOString(),
      progress: {
        completedLessons: [],
        currentLevel: 'beginner',
        points: 0
      }
    }
    
    localStorage.setItem('user', JSON.stringify(userData))
    
    success.value = 'Account created successfully! Redirecting...'
    
    // Redirect to dashboard
    setTimeout(() => {
      navigateTo('/dashboard')
    }, 1500)
  } catch (err) {
    error.value = 'Failed to create account. Please try again.'
  } finally {
    isLoading.value = false
  }
}
</script>
