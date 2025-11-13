#!/bin/bash

# Port-Chops Quick Start Script
# Run this after cloning the repository

echo "🍽️ Port-Chops Setup Script"
echo "=========================="
echo ""

# Check Node version
echo "✓ Checking Node.js version..."
node_version=$(node -v)
echo "  Node.js version: $node_version"
if [[ ! $node_version =~ ^v2[0-9] ]]; then
  echo "  ⚠️  Warning: Node.js 20+ recommended. You have $node_version"
fi
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
yarn install
echo ""

# Copy environment file
if [ ! -f .env ]; then
  echo "⚙️ Creating .env file..."
  cp .env.example .env
  echo "  ✓ Created .env from .env.example"
  echo "  ⚠️  Please edit .env and add your AWS credentials!"
else
  echo "⚙️ .env file already exists"
fi
echo ""

# Create DynamoDB tables (optional)
read -p "Do you want to create DynamoDB tables now? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo "📊 Creating DynamoDB tables..."
  
  # Users table
  aws dynamodb create-table \
    --table-name port-chops-users \
    --attribute-definitions AttributeName=userId,AttributeType=S \
    --key-schema AttributeName=userId,KeyType=HASH \
    --billing-mode PAY_PER_REQUEST \
    --region us-east-1 \
    2>/dev/null && echo "  ✓ Created port-chops-users table" || echo "  ⚠️  Table may already exist or AWS CLI not configured"
  
  # Lessons table
  aws dynamodb create-table \
    --table-name port-chops-lessons \
    --attribute-definitions AttributeName=lessonId,AttributeType=S \
    --key-schema AttributeName=lessonId,KeyType=HASH \
    --billing-mode PAY_PER_REQUEST \
    --region us-east-1 \
    2>/dev/null && echo "  ✓ Created port-chops-lessons table" || echo "  ⚠️  Table may already exist or AWS CLI not configured"
  
  # User progress table
  aws dynamodb create-table \
    --table-name port-chops-user-progress \
    --attribute-definitions \
      AttributeName=userId,AttributeType=S \
      AttributeName=lessonId,AttributeType=S \
    --key-schema \
      AttributeName=userId,KeyType=HASH \
      AttributeName=lessonId,KeyType=RANGE \
    --billing-mode PAY_PER_REQUEST \
    --region us-east-1 \
    2>/dev/null && echo "  ✓ Created port-chops-user-progress table" || echo "  ⚠️  Table may already exist or AWS CLI not configured"
  
  echo ""
fi

echo "✨ Setup Complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env file with your AWS credentials"
echo "2. Run 'yarn dev' to start development server"
echo "3. Visit http://localhost:3000"
echo "4. Read DATABASE_SETUP.md for detailed setup instructions"
echo ""
echo "Happy coding! 🎉"
