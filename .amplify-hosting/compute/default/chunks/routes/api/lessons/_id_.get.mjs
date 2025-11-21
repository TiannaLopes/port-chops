import { d as defineEventHandler, c as createError } from '../../../../index.mjs';
import { l as lessonOperations } from '../../../_/db.mjs';
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

const _id__get = defineEventHandler(async (event) => {
  try {
    const lessonId = event.context.params.id;
    if (!lessonId) {
      throw createError({
        statusCode: 400,
        message: "Lesson ID is required"
      });
    }
    const lesson = await lessonOperations.getLesson(lessonId);
    if (!lesson) {
      throw createError({
        statusCode: 404,
        message: "Lesson not found"
      });
    }
    return {
      success: true,
      lesson
    };
  } catch (error) {
    console.error("Get lesson error:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      message: "Failed to get lesson"
    });
  }
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
