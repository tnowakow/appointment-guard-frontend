#!/bin/bash

# Deploy AppointmentGuard Frontend to Railway using GraphQL API

API_TOKEN="1cf367c3-7099-4b69-93a1-5401c2297fec"
PROJECT_ID="fda2073b-d325-4734-8dd6-20deb81eb585"

echo "🚀 Deploying AppointmentGuard Frontend to Railway..."

# Build the frontend first
echo "📦 Building frontend..."
npm ci
npm run build -- --mode production

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build successful!"

# Create a deployment via Railway GraphQL API
echo "📡 Creating deployment on Railway..."

curl -s -X POST \
  https://backboard.railway.com/graphql/v2 \
  -H "Authorization: Bearer $API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "query": mutation {
      deploymentCreate(input: {
        projectId: "'"$PROJECT_ID"'",
        strategy: "AUTO",
        branch: "main"
      }) {
        id
        status
      }
    }
  }'

echo ""
echo "✅ Deployment triggered! Check Railway dashboard for status:"
echo "https://railway.app/project/$PROJECT_ID"
