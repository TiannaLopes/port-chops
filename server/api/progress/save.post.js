import { progressOperations, userOperations } from '../../utils/db'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { userId, lessonId, progress, score, completed } = body

    // Validate input
    if (!userId || !lessonId) {
      throw createError({
        statusCode: 400,
        message: 'User ID and Lesson ID are required'
      })
    }

    // Save progress
    const progressData = await progressOperations.saveProgress(userId, lessonId, {
      progress: progress || 0,
      score: score || 0,
      completed: completed || false
    })

    // If lesson completed, update user stats
    if (completed) {
      const user = await userOperations.getUser(userId)
      
      if (user) {
        const completedLessons = user.completedLessons || []
        
        // Add lesson to completed list if not already there
        if (!completedLessons.includes(lessonId)) {
          completedLessons.push(lessonId)
          
          // Calculate points (base 50 points + bonus for score)
          const pointsEarned = 50 + Math.floor((score || 0) / 2)
          const newTotalPoints = (user.totalPoints || 0) + pointsEarned
          
          // Update user
          await userOperations.updateUser(userId, {
            completedLessons,
            totalPoints: newTotalPoints
          })
        }
      }
    }

    return {
      success: true,
      progress: progressData,
      message: completed ? 'Lesson completed!' : 'Progress saved'
    }
  } catch (error) {
    console.error('Save progress error:', error)
    
    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      message: 'Failed to save progress'
    })
  }
})
