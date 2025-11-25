import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, GetCommand, PutCommand, UpdateCommand, QueryCommand, ScanCommand } from '@aws-sdk/lib-dynamodb'

// Initialize DynamoDB client
const client = new DynamoDBClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
})

// Create document client for easier interaction
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: {
    removeUndefinedValues: true,
    convertEmptyValues: false
  }
})

// Table names
const TABLES = {
  USERS: process.env.DYNAMODB_USERS_TABLE || 'port-chops-users',
  LESSONS: process.env.DYNAMODB_LESSONS_TABLE || 'port-chops-lessons',
  USER_PROGRESS: process.env.DYNAMODB_USER_PROGRESS_TABLE || 'port-chops-user-progress',
  USER_ACTIVITY: process.env.DYNAMODB_USER_ACTIVITY_TABLE || 'port-chops-user-activity',
  USER_ACHIEVEMENTS: process.env.DYNAMODB_USER_ACHIEVEMENTS_TABLE || 'port-chops-user-achievements'
}

// Achievement definitions
export const ACHIEVEMENTS = {
  FIRST_STEP: { id: 'first_step', title: 'First Step', description: 'Complete your first lesson', points: 10, milestone: 1, type: 'lessons' },
  TEN_LESSONS: { id: 'ten_lessons', title: '10 Lessons', description: 'Complete 10 lessons', points: 50, milestone: 10, type: 'lessons' },
  FIFTY_LESSONS: { id: 'fifty_lessons', title: '50 Lessons', description: 'Complete 50 lessons', points: 200, milestone: 50, type: 'lessons' },
  WEEK_STREAK: { id: 'week_streak', title: 'Week Streak', description: 'Maintain a 7-day streak', points: 100, milestone: 7, type: 'streak' },
  MONTH_STREAK: { id: 'month_streak', title: 'Month Streak', description: 'Maintain a 30-day streak', points: 500, milestone: 30, type: 'streak' },
  HUNDRED_WORDS: { id: 'hundred_words', title: '100 Words', description: 'Learn 100 vocabulary words', points: 150, milestone: 100, type: 'vocabulary' },
  FIVE_HUNDRED_WORDS: { id: 'five_hundred_words', title: '500 Words', description: 'Learn 500 vocabulary words', points: 500, milestone: 500, type: 'vocabulary' },
  RECIPE_PRO: { id: 'recipe_pro', title: 'Recipe Pro', description: 'Save 10 recipes to favorites', points: 75, milestone: 10, type: 'recipes' },
  POINTS_500: { id: 'points_500', title: 'Point Collector', description: 'Earn 500 points', points: 50, milestone: 500, type: 'points' },
  POINTS_1000: { id: 'points_1000', title: 'Point Master', description: 'Earn 1000 points', points: 100, milestone: 1000, type: 'points' }
}

