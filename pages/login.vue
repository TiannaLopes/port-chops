<template>
  <div class="min-h-screen bg-seasalt-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full">
      <!-- Logo/Brand -->
      <div class="text-center mb-8">
        <NuxtLink to="/" class="inline-block">
          <h1 class="text-4xl font-display font-bold text-breezeway-700">Port-Chops</h1>
        </NuxtLink>
        <p class="mt-2 text-gray-600">Sign in to continue your learning</p>
      </div>

      <!-- Login Card -->
      <div class="card p-8">
        <h2 class="text-2xl font-bold text-center mb-6 text-breezeway-800">Welcome Back</h2>

        <form @submit.prevent="handleLogin" class="space-y-6">
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
              autocomplete="current-password"
              class="w-full px-4 py-3 border border-seasalt-300 rounded-lg focus:ring-2 focus:ring-breezeway-500 focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <!-- Remember Me & Forgot Password -->
          <div class="flex items-center justify-between">
            <label class="flex items-center">
              <input
                v-model="form.remember"
                type="checkbox"
                class="w-4 h-4 text-breezeway-600 border-gray-300 rounded focus:ring-breezeway-500"
              />
              <span class="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <NuxtLink to="/forgot-password" class="text-sm text-breezeway-600 hover:text-breezeway-700 font-medium">
              Forgot password?
            </NuxtLink>
          </div>

          <!-- Error Message -->
          <div v-if="error" class="bg-brick-50 border border-brick-200 text-brick-700 px-4 py-3 rounded-lg text-sm">
            {{ error }}
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full btn-primary"
            :disabled="isLoading"
          >
            {{ isLoading ? 'Signing in...' : 'Sign In' }}
          </button>
        </form>

        <!-- Social Login (Optional) -->
        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-seasalt-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">Or continue with</span>
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

        <!-- Sign Up Link -->
        <div class="mt-6 text-center">
          <p class="text-gray-600">
            Don't have an account?
            <NuxtLink to="/signup" class="text-breezeway-600 hover:text-breezeway-700 font-semibold">
              Sign up free
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
  title: 'Sign In - Port-Chops',
  description: 'Sign in to your Port-Chops account to continue learning Portuguese.',
  robots: 'noindex, nofollow'
})

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
    // TODO: Implement AWS Amplify Auth
    // For now, simulate login
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Store user session (replace with actual auth)
    localStorage.setItem('user', JSON.stringify({ email: form.value.email }))
    
    // Redirect to dashboard
    navigateTo('/dashboard')
  } catch (err) {
    error.value = 'Invalid email or password. Please try again.'
  } finally {
    isLoading.value = false
  }
}
</script>
