import { activityOperations } from '../../utils/db'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const userId = query.userId
    const limit = parseInt(query.limit) || 10

    if (!userId) {
      throw createError({
        statusCode: 400,
        message: 'User ID is required'
      })
    }

    const activities = await activityOperations.getRecentActivity(userId, limit)

    // Format activities for display
    const formattedActivities = activities.map(activity => {
      const createdAt = new Date(activity.createdAt)
      const now = new Date()
      const diffMs = now - createdAt
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
      
      let timeAgo
      if (diffHours < 1) {
        const diffMinutes = Math.floor(diffMs / (1000 * 60))
        timeAgo = diffMinutes <= 1 ? 'Just now' : `${diffMinutes} minutes ago`
      } else if (diffHours < 24) {
        timeAgo = diffHours === 1 ? '1 hour ago' : `${diffHours} hours ago`
      } else if (diffDays === 1) {
        timeAgo = '1 day ago'
      } else {
        timeAgo = `${diffDays} days ago`
      }

      return {
        id: activity.activityId,
        title: activity.title,
        description: activity.description,
        points: activity.points,
        type: activity.type,
        time: timeAgo,
        createdAt: activity.createdAt
      }
    })

    return {
      success: true,
      activities: formattedActivities,
      total: formattedActivities.length
    }
  } catch (error) {
    console.error('Get activity error:', error)
    
    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      message: 'Failed to get activity history'
    })
  }
})