// Database operations
export const db = {
  // Get a single item
  async get(tableName, key) {
    try {
      const command = new GetCommand({
        TableName: tableName,
        Key: key
      })
      const response = await docClient.send(command)
      return response.Item
    } catch (error) {
      console.error('DynamoDB Get Error:', error)
      throw error
    }
  },

  // Put/Create an item
  async put(tableName, item) {
    try {
      const command = new PutCommand({
        TableName: tableName,
        Item: {
          ...item,
          createdAt: item.createdAt || new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      })
      await docClient.send(command)
      return item
    } catch (error) {
      console.error('DynamoDB Put Error:', error)
      throw error
    }
  },

  // Update an item
  async update(tableName, key, updates) {
    try {
      const updateExpressions = []
      const expressionAttributeNames = {}
      const expressionAttributeValues = {}

      Object.keys(updates).forEach((field, index) => {
        const attributeName = `#field${index}`
        const attributeValue = `:value${index}`
        updateExpressions.push(`${attributeName} = ${attributeValue}`)
        expressionAttributeNames[attributeName] = field
        expressionAttributeValues[attributeValue] = updates[field]
      })

      // Always update the updatedAt timestamp
      updateExpressions.push('#updatedAt = :updatedAt')
      expressionAttributeNames['#updatedAt'] = 'updatedAt'
      expressionAttributeValues[':updatedAt'] = new Date().toISOString()

      const command = new UpdateCommand({
        TableName: tableName,
        Key: key,
        UpdateExpression: `SET ${updateExpressions.join(', ')}`,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: 'ALL_NEW'
      })

      const response = await docClient.send(command)
      return response.Attributes
    } catch (error) {
      console.error('DynamoDB Update Error:', error)
      throw error
    }
  },

  // Query items (with optional filter)
  async query(tableName, keyConditionExpression, expressionAttributeValues, expressionAttributeNames = {}) {
    try {
      const command = new QueryCommand({
        TableName: tableName,
        KeyConditionExpression: keyConditionExpression,
        ExpressionAttributeValues: expressionAttributeValues,
        ...(Object.keys(expressionAttributeNames).length > 0 && { ExpressionAttributeNames: expressionAttributeNames })
      })
      const response = await docClient.send(command)
      return response.Items || []
    } catch (error) {
      console.error('DynamoDB Query Error:', error)
      throw error
    }
  },

  // Scan all items (use sparingly - expensive operation)
  async scan(tableName, filterExpression = null, expressionAttributeValues = {}) {
    try {
      const command = new ScanCommand({
        TableName: tableName,
        ...(filterExpression && {
          FilterExpression: filterExpression,
          ExpressionAttributeValues: expressionAttributeValues
        })
      })
      const response = await docClient.send(command)
      return response.Items || []
    } catch (error) {
      console.error('DynamoDB Scan Error:', error)
      throw error
    }
  }
}

// Helper functions for specific operations
export const userOperations = {
  async getUser(userId) {
    return await db.get(TABLES.USERS, { userId })
  },

  async getUserByEmail(email) {
    const users = await db.scan(TABLES.USERS, 'email = :email', { ':email': email })
    return users[0] || null
  },

  async createUser(userData) {
    const user = {
      userId: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      email: userData.email,
      name: userData.name,
      passwordHash: userData.passwordHash,
      totalPoints: 0,
      currentStreak: 0,
      completedLessons: [],
      achievements: [],
      createdAt: new Date().toISOString()
    }
    return await db.put(TABLES.USERS, user)
  },

  async updateUser(userId, updates) {
    return await db.update(TABLES.USERS, { userId }, updates)
  }
}

export const lessonOperations = {
  async getLesson(lessonId) {
    return await db.get(TABLES.LESSONS, { lessonId })
  },

  async getAllLessons() {
    return await db.scan(TABLES.LESSONS)
  },

  async getLessonsByCategory(category) {
    return await db.scan(TABLES.LESSONS, 'category = :category', { ':category': category })
  }
}

export const progressOperations = {
  async getUserProgress(userId) {
    return await db.query(
      TABLES.USER_PROGRESS,
      'userId = :userId',
      { ':userId': userId }
    )
  },

  async saveProgress(userId, lessonId, progressData) {
    const progressItem = {
      userId,
      lessonId,
      progressId: `${userId}_${lessonId}`,
      completed: progressData.completed || false,
      progress: progressData.progress || 0,
      score: progressData.score || 0,
      attempts: progressData.attempts || 1,
      lastAccessedAt: new Date().toISOString()
    }
    return await db.put(TABLES.USER_PROGRESS, progressItem)
  },

  async updateProgress(userId, lessonId, updates) {
    return await db.update(
      TABLES.USER_PROGRESS,
      { userId, lessonId },
      {
        ...updates,
        lastAccessedAt: new Date().toISOString()
      }
    )
  },

  async markLessonComplete(userId, lessonId, score) {
    const updates = {
      completed: true,
      completedAt: new Date().toISOString(),
      score: score || 100,
      progress: 100
    }
    return await db.update(TABLES.USER_PROGRESS, { userId, lessonId }, updates)
  }
}

// Activity operations for tracking user actions
export const activityOperations = {
  async logActivity(userId, activityType, data) {
    const activityItem = {
      activityId: `${userId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      type: activityType,
      title: data.title || '',
      description: data.description || '',
      points: data.points || 0,
      metadata: data.metadata || {},
      createdAt: new Date().toISOString()
    }
    return await db.put(TABLES.USER_ACTIVITY, activityItem)
  },

  async getRecentActivity(userId, limit = 10) {
    try {
      const activities = await db.query(
        TABLES.USER_ACTIVITY,
        'userId = :userId',
        { ':userId': userId }
      )
      // Sort by createdAt descending and limit results
      return activities
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, limit)
    } catch {
      return []
    }
  },

  async getActivityByDate(userId, startDate, endDate) {
    try {
      const activities = await db.query(
        TABLES.USER_ACTIVITY,
        'userId = :userId',
        { ':userId': userId }
      )
      return activities.filter(activity => {
        const activityDate = new Date(activity.createdAt)
        return activityDate >= new Date(startDate) && activityDate <= new Date(endDate)
      })
    } catch {
      return []
    }
  }
}

// Achievement operations
export const achievementOperations = {
  async getUserAchievements(userId) {
    try {
      const achievements = await db.query(
        TABLES.USER_ACHIEVEMENTS,
        'userId = :userId',
        { ':userId': userId }
      )
      return achievements || []
    } catch {
      return []
    }
  },

  async grantAchievement(userId, achievementId, achievementData) {
    const achievement = {
      achievementRecordId: `${userId}_${achievementId}`,
      userId,
      achievementId,
      title: achievementData.title,
      description: achievementData.description,
      points: achievementData.points || 0,
      earnedAt: new Date().toISOString()
    }
    return await db.put(TABLES.USER_ACHIEVEMENTS, achievement)
  },

  async hasAchievement(userId, achievementId) {
    try {
      const achievements = await this.getUserAchievements(userId)
      return achievements.some(a => a.achievementId === achievementId)
    } catch {
      return false
    }
  },

  async checkAndGrantAchievements(userId, userStats) {
    const grantedAchievements = []
    
    for (const [key, achievement] of Object.entries(ACHIEVEMENTS)) {
      const hasIt = await this.hasAchievement(userId, achievement.id)
      if (hasIt) continue
      
      let shouldGrant = false
      
      switch (achievement.type) {
        case 'lessons':
          shouldGrant = (userStats.completedLessons || 0) >= achievement.milestone
          break
        case 'streak':
          shouldGrant = (userStats.currentStreak || 0) >= achievement.milestone
          break
        case 'vocabulary':
          shouldGrant = (userStats.vocabWords || 0) >= achievement.milestone
          break
        case 'recipes':
          shouldGrant = (userStats.savedRecipes || 0) >= achievement.milestone
          break
        case 'points':
          shouldGrant = (userStats.totalPoints || 0) >= achievement.milestone
          break
      }
      
      if (shouldGrant) {
        await this.grantAchievement(userId, achievement.id, achievement)
        grantedAchievements.push(achievement)
      }
    }
    
    return grantedAchievements
  }
}

// Streak operations
export const streakOperations = {
  async updateStreak(userId) {
    const user = await userOperations.getUser(userId)
    if (!user) return null
    
    const now = new Date()
    const today = now.toISOString().split('T')[0]
    const lastActivityDate = user.lastActivityDate || null
    
    let newStreak = user.currentStreak || 0
    let longestStreak = user.longestStreak || 0
    
    if (lastActivityDate) {
      const lastDate = new Date(lastActivityDate)
      const yesterday = new Date(now)
      yesterday.setDate(yesterday.getDate() - 1)
      const yesterdayStr = yesterday.toISOString().split('T')[0]
      
      if (lastActivityDate === today) {
        // Already logged activity today, no streak update needed
        return { currentStreak: newStreak, longestStreak }
      } else if (lastActivityDate === yesterdayStr) {
        // Consecutive day - increment streak
        newStreak += 1
      } else {
        // Streak broken - reset to 1
        newStreak = 1
      }
    } else {
      // First activity ever
      newStreak = 1
    }
    
    // Update longest streak if current is higher
    if (newStreak > longestStreak) {
      longestStreak = newStreak
    }
    
    // Update user with new streak data
    await userOperations.updateUser(userId, {
      currentStreak: newStreak,
      longestStreak,
      lastActivityDate: today
    })
    
    return { currentStreak: newStreak, longestStreak }
  },

  async getDailyGoalProgress(userId) {
    const user = await userOperations.getUser(userId)
    if (!user) return { target: 3, completed: 0, progress: 0 }
    
    const target = user.dailyGoal || 3
    const today = new Date().toISOString().split('T')[0]
    
    // Count lessons completed today
    try {
      const activities = await activityOperations.getActivityByDate(
        userId,
        `${today}T00:00:00.000Z`,
        `${today}T23:59:59.999Z`
      )
      const lessonsToday = activities.filter(a => a.type === 'lesson_complete').length
      const progress = Math.min(100, Math.round((lessonsToday / target) * 100))
      
      return {
        target,
        completed: lessonsToday,
        progress
      }
    } catch {
      return { target, completed: 0, progress: 0 }
    }
  },

  async setDailyGoal(userId, goal) {
    return await userOperations.updateUser(userId, { dailyGoal: goal })
  }
}

export { TABLES }
export default db
