import { d as defineEventHandler, r as readBody, c as createError } from '../../../../index.mjs';
import bcrypt from 'bcryptjs';
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

const signup_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { name, email, password } = body;
    if (!name || !email || !password) {
      throw createError({
        statusCode: 400,
        message: "Name, email, and password are required"
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw createError({
        statusCode: 400,
        message: "Invalid email format"
      });
    }
    if (password.length < 8) {
      throw createError({
        statusCode: 400,
        message: "Password must be at least 8 characters long"
      });
    }
    const existingUser = await userOperations.getUserByEmail(email);
    if (existingUser) {
      throw createError({
        statusCode: 409,
        message: "User with this email already exists"
      });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await userOperations.createUser({
      name,
      email,
      passwordHash
    });
    delete user.passwordHash;
    return {
      success: true,
      user,
      message: "Account created successfully"
    };
  } catch (error) {
    console.error("Signup error:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      message: "Failed to create account"
    });
  }
});

export { signup_post as default };
//# sourceMappingURL=signup.post.mjs.map
