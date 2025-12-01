import lessonsIndex from '~/data/lessons/index.json'
import fs from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
  try {
    const slug = event.context.params.id

    if (!slug) {
      throw createError({
        statusCode: 400,
        message: 'Lesson slug is required'
      })
    }

    // Find lesson metadata by slug
    const lessonMeta = lessonsIndex.find(l => l.slug === slug)
    
    if (!lessonMeta) {
      throw createError({
        statusCode: 404,
        message: 'Lesson not found'
      })
    }

    // Extract the lesson file name from lessonId
    // e.g., "basics-greetings-01" -> "basics-greetings"
    const lessonFileName = lessonMeta.lessonId.replace(/^[^-]+-/, '')
    
    // Read the lesson JSON file
    const lessonPath = path.join(process.cwd(), 'data', 'lessons', `${lessonFileName}.json`)
    const lessonData = JSON.parse(fs.readFileSync(lessonPath, 'utf-8'))

    return {
      success: true,
      lesson: lessonData
    }
  } catch (error) {
    console.error('Get lesson error:', error)
    
    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      message: 'Failed to get lesson'
    })
  }
})
