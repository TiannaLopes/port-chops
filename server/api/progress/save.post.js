import { progressOperations, userOperations, activityOperations, streakOperations, achievementOperations } from '../../utils/db'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { userId, lessonId, progress, score, completed, lessonTitle } = body

    // Validate input
    if (!userId || !lessonId) {
      throw createError({
        statusCode: 400,
        message: 'User ID and Lesson ID are required'
      })
    }

    // Sanitize lessonTitle - ensure it's a string and limit length
    const sanitizedLessonTitle = typeof lessonTitle === 'string' 
      ? lessonTitle.trim().substring(0, 200) 
      : ''

    // Save progress
    const progressData = await progressOperations.saveProgress(userId, lessonId, {
      progress: progress || 0,
      score: score || 0,
      completed: completed || false
    })

    let pointsEarned = 0
    let newAchievements = []

    // If lesson completed, update user stats and log activity
    if (completed) {
      const user = await userOperations.getUser(userId)
      
      if (user) {
        const completedLessons = user.completedLessons || []
        
        // Add lesson to completed list if not already there
        if (!completedLessons.includes(lessonId)) {
          completedLessons.push(lessonId)
          
          // Calculate points (base 50 points + bonus for score)
          pointsEarned = 50 + Math.floor((score || 0) / 2)
          const newTotalPoints = (user.totalPoints || 0) + pointsEarned
          
          // Update user stats
          await userOperations.updateUser(userId, {
            completedLessons,
            totalPoints: newTotalPoints
          })
          
          // Update streak
          await streakOperations.updateStreak(userId)
          
          // Log activity
          await activityOperations.logActivity(userId, 'lesson_complete', {
            title: `Completed: ${sanitizedLessonTitle || lessonId}`,
            description: `Scored ${score || 100}% on this lesson`,
            points: pointsEarned,
            metadata: { lessonId, score }
          })
          
          // Check for new achievements
          const updatedUser = await userOperations.getUser(userId)
          const userStats = {
            completedLessons: completedLessons.length,
            totalPoints: newTotalPoints,
            currentStreak: updatedUser.currentStreak || 0,
            vocabWords: updatedUser.vocabWords || 0,
            savedRecipes: updatedUser.savedRecipes || 0
          }
          
          newAchievements = await achievementOperations.checkAndGrantAchievements(userId, userStats)
          
          // Log achievement activities
          for (const achievement of newAchievements) {
            await activityOperations.logActivity(userId, 'achievement_earned', {
              title: `Achievement Unlocked: ${achievement.title}`,
              description: achievement.description,
              points: achievement.points,
              metadata: { achievementId: achievement.id }
            })
          }
        }
      }
    }

    return {
      success: true,
      progress: progressData,
      pointsEarned,
      newAchievements,
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
