# Database Connection Pool with DynamoDB

## Overview
This project uses AWS DynamoDB with the AWS SDK v3 for Node.js. DynamoDB is a managed NoSQL database that doesn't require traditional connection pooling like SQL databases, but we implement efficient client reuse patterns.

## Connection Management

### Client Reuse Pattern
The `server/utils/db.js` file creates a single DynamoDB client instance that is reused across all requests:

```javascript
const client = new DynamoDBClient({ /* config */ })
const docClient = DynamoDBDocumentClient.from(client)
```

### Why No Traditional Connection Pool?

DynamoDB is a fully managed service accessed via HTTP/HTTPS API calls. Unlike traditional databases:

1. **No persistent connections** - Each operation is a stateless HTTP request
2. **Auto-scaling** - AWS handles all capacity and scaling
3. **Built-in connection management** - AWS SDK manages HTTP connection pooling internally
4. **No connection limits** - Pay per request, not per connection

### AWS SDK Connection Pooling

The AWS SDK for JavaScript v3 includes built-in HTTP connection pooling:

- Reuses HTTP connections automatically
- Manages connection lifecycle
- Handles retries and backoff
- Default pool size: 50 concurrent connections
- Configurable via `maxSockets` option

### Custom Configuration (Optional)

If you need to customize connection behavior:

```javascript
import { NodeHttpHandler } from '@aws-sdk/node-http-handler'
import https from 'https'

const agent = new https.Agent({
  maxSockets: 50,        // Max concurrent connections
  keepAlive: true,       // Reuse connections
  keepAliveMsecs: 1000   // Keep alive timeout
})

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  requestHandler: new NodeHttpHandler({
    httpsAgent: agent
  })
})
```

## Performance Best Practices

### 1. Client Reuse ✅
```javascript
// ✅ Good - Single client instance (in db.js)
const client = new DynamoDBClient({ /* config */ })

// ❌ Bad - Creating new clients per request
export default defineEventHandler(async () => {
  const client = new DynamoDBClient({ /* config */ }) // Don't do this!
})
```

### 2. Batch Operations
For multiple items, use batch operations:

```javascript
import { BatchGetCommand, BatchWriteCommand } from '@aws-sdk/lib-dynamodb'

// Get multiple items at once
const batchGet = new BatchGetCommand({
  RequestItems: {
    'port-chops-users': {
      Keys: [{ userId: 'user1' }, { userId: 'user2' }]
    }
  }
})
```

### 3. Query vs Scan
- **Use Query** when you know the partition key (fast, cheap)
- **Use Scan** sparingly (slow, expensive, scans entire table)

```javascript
// ✅ Good - Query with partition key
await db.query('port-chops-user-progress', 'userId = :userId', { ':userId': userId })

// ❌ Avoid - Scan entire table
await db.scan('port-chops-users')
```

### 4. Projection Expressions
Only fetch needed attributes:

```javascript
const command = new GetCommand({
  TableName: 'port-chops-users',
  Key: { userId },
  ProjectionExpression: 'userId, email, name' // Only these fields
})
```

### 5. Caching Strategy

For frequently accessed data, implement caching:

```javascript
// Example with LRU cache
import LRU from 'lru-cache'

const cache = new LRU({
  max: 500,
  ttl: 1000 * 60 * 5 // 5 minutes
})

export const cachedGetUser = async (userId) => {
  const cached = cache.get(userId)
  if (cached) return cached
  
  const user = await db.get('port-chops-users', { userId })
  cache.set(userId, user)
  return user
}
```

## Monitoring & Limits

### CloudWatch Metrics
Monitor these key metrics:
- `ConsumedReadCapacityUnits`
- `ConsumedWriteCapacityUnits`
- `ThrottledRequests`
- `UserErrors`

### Rate Limits (PAY_PER_REQUEST mode)
- **Default**: 40,000 read units, 40,000 write units per table
- **Burst**: 300 seconds of unused capacity
- **Auto-scaling**: Automatically adjusts

### Error Handling

```javascript
try {
  await db.put('table-name', item)
} catch (error) {
  if (error.name === 'ProvisionedThroughputExceededException') {
    // Implement exponential backoff retry
  } else if (error.name === 'ResourceNotFoundException') {
    // Table doesn't exist
  }
  throw error
}
```

## Cost Optimization

### 1. Use PAY_PER_REQUEST
- No upfront capacity planning
- Pay only for actual requests
- Auto-scales with traffic

### 2. Design Efficient Access Patterns
- Use partition keys effectively
- Minimize Scan operations
- Use sparse indexes for optional attributes

### 3. Implement TTL (Time To Live)
For temporary data (sessions, cache):

```javascript
// Add expiration timestamp
const item = {
  userId,
  sessionId,
  ttl: Math.floor(Date.now() / 1000) + (60 * 60 * 24) // 24 hours
}
```

Enable TTL on the table via AWS Console for automatic cleanup.

## Security

### 1. IAM Roles (Production)
Use IAM roles instead of access keys:

```javascript
// No credentials needed - uses IAM role
const client = new DynamoDBClient({
  region: process.env.AWS_REGION
})
```

### 2. Least Privilege Permissions
```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": [
      "dynamodb:GetItem",
      "dynamodb:PutItem",
      "dynamodb:UpdateItem",
      "dynamodb:Query"
    ],
    "Resource": [
      "arn:aws:dynamodb:us-east-1:*:table/port-chops-*"
    ]
  }]
}
```

### 3. Encryption at Rest
Enable encryption in DynamoDB table settings (free).

## Troubleshooting

### High Latency
1. Check AWS region - use closest to users
2. Enable DynamoDB Accelerator (DAX) for caching
3. Use Global Tables for multi-region

### Throttling Errors
1. Review access patterns
2. Distribute load across partition keys
3. Implement client-side retry with backoff

### Memory Issues
1. Limit result set sizes with `Limit` parameter
2. Use pagination with `LastEvaluatedKey`
3. Stream large scans using `ScanCommand` pagination

## Summary

✅ **We have:**
- Single reusable DynamoDB client instance
- Built-in AWS SDK connection pooling
- Efficient helper functions for common operations
- Error handling and validation

✅ **No traditional connection pool needed because:**
- DynamoDB is serverless (no persistent connections)
- AWS SDK handles HTTP connection reuse
- Auto-scales to any load
- Pay per request, not per connection

✅ **Best practices implemented:**
- Client reuse pattern
- Document client for easier JSON handling
- Centralized database operations
- Environment-based configuration
