<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-breezeway-600 to-breezeway-800 text-white py-20">
      <div class="container-custom">
        <h1 class="text-5xl font-display font-bold mb-4">Contact Us</h1>
        <p class="text-xl text-breezeway-100 max-w-2xl">
          Have questions, suggestions, or just want to say olá? We'd love to hear from you!
        </p>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="container-custom py-16">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Contact Form -->
        <div>
          <h2 class="text-3xl font-display font-bold mb-6">Send us a message</h2>
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                Name *
              </label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent outline-none transition-all"
                placeholder="Your name"
              />
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                class="w-full px-4 py-3 border border-seasalt-300 rounded-lg focus:ring-2 focus:ring-breezeway-500 focus:border-transparent outline-none transition-all"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">
                Subject *
              </label>
              <select
                id="subject"
                v-model="form.subject"
                required
                class="w-full px-4 py-3 border border-seasalt-300 rounded-lg focus:ring-2 focus:ring-breezeway-500 focus:border-transparent outline-none transition-all"
              >
                <option value="">Select a topic</option>
                <option value="general">General Inquiry</option>
                <option value="lesson">Lesson Question</option>
                <option value="recipe">Recipe Suggestion</option>
                <option value="technical">Technical Issue</option>
                <option value="partnership">Partnership Opportunity</option>
                <option value="feedback">Feedback</option>
              </select>
            </div>

            <div>
              <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                v-model="form.message"
                required
                rows="6"
                class="w-full px-4 py-3 border border-seasalt-300 rounded-lg focus:ring-2 focus:ring-breezeway-500 focus:border-transparent outline-none transition-all resize-none"
                placeholder="Tell us more..."
              />
            </div>

            <button
              type="submit"
              class="btn-primary w-full"
              :disabled="isSubmitting"
            >
              {{ isSubmitting ? 'Sending...' : 'Send Message' }}
            </button>

            <p v-if="submitMessage" :class="[
              'text-center font-semibold',
              submitSuccess ? 'text-garden-700' : 'text-brick-700'
            ]">
              {{ submitMessage }}
            </p>
          </form>
        </div>

        <!-- Contact Info & FAQ -->
        <div>
          <div class="card p-8 mb-8">
            <h3 class="text-2xl font-display font-bold mb-6">Get in Touch</h3>
            
            <div class="space-y-6">
              <div class="flex items-start gap-4">
                <div class="w-10 h-10 bg-gradient-to-br from-breezeway-500 to-breezeway-700 rounded-lg flex-shrink-0"></div>
                <div>
                  <h4 class="font-semibold mb-1">Email</h4>
                  <a href="mailto:hello@port-chops.com" class="text-breezeway-600 hover:text-breezeway-700 transition-colors">
                    hello@port-chops.com
                  </a>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="w-10 h-10 bg-gradient-to-br from-butter-400 to-cottage rounded-lg flex-shrink-0"></div>
                <div>
                  <h4 class="font-semibold mb-1">Social Media</h4>
                  <div class="space-x-3">
                    <a href="#" class="text-breezeway-600 hover:text-breezeway-700 transition-colors">Instagram</a>
                    <a href="#" class="text-breezeway-600 hover:text-breezeway-700 transition-colors">YouTube</a>
                    <a href="#" class="text-breezeway-600 hover:text-breezeway-700 transition-colors">Facebook</a>
                  </div>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="w-10 h-10 bg-gradient-to-br from-garden to-butter-400 rounded-lg flex-shrink-0"></div>
                <div>
                  <h4 class="font-semibold mb-1">Response Time</h4>
                  <p class="text-gray-600">We typically respond within 24-48 hours</p>
                </div>
              </div>
            </div>
          </div>

          <div class="card p-8">
            <h3 class="text-2xl font-display font-bold mb-6">Quick FAQs</h3>
            
            <div class="space-y-4">
              <div>
                <h4 class="font-semibold mb-2">Is Port-Chops free?</h4>
                <p class="text-gray-600 text-sm">
                  Yes! All our lessons, recipes, and resources are completely free to access.
                </p>
              </div>

              <div>
                <h4 class="font-semibold mb-2">Do you offer one-on-one tutoring?</h4>
                <p class="text-gray-600 text-sm">
                  We focus on self-study resources, but we can recommend qualified tutors. Contact us for details.
                </p>
              </div>

              <div>
                <h4 class="font-semibold mb-2">Can I contribute content?</h4>
                <p class="text-gray-600 text-sm">
                  We love community contributions! Send us your ideas for recipes, cultural notes, or resources.
                </p>
              </div>

              <div>
                <h4 class="font-semibold mb-2">Is this European or Brazilian Portuguese?</h4>
                <p class="text-gray-600 text-sm">
                  We focus on European Portuguese (Portugal), though we occasionally note differences with Brazilian Portuguese.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

useSeoMeta({
  title: 'Contact Us - Port-Chops Portuguese Learning',
  ogTitle: 'Contact Port-Chops',
  description: 'Get in touch with Port-Chops. Questions about Portuguese lessons, recipe suggestions, or feedback? We\'d love to hear from you.',
  ogDescription: 'Contact the Port-Chops team for questions and feedback.',
  ogImage: '/og-contact.jpg',
})

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const submitMessage = ref('')
const submitSuccess = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true
  submitMessage.value = ''

  // Simulate form submission (replace with actual API call)
  await new Promise(resolve => setTimeout(resolve, 1500))

  // For demo purposes, always show success
  // In production, replace this with actual form handling (Netlify Forms, Formspree, etc.)
  submitSuccess.value = true
  submitMessage.value = 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.'
  
  // Reset form
  form.value = {
    name: '',
    email: '',
    subject: '',
    message: ''
  }

  isSubmitting.value = false

  // Clear message after 5 seconds
  setTimeout(() => {
    submitMessage.value = ''
  }, 5000)
}
</script>
