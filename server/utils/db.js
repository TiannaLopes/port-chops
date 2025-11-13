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
  USER_PROGRESS: process.env.DYNAMODB_USER_PROGRESS_TABLE || 'port-chops-user-progress'
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

export { TABLES }
export default db
