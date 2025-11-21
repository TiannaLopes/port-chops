import { d as defineEventHandler, c as createError } from '../../../../index.mjs';
import { p as progressOperations } from '../../../_/db.mjs';
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

const _userId__get = defineEventHandler(async (event) => {
  try {
    const userId = event.context.params.userId;
    if (!userId) {
      throw createError({
        statusCode: 400,
        message: "User ID is required"
      });
    }
    const progress = await progressOperations.getUserProgress(userId);
    return {
      success: true,
      progress: progress || [],
      total: progress.length
    };
  } catch (error) {
    console.error("Get progress error:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      message: "Failed to get user progress"
    });
  }
});

export { _userId__get as default };
//# sourceMappingURL=_userId_.get.mjs.map
