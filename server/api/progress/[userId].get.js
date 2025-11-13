import { progressOperations } from '../../utils/db'

export default defineEventHandler(async (event) => {
  try {
    const userId = event.context.params.userId

    if (!userId) {
      throw createError({
        statusCode: 400,
        message: 'User ID is required'
      })
    }

    const progress = await progressOperations.getUserProgress(userId)

    return {
      success: true,
      progress: progress || [],
      total: progress.length
    }
  } catch (error) {
    console.error('Get progress error:', error)
    
    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      message: 'Failed to get user progress'
    })
  }
})
