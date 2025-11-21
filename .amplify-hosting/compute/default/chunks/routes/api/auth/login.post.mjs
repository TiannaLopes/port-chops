import { d as defineEventHandler, r as readBody, c as createError } from '../../../../index.mjs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
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

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";
const JWT_EXPIRES_IN = "7d";
const login_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { email, password } = body;
    if (!email || !password) {
      throw createError({
        statusCode: 400,
        message: "Email and password are required"
      });
    }
    const user = await userOperations.getUserByEmail(email);
    if (!user) {
      throw createError({
        statusCode: 401,
        message: "Invalid email or password"
      });
    }
    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      throw createError({
        statusCode: 401,
        message: "Invalid email or password"
      });
    }
    const token = jwt.sign(
      {
        userId: user.userId,
        email: user.email
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );
    delete user.passwordHash;
    await userOperations.updateUser(user.userId, {
      lastLoginAt: (/* @__PURE__ */ new Date()).toISOString()
    });
    return {
      success: true,
      user,
      token,
      message: "Login successful"
    };
  } catch (error) {
    console.error("Login error:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      message: "Failed to login"
    });
  }
});

export { login_post as default };
//# sourceMappingURL=login.post.mjs.map
