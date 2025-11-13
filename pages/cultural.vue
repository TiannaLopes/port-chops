<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-breezeway-600 to-breezeway-800 text-white py-20">
      <div class="container-custom">
        <h1 class="text-5xl font-display font-bold mb-4">Cultural Notes</h1>
        <p class="text-xl text-breezeway-100 max-w-2xl">
          Dive deep into Portuguese culture, traditions, idioms, and regional differences. 
          Understanding the culture is key to mastering the language.
        </p>
      </div>
    </section>

    <!-- Cultural Topics Grid -->
    <section class="container-custom py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <article 
          v-for="article in culturalArticles" 
          :key="article.title"
          class="card overflow-hidden"
        >
          <div class="h-48 overflow-hidden">
            <img 
              :src="article.image" 
              :alt="article.title"
              class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div class="p-6">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-10 h-10 bg-gradient-to-br from-butter-400 to-cottage rounded-lg flex-shrink-0"></div>
              <span class="text-sm text-breezeway-600 font-semibold uppercase tracking-wide">{{ article.category }}</span>
            </div>
            <h2 class="text-2xl font-display font-bold mb-3 text-breezeway-800">{{ article.title }}</h2>
            <p class="text-gray-600 mb-4">{{ article.excerpt }}</p>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-500">{{ article.readTime }}</span>
              <button class="text-breezeway-600 hover:text-breezeway-700 font-semibold transition-colors">
                Read More →
              </button>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- Quick Cultural Tips -->
    <section class="bg-white py-16">
      <div class="container-custom">
        <h2 class="text-4xl font-display font-bold text-gray-900 mb-8 text-center">
          Quick Cultural Tips
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            v-for="tip in culturalTips" 
            :key="tip.title"
            class="bg-seasalt-50 p-8 rounded-2xl border border-seasalt-200 hover:shadow-lg transition-shadow"
          >
            <div class="w-12 h-12 bg-gradient-to-br from-brick to-cottage rounded-xl mb-4"></div>
            <h3 class="text-lg font-semibold mb-3 text-breezeway-800">{{ tip.title }}</h3>
            <p class="text-gray-600 text-sm">{{ tip.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Common Idioms Section -->
    <section class="container-custom py-16">
      <h2 class="text-4xl font-display font-bold text-gray-900 mb-8">
        Common Portuguese Idioms
      </h2>
      <div class="space-y-4">
        <div 
          v-for="idiom in idioms" 
          :key="idiom.portuguese"
          class="card p-6"
        >
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 bg-gradient-to-br from-garden to-butter-400 rounded-lg flex-shrink-0 mt-1"></div>
            <div class="flex-grow">
              <h3 class="text-xl font-display font-bold text-breezeway-700 mb-2">
                "{{ idiom.portuguese }}"
              </h3>
              <p class="text-gray-600 mb-2">
                <strong>Literal:</strong> {{ idiom.literal }}
              </p>
              <p class="text-gray-800">
                <strong>Meaning:</strong> {{ idiom.meaning }}
              </p>
              <p class="text-gray-600 text-sm mt-2 italic">
                {{ idiom.example }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'Portuguese Culture & Traditions - Idioms, Festivals, Customs | Port-Chops',
  ogTitle: 'Portuguese Cultural Notes',
  description: 'Explore Portuguese culture, traditions, idioms, and regional customs. Learn about festivals, etiquette, and cultural context to enrich your language learning.',
  ogDescription: 'Deep dive into Portuguese culture, traditions, and idioms.',
  ogImage: '/og-culture.jpg',
})

const culturalArticles = [
  {
    category: 'Festivals',
    title: 'Santos Populares: June Festivals in Lisbon',
    excerpt: 'Discover the vibrant street parties celebrating St. Anthony, St. John, and St. Peter. Learn traditional songs, foods, and phrases used during these celebrations.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=400&fit=crop',
    readTime: '5 min read'
  },
  {
    category: 'Language',
    title: 'Tu vs. Você: Portuguese Formality',
    excerpt: 'Navigate the complex world of Portuguese pronouns. When to use tu, você, or even o senhor/a senhora in different social contexts.',
    image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800&h=400&fit=crop',
    readTime: '4 min read'
  },
  {
    category: 'History',
    title: 'The Age of Discoveries and Portuguese Language',
    excerpt: 'How Portugal\'s maritime exploration shaped the language and left Portuguese words in languages worldwide.',
    image: 'https://images.unsplash.com/photo-1548963670-aaaa8f73a5e3?w=800&h=400&fit=crop',
    readTime: '7 min read'
  },
  {
    category: 'Traditions',
    title: 'Fado: The Soul of Portugal',
    excerpt: 'Understanding fado music and its cultural significance. Learn the vocabulary of saudade and Portuguese melancholy.',
    image: 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=800&h=400&fit=crop',
    readTime: '6 min read'
  },
  {
    category: 'Food Culture',
    title: 'Portuguese Coffee Culture',
    excerpt: 'From bica to galão: master ordering coffee like a local. Understanding the social ritual of Portuguese coffee breaks.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=400&fit=crop',
    readTime: '4 min read'
  },
  {
    title: 'Regional Differences: Lisbon vs. Porto',
    category: 'Geography',
    excerpt: 'Discover the linguistic and cultural differences between Portugal\'s two major cities, including accent variations and local expressions.',
    image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&h=400&fit=crop',
    readTime: '5 min read'
  }
]

const culturalTips = [
  {
    title: 'Greeting Etiquette',
    description: 'Portuguese people greet with two kisses on the cheek (starting with the right). Handshakes are common in formal settings.'
  },
  {
    title: 'Meal Times',
    description: 'Lunch is typically 12:30-2pm, dinner around 8-9pm. Don\'t be surprised if restaurants are empty at 6pm!'
  },
  {
    title: 'Gift Giving',
    description: 'If invited to someone\'s home, bring wine, chocolates, or flowers. Yellow flowers symbolize separation, avoid them.'
  },
  {
    title: 'Small Talk',
    description: 'Portuguese people appreciate genuine conversation. Asking about family and work is common and welcomed.'
  },
  {
    title: 'Walking Culture',
    description: 'Portuguese cities are best explored on foot. Walking while chatting is a common social activity.'
  },
  {
    title: 'Football Passion',
    description: 'Football is serious business. Know the big three: Benfica, Porto, and Sporting. Choose wisely or stay neutral!'
  }
]

const idioms = [
  {
    portuguese: 'Estar com os azeites',
    literal: 'To be with the olive oils',
    meaning: 'To be in a bad mood or angry',
    example: 'Example: "Não fales com ele agora, está com os azeites." (Don\'t talk to him now, he\'s in a bad mood.)'
  },
  {
    portuguese: 'Chutar para canto',
    literal: 'To kick to the corner',
    meaning: 'To avoid or postpone dealing with something',
    example: 'Example: "Ele sempre chuta para canto as decisões difíceis." (He always avoids difficult decisions.)'
  },
  {
    portuguese: 'Estar nas nuvens',
    literal: 'To be in the clouds',
    meaning: 'To be daydreaming or distracted',
    example: 'Example: "Ela está nas nuvens hoje, não ouve nada." (She\'s daydreaming today, not listening to anything.)'
  },
  {
    portuguese: 'Dar o braço a torcer',
    literal: 'To give your arm to twist',
    meaning: 'To admit you were wrong or to give in',
    example: 'Example: "Finalmente, ele deu o braço a torcer." (Finally, he admitted he was wrong.)'
  },
  {
    portuguese: 'Meter água',
    literal: 'To put water',
    meaning: 'To exaggerate or embellish a story',
    example: 'Example: "Essa história tem muita água." (That story is greatly exaggerated.)'
  },
  {
    portuguese: 'Ficar a ver navios',
    literal: 'To stay watching ships',
    meaning: 'To be left waiting or disappointed',
    example: 'Example: "Esperei horas por ele, mas fiquei a ver navios." (I waited hours for him, but was left waiting.)'
  }
]
</script>
