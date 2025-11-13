import bcrypt from 'bcryptjs'
import { userOperations } from '../../utils/db'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { name, email, password } = body

    // Validate input
    if (!name || !email || !password) {
      throw createError({
        statusCode: 400,
        message: 'Name, email, and password are required'
      })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      throw createError({
        statusCode: 400,
        message: 'Invalid email format'
      })
    }

    // Validate password strength
    if (password.length < 8) {
      throw createError({
        statusCode: 400,
        message: 'Password must be at least 8 characters long'
      })
    }

    // Check if user already exists
    const existingUser = await userOperations.getUserByEmail(email)
    if (existingUser) {
      throw createError({
        statusCode: 409,
        message: 'User with this email already exists'
      })
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10)

    // Create user
    const user = await userOperations.createUser({
      name,
      email,
      passwordHash
    })

    // Remove password hash from response
    delete user.passwordHash

    return {
      success: true,
      user,
      message: 'Account created successfully'
    }
  } catch (error) {
    console.error('Signup error:', error)
    
    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      message: 'Failed to create account'
    })
  }
})
