# Market Research App Deployment Guide

This document provides instructions for deploying the Market Research App to a production environment.

## Prerequisites

- Node.js 16+ and npm
- MongoDB database
- OpenAI API key or other LLM provider API key
- Cloud hosting account (AWS, Google Cloud, or similar)

## Environment Setup

Create a `.env` file in the backend directory with the following variables:

```
# Server Configuration
PORT=5000
NODE_ENV=production

# Database Configuration
MONGO_URI=your_mongodb_connection_string

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key

# Storage Configuration
STORAGE_BUCKET=your_storage_bucket_name
```

## Backend Deployment

1. Navigate to the backend directory:
   ```
   cd market_research_app/backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Build the application:
   ```
   npm run build
   ```

4. Start the server:
   ```
   npm start
   ```

For production deployment, we recommend using a process manager like PM2:

```
npm install -g pm2
pm2 start src/index.js --name market-research-backend
```

## Frontend Deployment

1. Navigate to the frontend directory:
   ```
   cd market_research_app/frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with the backend API URL:
   ```
   REACT_APP_API_URL=https://your-backend-api-url.com/api
   ```

4. Build the application:
   ```
   npm run build
   ```

5. Deploy the build folder to your web server or static hosting service.

For AWS S3 deployment:
```
aws s3 sync build/ s3://your-bucket-name --acl public-read
```

## Docker Deployment

Alternatively, you can use Docker for deployment:

1. Build the Docker images:
   ```
   docker-compose build
   ```

2. Start the containers:
   ```
   docker-compose up -d
   ```

## Continuous Integration/Deployment

For CI/CD, you can use GitHub Actions or similar services. A sample workflow file is provided in `.github/workflows/main.yml`.

## Monitoring and Maintenance

- Set up monitoring using CloudWatch, Datadog, or similar services
- Configure alerts for error rates and performance issues
- Implement regular database backups
- Schedule periodic security updates

## Scaling Considerations

- Use auto-scaling for the backend API servers
- Implement caching for frequently accessed data
- Consider using a CDN for frontend assets
- Optimize database queries and implement indexing
