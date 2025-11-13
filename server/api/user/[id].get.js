import { userOperations } from '../../utils/db'

export default defineEventHandler(async (event) => {
  try {
    const userId = event.context.params.id

    if (!userId) {
      throw createError({
        statusCode: 400,
        message: 'User ID is required'
      })
    }

    const user = await userOperations.getUser(userId)

    if (!user) {
      throw createError({
        statusCode: 404,
        message: 'User not found'
      })
    }

    // Remove sensitive data
    delete user.passwordHash

    return {
      success: true,
      user
    }
  } catch (error) {
    console.error('Get user error:', error)
    
    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      message: 'Failed to get user'
    })
  }
})
