# AWS Authentication & Database Setup

## Option 1: AWS Amplify Auth + DynamoDB (Recommended - Cheapest)

### Cost Breakdown
- **Amazon Cognito**: FREE for up to 50,000 MAUs (Monthly Active Users)
- **DynamoDB**: FREE tier includes 25 GB storage, 25 read/write capacity units
- **Total Cost**: $0 for small apps (< 50k users)

### Setup Instructions

#### 1. Install Amplify Libraries
```bash
npm install aws-amplify @aws-amplify/ui-vue
```

#### 2. Initialize Amplify
```bash
# Install Amplify CLI if not already installed
npm install -g @aws-amplify/cli

# Configure AWS credentials
amplify configure

# Initialize Amplify in your project
amplify init
```

When prompted:
- Project name: `port-chops`
- Environment: `dev`
- Default editor: VS Code
- Framework: Vue.js
- Source directory: `.`
- Distribution directory: `.output/public`
- Build command: `npm run build`
- Start command: `npm run dev`

#### 3. Add Authentication
```bash
amplify add auth
```

Select:
- Default configuration with Social Provider (optional)
- Email for sign-in
- No, I am done

#### 4. Add Database (DynamoDB)
```bash
amplify add api
```

Select:
- GraphQL
- Authorization mode: Amazon Cognito User Pool
- Do you want to configure advanced settings? No
- Do you have an annotated GraphQL schema? No
- Choose a schema template: Single object with fields

Edit the generated schema at `amplify/backend/api/*/schema.graphql`:

```graphql
type User @model @auth(rules: [{allow: owner}]) {
  id: ID!
  email: String!
  name: String
  progress: AWSJSON
  completedLessons: [String]
  currentLevel: String
  points: Int
  createdAt: AWSDateTime
  updatedAt: AWSDateTime
}

type Lesson @model @auth(rules: [{allow: public, operations: [read]}, {allow: owner, operations: [create, update]}]) {
  id: ID!
  title: String!
  category: String!
  level: String!
  content: AWSJSON
  order: Int
}

type UserProgress @model @auth(rules: [{allow: owner}]) {
  id: ID!
  userId: String!
  lessonId: String!
  completed: Boolean!
  score: Int
  completedAt: AWSDateTime
}
```

#### 5. Deploy to AWS
```bash
amplify push
```

This will:
- Create Cognito User Pool for authentication
- Create DynamoDB tables for data storage
- Set up AppSync GraphQL API
- Generate client code

#### 6. Configure in Nuxt

Create `plugins/amplify.client.ts`:
```typescript
import { Amplify } from 'aws-amplify'
import awsconfig from '../amplifyconfiguration.json'

export default defineNuxtPlugin(() => {
  Amplify.configure(awsconfig)
})
```

## Option 2: Supabase (Alternative - Also Free Tier)

If you prefer something simpler:

### Cost: FREE for up to 500 MB database, 50k MAUs

```bash
npm install @supabase/supabase-js
```

Create account at supabase.com and get your credentials.

## Option 3: Firebase (Google - Also Free)

### Cost: FREE Spark plan includes auth + 1GB storage

```bash
npm install firebase
```

## Recommendation

**Use AWS Amplify + Cognito + DynamoDB** because:
1. ✅ Native AWS integration with your Amplify hosting
2. ✅ Completely free for small-medium apps
3. ✅ Automatic scaling
4. ✅ Built-in security
5. ✅ GraphQL API auto-generated
6. ✅ No server management

## Next Steps

1. Install Amplify CLI and libraries
2. Run `amplify init` and `amplify add auth`
3. Run `amplify add api` for database
4. Run `amplify push` to deploy
5. I'll create the login/signup components and learning dashboard

Let me know when you're ready and I'll create all the Vue components for authentication and progress tracking!
