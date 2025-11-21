import { d as defineEventHandler, c as createError } from '../../../../index.mjs';
import { u as userOperations } from '../../../_/db.mjs';
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
    const userId = event.context.params.id;
    if (!userId) {
      throw createError({
        statusCode: 400,
        message: "User ID is required"
      });
    }
    const user = await userOperations.getUser(userId);
    if (!user) {
      throw createError({
        statusCode: 404,
        message: "User not found"
      });
    }
    delete user.passwordHash;
    return {
      success: true,
      user
    };
  } catch (error) {
    console.error("Get user error:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      message: "Failed to get user"
    });
  }
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
