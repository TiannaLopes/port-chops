export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const { q, type, sort } = query
    
    if (!q || q.trim() === '') {
      return {
        success: false,
        message: 'Search query is required',
        results: []
      }
    }

    const searchTerm = q.toLowerCase().trim()
    const results = []

    // Search Lessons
    if (!type || type === 'lessons') {
      const lessonResults = searchLessons(searchTerm)
      results.push(...lessonResults)
    }

    // Search Recipes
    if (!type || type === 'recipes') {
      const recipeResults = searchRecipes(searchTerm)
      results.push(...recipeResults)
    }

    // Search Cultural Content
    if (!type || type === 'cultural') {
      const culturalResults = searchCultural(searchTerm)
      results.push(...culturalResults)
    }

    // Search Media
    if (!type || type === 'media') {
      const mediaResults = searchMedia(searchTerm)
      results.push(...mediaResults)
    }

    // Apply sorting
    let sortedResults = results
    if (sort === 'relevance') {
      // Results are already sorted by relevance (match quality)
      sortedResults = results
    } else if (sort === 'title') {
      sortedResults = results.sort((a, b) => a.title.localeCompare(b.title))
    } else if (sort === 'type') {
      sortedResults = results.sort((a, b) => a.type.localeCompare(b.type))
    }

    return {
      success: true,
      query: q,
      total: sortedResults.length,
      results: sortedResults
    }
  } catch (error) {
    console.error('Search error:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to perform search'
    })
  }
})

function searchLessons(searchTerm) {
  const lessons = [
    { title: 'Basics & Greetings', category: 'Beginner', topics: ['Hello', 'goodbye', 'thank you', 'introducing yourself', 'numbers', 'days', 'months', 'time'] },
    { title: 'Travel & Directions', category: 'Beginner/Intermediate', topics: ['asking for directions', 'transportation', 'hotel', 'accommodation', 'emergency phrases'] },
    { title: 'Food & Dining', category: 'Beginner/Intermediate', topics: ['restaurant vocabulary', 'food items', 'ingredients', 'ordering', 'paying', 'dietary restrictions'] },
    { title: 'Grammar Essentials', category: 'Intermediate', topics: ['verb conjugations', 'pronouns', 'articles', 'ser vs estar', 'past tenses', 'future tenses'] },
    { title: 'Conversation Skills', category: 'Intermediate/Advanced', topics: ['small talk', 'opinions', 'expressing emotions', 'storytelling', 'debates', 'discussions'] },
    { title: 'Business Portuguese', category: 'Advanced', topics: ['emails', 'correspondence', 'meetings', 'presentations', 'negotiations', 'industry terms'] }
  ]

  return lessons
    .filter(lesson => {
      const titleMatch = lesson.title.toLowerCase().includes(searchTerm)
      const categoryMatch = lesson.category.toLowerCase().includes(searchTerm)
      const topicMatch = lesson.topics.some(topic => topic.toLowerCase().includes(searchTerm))
      return titleMatch || categoryMatch || topicMatch
    })
    .map(lesson => ({
      type: 'lesson',
      title: lesson.title,
      description: `${lesson.category} - Learn ${lesson.topics.slice(0, 3).join(', ')}`,
      category: lesson.category,
      link: '/learn'
    }))
}

