# AWS DynamoDB + API Setup Guide

## Prerequisites
- AWS Account
- AWS CLI installed and configured
- Node.js 20+ installed

## Step 1: Install Dependencies

```bash
yarn add @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb bcryptjs jsonwebtoken
yarn add -D @types/bcryptjs @types/jsonwebtoken
```

## Step 2: Create DynamoDB Tables

### Option A: Using AWS Console

1. Go to AWS DynamoDB Console
2. Create 3 tables with the following configurations:

**Table 1: port-chops-users**
- Partition key: `userId` (String)
- Attributes: email, name, passwordHash, totalPoints, currentStreak, completedLessons, achievements, createdAt, updatedAt, lastLoginAt

**Table 2: port-chops-lessons**
- Partition key: `lessonId` (String)
- Attributes: title, description, category, level, content, exercises, createdAt, updatedAt

**Table 3: port-chops-user-progress**
- Partition key: `userId` (String)
- Sort key: `lessonId` (String)
- Attributes: progressId, completed, progress, score, attempts, lastAccessedAt, completedAt, createdAt, updatedAt

### Option B: Using AWS CLI

```bash
# Create Users table
aws dynamodb create-table \
    --table-name port-chops-users \
    --attribute-definitions AttributeName=userId,AttributeType=S \
    --key-schema AttributeName=userId,KeyType=HASH \
    --billing-mode PAY_PER_REQUEST \
    --region us-east-1

# Create Lessons table
aws dynamodb create-table \
    --table-name port-chops-lessons \
    --attribute-definitions AttributeName=lessonId,AttributeType=S \
    --key-schema AttributeName=lessonId,KeyType=HASH \
    --billing-mode PAY_PER_REQUEST \
    --region us-east-1

# Create User Progress table
aws dynamodb create-table \
    --table-name port-chops-user-progress \
    --attribute-definitions \
        AttributeName=userId,AttributeType=S \
        AttributeName=lessonId,AttributeType=S \
    --key-schema \
        AttributeName=userId,KeyType=HASH \
        AttributeName=lessonId,KeyType=RANGE \
    --billing-mode PAY_PER_REQUEST \
    --region us-east-1
```

## Step 3: Configure Environment Variables

Copy `.env.example` to `.env` and fill in your AWS credentials:

```bash
cp .env.example .env
```

Edit `.env`:
```
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
DYNAMODB_USERS_TABLE=port-chops-users
DYNAMODB_LESSONS_TABLE=port-chops-lessons
DYNAMODB_USER_PROGRESS_TABLE=port-chops-user-progress
JWT_SECRET=your_super_secret_jwt_key_min_32_characters
```

## Step 4: API Endpoints

### Authentication
- **POST** `/api/auth/signup` - Create new user account
- **POST** `/api/auth/login` - Login user

### User
- **GET** `/api/user/:id` - Get user by ID

### Lessons
- **GET** `/api/lessons` - Get all lessons (optional `?category=basics` query)
- **GET** `/api/lessons/:id` - Get specific lesson

### Progress
- **POST** `/api/progress/save` - Save lesson progress
- **GET** `/api/progress/:userId` - Get user's progress

## Step 5: Usage Examples

### Signup
```javascript
const response = await $fetch('/api/auth/signup', {
  method: 'POST',
  body: {
    name: 'João Silva',
    email: 'joao@example.com',
    password: 'securePassword123'
  }
})
// Returns: { success: true, user: {...}, message: '...' }
```

### Login
```javascript
const response = await $fetch('/api/auth/login', {
  method: 'POST',
  body: {
    email: 'joao@example.com',
    password: 'securePassword123'
  }
})
// Returns: { success: true, user: {...}, token: 'jwt_token', message: '...' }
```

### Save Progress
```javascript
const response = await $fetch('/api/progress/save', {
  method: 'POST',
  body: {
    userId: 'user_123',
    lessonId: 'lesson_basics_1',
    progress: 75,
    score: 85,
    completed: false
  }
})
```

### Get User Progress
```javascript
const response = await $fetch(`/api/progress/${userId}`)
// Returns: { success: true, progress: [...], total: 5 }
```

## Step 6: Security Notes

1. **Never commit `.env` to git** - Add it to `.gitignore`
2. **Use IAM roles** in production instead of access keys
3. **Enable HTTPS** for all API calls
4. **Use strong JWT secrets** - minimum 32 characters
5. **Add rate limiting** to prevent abuse
6. **Validate all inputs** on the server side
7. **Use AWS Cognito** for production authentication (more secure)

## Step 7: Cost Estimation

**DynamoDB Free Tier (12 months):**
- 25 GB storage
- 25 read capacity units
- 25 write capacity units

**PAY_PER_REQUEST Pricing (after free tier):**
- $1.25 per million write requests
- $0.25 per million read requests

**Expected costs for small app (<10k users):**
- **Monthly cost: $0-5** (within free tier for most usage)

## Step 8: Testing

Test the API endpoints:

```bash
# Signup
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## Troubleshooting

1. **"Unable to locate credentials"** - Check AWS credentials in `.env`
2. **"Table not found"** - Verify tables are created in correct region
3. **"ValidationException"** - Check table key schemas match code
4. **CORS errors** - Add CORS headers in `nuxt.config.ts`

## Next Steps

1. Seed lessons data into DynamoDB
2. Integrate API calls into Vue components
3. Add JWT token storage (localStorage/cookies)
4. Implement protected routes middleware
5. Add error handling and loading states
6. Deploy to AWS Amplify
