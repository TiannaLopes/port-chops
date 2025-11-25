import { userOperations, progressOperations, achievementOperations, activityOperations } from '../../utils/db'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const userId = query.userId
    const format = query.format || 'json'

    if (!userId) {
      throw createError({
        statusCode: 400,
        message: 'User ID is required'
      })
    }

    // Get all user data
    const user = await userOperations.getUser(userId)
    if (!user) {
      throw createError({
        statusCode: 404,
        message: 'User not found'
      })
    }

    // Get progress data
    const progressData = await progressOperations.getUserProgress(userId)
    
    // Get achievements
    const achievements = await achievementOperations.getUserAchievements(userId)
    
    // Get recent activity (last 100)
    const activities = await activityOperations.getRecentActivity(userId, 100)

    // Build export data
    const exportData = {
      exportedAt: new Date().toISOString(),
      user: {
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        totalPoints: user.totalPoints || 0,
        currentStreak: user.currentStreak || 0,
        longestStreak: user.longestStreak || 0,
        vocabWords: user.vocabWords || 0
      },
      progress: {
        totalLessonsCompleted: progressData.filter(p => p.completed).length,
        lessons: progressData.map(p => ({
          lessonId: p.lessonId,
          completed: p.completed,
          progress: p.progress,
          score: p.score,
          completedAt: p.completedAt || null
        }))
      },
      achievements: achievements.map(a => ({
        id: a.achievementId,
        title: a.title,
        earnedAt: a.earnedAt
      })),
      recentActivity: activities.map(a => ({
        type: a.type,
        title: a.title,
        points: a.points,
        date: a.createdAt
      }))
    }

    if (format === 'csv') {
      // Convert to CSV format for lessons
      const csvHeaders = 'Lesson ID,Completed,Progress %,Score,Completed At\n'
      const csvRows = exportData.progress.lessons.map(lesson => 
        `${lesson.lessonId},${lesson.completed},${lesson.progress},${lesson.score},${lesson.completedAt || ''}`
      ).join('\n')
      
      setHeader(event, 'Content-Type', 'text/csv')
      setHeader(event, 'Content-Disposition', `attachment; filename="progress-export-${userId}.csv"`)
      
      return csvHeaders + csvRows
    }

    // Default JSON response
    return {
      success: true,
      data: exportData
    }
  } catch (error) {
    console.error('Export progress error:', error)
    
    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      message: 'Failed to export progress data'
    })
  }
})