function searchRecipes(searchTerm) {
  const recipes = [
    {
      title: 'Bacalhau à Brás',
      portugueseName: 'Salt Cod with Potatoes & Eggs',
      description: 'A classic Lisbon dish combining shredded cod, crispy potatoes, and eggs.',
      difficulty: 'Medium',
      category: 'Main Dishes'
    },
    {
      title: 'Pastéis de Nata',
      portugueseName: 'Portuguese Custard Tarts',
      description: 'Iconic Portuguese pastries with flaky crust and creamy custard.',
      difficulty: 'Hard',
      category: 'Desserts'
    },
    {
      title: 'Caldo Verde',
      portugueseName: 'Portuguese Green Soup',
      description: 'Comforting kale and potato soup with chorizo.',
      difficulty: 'Easy',
      category: 'Soups'
    },
    {
      title: 'Francesinha',
      portugueseName: 'Porto-Style Sandwich',
      description: 'A hearty Porto sandwich with meat, cheese, and beer sauce.',
      difficulty: 'Medium',
      category: 'Main Dishes'
    },
    {
      title: 'Pão de Ló',
      portugueseName: 'Portuguese Sponge Cake',
      description: 'Light and airy sponge cake from Ovar.',
      difficulty: 'Medium',
      category: 'Desserts'
    },
    {
      title: 'Ameijoas à Bulhão Pato',
      portugueseName: 'Clams in Garlic Sauce',
      description: 'Simple but flavorful clam dish with garlic and cilantro.',
      difficulty: 'Easy',
      category: 'Appetizers'
    }
  ]

  return recipes
    .filter(recipe => {
      const titleMatch = recipe.title.toLowerCase().includes(searchTerm)
      const descMatch = recipe.description.toLowerCase().includes(searchTerm)
      const categoryMatch = recipe.category.toLowerCase().includes(searchTerm)
      const difficultyMatch = recipe.difficulty.toLowerCase().includes(searchTerm)
      return titleMatch || descMatch || categoryMatch || difficultyMatch
    })
    .map(recipe => ({
      type: 'recipe',
      title: recipe.title,
      description: recipe.description,
      category: recipe.category,
      difficulty: recipe.difficulty,
      link: '/recipes'
    }))
}

function searchCultural(searchTerm) {
  const culturalContent = [
    {
      title: 'Santos Populares: June Festivals in Lisbon',
      category: 'Festivals',
      excerpt: 'Discover the vibrant street parties celebrating St. Anthony, St. John, and St. Peter.'
    },
    {
      title: 'Tu vs. Você: Portuguese Formality',
      category: 'Language',
      excerpt: 'Navigate the complex world of Portuguese pronouns and formality levels.'
    },
    {
      title: 'The Age of Discoveries and Portuguese Language',
      category: 'History',
      excerpt: 'How Portugal\'s maritime exploration shaped the language worldwide.'
    },
    {
      title: 'Fado: The Soul of Portugal',
      category: 'Traditions',
      excerpt: 'Understanding fado music and its cultural significance in Portuguese culture.'
    },
    {
      title: 'Portuguese Coffee Culture',
      category: 'Food Culture',
      excerpt: 'From bica to galão: master ordering coffee like a local.'
    },
    {
      title: 'Regional Differences: Lisbon vs. Porto',
      category: 'Geography',
      excerpt: 'Discover the linguistic and cultural differences between Portugal\'s two major cities.'
    }
  ]

  return culturalContent
    .filter(content => {
      const titleMatch = content.title.toLowerCase().includes(searchTerm)
      const excerptMatch = content.excerpt.toLowerCase().includes(searchTerm)
      const categoryMatch = content.category.toLowerCase().includes(searchTerm)
      return titleMatch || excerptMatch || categoryMatch
    })
    .map(content => ({
      type: 'cultural',
      title: content.title,
      description: content.excerpt,
      category: content.category,
      link: '/cultural'
    }))
}

function searchMedia(searchTerm) {
  const mediaResources = [
    {
      title: '3% (Netflix Series)',
      description: 'Brazilian Portuguese thriller series set in dystopian future',
      level: 'Intermediate',
      type: 'TV Shows'
    },
    {
      title: 'Conta-me Como Foi',
      description: 'Portuguese historical drama following a family through decades',
      level: 'Intermediate',
      type: 'TV Shows'
    },
    {
      title: 'City of God',
      description: 'Classic Brazilian film about life in Rio de Janeiro favelas',
      level: 'Advanced',
      type: 'Movies'
    },
    {
      title: 'Portuguese Lab Podcast',
      description: 'Lessons on European Portuguese pronunciation and grammar',
      level: 'Beginner',
      type: 'Podcasts'
    },
    {
      title: 'Easy Portuguese YouTube',
      description: 'Street interviews with Portuguese speakers and subtitles',
      level: 'Beginner',
      type: 'YouTube'
    }
  ]

  return mediaResources
    .filter(media => {
      const titleMatch = media.title.toLowerCase().includes(searchTerm)
      const descMatch = media.description.toLowerCase().includes(searchTerm)
      const typeMatch = media.type.toLowerCase().includes(searchTerm)
      const levelMatch = media.level.toLowerCase().includes(searchTerm)
      return titleMatch || descMatch || typeMatch || levelMatch
    })
    .map(media => ({
      type: 'media',
      title: media.title,
      description: media.description,
      category: media.type,
      level: media.level,
      link: '/media'
    }))
}
