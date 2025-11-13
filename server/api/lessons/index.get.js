import { lessonOperations } from '../../utils/db'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const { category } = query

    let lessons

    if (category) {
      lessons = await lessonOperations.getLessonsByCategory(category)
    } else {
      lessons = await lessonOperations.getAllLessons()
    }

    return {
      success: true,
      lessons: lessons || [],
      total: lessons.length
    }
  } catch (error) {
    console.error('Get lessons error:', error)
    
    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      message: 'Failed to get lessons'
    })
  }
})
