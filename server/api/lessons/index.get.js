import lessonsIndex from '~/data/lessons/index.json'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const { category, difficulty } = query

    let filteredLessons = lessonsIndex

    // Filter by category if provided
    if (category) {
      filteredLessons = filteredLessons.filter(
        lesson => lesson.category.toLowerCase() === category.toLowerCase()
      )
    }

    // Filter by difficulty if provided
    if (difficulty) {
      filteredLessons = filteredLessons.filter(
        lesson => lesson.difficulty.toLowerCase() === difficulty.toLowerCase()
      )
    }

    // Sort by order
    filteredLessons.sort((a, b) => a.order - b.order)

    return {
      success: true,
      lessons: filteredLessons,
      total: filteredLessons.length
    }
  } catch (error) {
    console.error('Get lessons error:', error)
    
    throw createError({
      statusCode: 500,
      message: 'Failed to get lessons'
    })
  }
})
