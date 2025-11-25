import { userOperations, progressOperations, achievementOperations, streakOperations, ACHIEVEMENTS } from '../../utils/db'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const userId = query.userId

    if (!userId) {
      throw createError({
        statusCode: 400,
        message: 'User ID is required'
      })
    }

    // Get user data
    const user = await userOperations.getUser(userId)
    if (!user) {
      throw createError({
        statusCode: 404,
        message: 'User not found'
      })
    }

    // Get user progress
    const progressData = await progressOperations.getUserProgress(userId)
    
    // Get user achievements
    const earnedAchievements = await achievementOperations.getUserAchievements(userId)
    const earnedIds = earnedAchievements.map(a => a.achievementId)
    
    // Get daily goal progress
    const dailyGoal = await streakOperations.getDailyGoalProgress(userId)

    // Calculate completed lessons count from progress data
    const completedLessonsCount = progressData.filter(p => p.completed).length

    // Build stats object
    const stats = {
      completedLessons: completedLessonsCount,
      totalPoints: user.totalPoints || 0,
      currentStreak: user.currentStreak || 0,
      longestStreak: user.longestStreak || 0,
      vocabWords: user.vocabWords || 0,
      savedRecipes: user.savedRecipes || 0
    }

    // Build achievements list with earned status
    const achievements = Object.values(ACHIEVEMENTS).map(achievement => ({
      id: achievement.id,
      title: achievement.title,
      description: achievement.description,
      points: achievement.points,
      earned: earnedIds.includes(achievement.id),
      earnedAt: earnedAchievements.find(a => a.achievementId === achievement.id)?.earnedAt || null
    }))

    return {
      success: true,
      stats,
      achievements,
      dailyGoal,
      user: {
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        dailyGoalTarget: user.dailyGoal || 3
      }
    }
  } catch (error) {
    console.error('Get stats error:', error)
    
    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      message: 'Failed to get user stats'
    })
  }
})
