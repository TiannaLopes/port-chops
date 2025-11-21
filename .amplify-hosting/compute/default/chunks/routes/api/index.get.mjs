import { d as defineEventHandler, g as getQuery, c as createError } from '../../../index.mjs';
import { l as lessonOperations } from '../../_/db.mjs';
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

const index_get = defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const { category } = query;
    let lessons;
    if (category) {
      lessons = await lessonOperations.getLessonsByCategory(category);
    } else {
      lessons = await lessonOperations.getAllLessons();
    }
    return {
      success: true,
      lessons: lessons || [],
      total: lessons.length
    };
  } catch (error) {
    console.error("Get lessons error:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      message: "Failed to get lessons"
    });
  }
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
