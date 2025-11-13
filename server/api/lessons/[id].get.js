import { lessonOperations } from '../../utils/db'

export default defineEventHandler(async (event) => {
  try {
    const lessonId = event.context.params.id

    if (!lessonId) {
      throw createError({
        statusCode: 400,
        message: 'Lesson ID is required'
      })
    }

    const lesson = await lessonOperations.getLesson(lessonId)

    if (!lesson) {
      throw createError({
        statusCode: 404,
        message: 'Lesson not found'
      })
    }

    return {
      success: true,
      lesson
    }
  } catch (error) {
    console.error('Get lesson error:', error)
    
    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      message: 'Failed to get lesson'
    })
  }
})
