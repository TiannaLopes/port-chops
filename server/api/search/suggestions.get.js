export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const { q } = query
    
    if (!q || q.trim() === '' || q.trim().length < 2) {
      return {
        success: true,
        suggestions: []
      }
    }

    const searchTerm = q.toLowerCase().trim()
    const suggestions = []

    // Get quick suggestions from all content types
    const lessonSuggestions = getQuickLessonSuggestions(searchTerm)
    const recipeSuggestions = getQuickRecipeSuggestions(searchTerm)
    const culturalSuggestions = getQuickCulturalSuggestions(searchTerm)

    suggestions.push(...lessonSuggestions, ...recipeSuggestions, ...culturalSuggestions)

    // Limit to top 8 suggestions
    const limitedSuggestions = suggestions.slice(0, 8)

    return {
      success: true,
      suggestions: limitedSuggestions
    }
  } catch (error) {
    console.error('Suggestions error:', error)
    return {
      success: false,
      suggestions: []
    }
  }
})

function getQuickLessonSuggestions(searchTerm) {
  const lessons = [
    { title: 'Basics & Greetings', description: 'Essential Portuguese greetings and introductions' },
    { title: 'Travel & Directions', description: 'Navigate Portugal like a local' },
    { title: 'Food & Dining', description: 'Order confidently at restaurants' },
    { title: 'Grammar Essentials', description: 'Portuguese grammar fundamentals' },
    { title: 'Conversation Skills', description: 'Practice real conversations' },
    { title: 'Business Portuguese', description: 'Professional language for work' }
  ]

  return lessons
    .filter(lesson => lesson.title.toLowerCase().includes(searchTerm) || lesson.description.toLowerCase().includes(searchTerm))
    .slice(0, 3)
    .map(lesson => ({
      type: 'lesson',
      title: lesson.title,
      description: lesson.description
    }))
}

function getQuickRecipeSuggestions(searchTerm) {
  const recipes = [
    { title: 'Bacalhau à Brás', description: 'Classic Lisbon salt cod dish' },
    { title: 'Pastéis de Nata', description: 'Iconic Portuguese custard tarts' },
    { title: 'Caldo Verde', description: 'Traditional Portuguese green soup' },
    { title: 'Francesinha', description: 'Hearty Porto-style sandwich' },
    { title: 'Pão de Ló', description: 'Portuguese sponge cake' },
    { title: 'Ameijoas à Bulhão Pato', description: 'Clams in garlic sauce' }
  ]

  return recipes
    .filter(recipe => recipe.title.toLowerCase().includes(searchTerm) || recipe.description.toLowerCase().includes(searchTerm))
    .slice(0, 3)
    .map(recipe => ({
      type: 'recipe',
      title: recipe.title,
      description: recipe.description
    }))
}

function getQuickCulturalSuggestions(searchTerm) {
  const cultural = [
    { title: 'Santos Populares', description: 'June festivals in Lisbon' },
    { title: 'Tu vs. Você', description: 'Portuguese formality and pronouns' },
    { title: 'Fado Music', description: 'The soul of Portugal' },
    { title: 'Portuguese Coffee Culture', description: 'Ordering coffee like a local' },
    { title: 'Regional Differences', description: 'Lisbon vs. Porto culture' }
  ]

  return cultural
    .filter(item => item.title.toLowerCase().includes(searchTerm) || item.description.toLowerCase().includes(searchTerm))
    .slice(0, 2)
    .map(item => ({
      type: 'cultural',
      title: item.title,
      description: item.description
    }))
}
