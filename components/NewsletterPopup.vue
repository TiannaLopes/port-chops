<template>
  <Teleport to="body">
    <Transition name="fade">
      <div 
        v-if="showPopup && !dismissed"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        @click.self="closePopup"
      >
        <div class="bg-white rounded-2xl max-w-md w-full p-8 relative shadow-2xl">
          <!-- Close Button -->
          <button
            @click="closePopup"
            class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Content -->
          <div class="text-center">
            <div class="w-20 h-20 bg-gradient-to-br from-breezeway-500 to-breezeway-700 rounded-full mx-auto mb-6 flex items-center justify-center">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-2xl font-display font-bold text-gray-900 mb-2">
              Join Our Community
            </h3>
            <p class="text-gray-600 mb-6">
              Get weekly Portuguese lessons, recipes, and cultural tips delivered to your inbox.
            </p>

            <!-- Form -->
            <form @submit.prevent="subscribe" class="space-y-4">
              <input
                v-model="email"
                type="email"
                placeholder="Your email address"
                required
                class="w-full px-4 py-3 border border-seasalt-300 rounded-lg focus:ring-2 focus:ring-breezeway-500 focus:border-transparent outline-none transition-all"
              />
              <button
                type="submit"
                class="w-full btn-primary"
              >
                Subscribe Now
              </button>
            </form>

            <p class="text-sm text-gray-500 mt-4">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const showPopup = ref(false)
const dismissed = ref(false)
const email = ref('')

onMounted(() => {
  // Check if user has already dismissed the popup
  const hasSeenPopup = localStorage.getItem('newsletter-dismissed')
  if (!hasSeenPopup) {
    // Show popup after 3 seconds
    setTimeout(() => {
      showPopup.value = true
    }, 3000)
  } else {
    dismissed.value = true
  }
})

const closePopup = () => {
  showPopup.value = false
  dismissed.value = true
  localStorage.setItem('newsletter-dismissed', 'true')
}

const subscribe = () => {
  if (email.value) {
    alert(`Thank you for subscribing with: ${email.value}`)
    email.value = ''
    closePopup()
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
