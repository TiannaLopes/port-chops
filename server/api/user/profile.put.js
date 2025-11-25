import { userOperations } from '../../utils/db'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { userId, name, dailyGoal } = body

    if (!userId) {
      throw createError({
        statusCode: 400,
        message: 'User ID is required'
      })
    }

    // Build updates object
    const updates = {}
    
    if (name !== undefined && name.trim()) {
      updates.name = name.trim()
    }
    
    if (dailyGoal !== undefined) {
      const goal = parseInt(dailyGoal)
      if (goal >= 1 && goal <= 10) {
        updates.dailyGoal = goal
      }
    }

    if (Object.keys(updates).length === 0) {
      throw createError({
        statusCode: 400,
        message: 'No valid fields to update'
      })
    }

    const updatedUser = await userOperations.updateUser(userId, updates)

    // Remove sensitive data
    if (updatedUser) {
      delete updatedUser.passwordHash
    }

    return {
      success: true,
      user: updatedUser,
      message: 'Profile updated successfully'
    }
  } catch (error) {
    console.error('Update profile error:', error)
    
    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      message: 'Failed to update profile'
    })
  }
})
