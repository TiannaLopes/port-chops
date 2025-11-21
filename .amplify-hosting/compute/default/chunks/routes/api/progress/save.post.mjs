import { d as defineEventHandler, r as readBody, c as createError } from '../../../../index.mjs';
import { p as progressOperations, u as userOperations } from '../../../_/db.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '@aws-sdk/client-dynamodb';
import '@aws-sdk/lib-dynamodb';

const save_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { userId, lessonId, progress, score, completed } = body;
    if (!userId || !lessonId) {
      throw createError({
        statusCode: 400,
        message: "User ID and Lesson ID are required"
      });
    }
    const progressData = await progressOperations.saveProgress(userId, lessonId, {
      progress: progress || 0,
      score: score || 0,
      completed: completed || false
    });
    if (completed) {
      const user = await userOperations.getUser(userId);
      if (user) {
        const completedLessons = user.completedLessons || [];
        if (!completedLessons.includes(lessonId)) {
          completedLessons.push(lessonId);
          const pointsEarned = 50 + Math.floor((score || 0) / 2);
          const newTotalPoints = (user.totalPoints || 0) + pointsEarned;
          await userOperations.updateUser(userId, {
            completedLessons,
            totalPoints: newTotalPoints
          });
        }
      }
    }
    return {
      success: true,
      progress: progressData,
      message: completed ? "Lesson completed!" : "Progress saved"
    };
  } catch (error) {
    console.error("Save progress error:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      message: "Failed to save progress"
    });
  }
});

export { save_post as default };
//# sourceMappingURL=save.post.mjs.map
