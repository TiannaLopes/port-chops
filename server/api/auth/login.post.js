import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { userOperations } from '../../utils/db'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'
const JWT_EXPIRES_IN = '7d'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { email, password } = body

    // Validate input
    if (!email || !password) {
      throw createError({
        statusCode: 400,
        message: 'Email and password are required'
      })
    }

    // Find user by email
    const user = await userOperations.getUserByEmail(email)
    if (!user) {
      throw createError({
        statusCode: 401,
        message: 'Invalid email or password'
      })
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.passwordHash)
    if (!isValidPassword) {
      throw createError({
        statusCode: 401,
        message: 'Invalid email or password'
      })
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user.userId,
        email: user.email
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    )

    // Remove password hash from response
    delete user.passwordHash

    // Update last login
    await userOperations.updateUser(user.userId, {
      lastLoginAt: new Date().toISOString()
    })

    return {
      success: true,
      user,
      token,
      message: 'Login successful'
    }
  } catch (error) {
    console.error('Login error:', error)
    
    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      message: 'Failed to login'
    })
  }
})
