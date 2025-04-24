# Market Research App - Technical Documentation

## Architecture Overview

The Market Research App is built using a modern three-tier architecture:

1. **Frontend Layer**: React.js with TypeScript and Material UI
2. **Backend Layer**: Node.js with Express
3. **Data Layer**: MongoDB database and external APIs

## System Components

### Frontend Components

- **React Application**: Single-page application built with React 18 and TypeScript
- **Material UI**: Component library for consistent UI design
- **Chart.js**: Library for data visualization
- **React Router**: For application routing
- **Axios**: For API communication

### Backend Components

- **Express Server**: RESTful API server
- **MongoDB**: Database for storing user data and research reports
- **JWT Authentication**: For secure user authentication
- **OpenAI Integration**: For LLM-powered market research
- **PDF Generation**: Using PDFKit for report generation

### External Integrations

- **OpenAI GPT-4o API**: Primary LLM for market research analysis
- **Alternative LLM Options**: Claude 3 Opus or Gemini 1.5 Pro
- **Web Search APIs**: For data collection (optional)
- **Industry Data APIs**: For specialized data (optional)

## Code Structure

### Frontend Structure

```
frontend/
├── public/              # Static files
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── charts/      # Visualization components
│   │   └── Layout.tsx   # Main layout component
│   ├── pages/           # Page components
│   │   ├── Dashboard.tsx
│   │   ├── ResearchForm.tsx
│   │   ├── ResearchResults.tsx
│   │   └── ResearchHistory.tsx
│   ├── services/        # API communication services
│   ├── assets/          # Images and other assets
│   ├── App.tsx          # Main application component
│   └── index.tsx        # Application entry point
└── package.json         # Dependencies and scripts
```

### Backend Structure

```
backend/
├── src/
│   ├── controllers/     # Request handlers
│   │   ├── research.controller.js
│   │   └── user.controller.js
│   ├── models/          # Database models
│   │   ├── research.model.js
│   │   └── user.model.js
│   ├── routes/          # API routes
│   │   ├── research.routes.js
│   │   └── user.routes.js
│   ├── services/        # Business logic
│   │   ├── llm.service.js
│   │   └── pdf.service.js
│   ├── utils/           # Utility functions
│   │   ├── auth.js
│   │   └── errors.js
│   ├── tests/           # Test scripts
│   └── index.js         # Server entry point
└── package.json         # Dependencies and scripts
```

## API Documentation

### Authentication Endpoints

- `POST /api/users/register`: Register a new user
- `POST /api/users/login`: Authenticate a user
- `GET /api/users/profile`: Get user profile
- `PUT /api/users/profile`: Update user profile

### Research Endpoints

- `GET /api/research`: Get all research projects for a user
- `GET /api/research/:id`: Get a specific research project
- `POST /api/research`: Create a new research project
- `PUT /api/research/:id`: Update a research project
- `DELETE /api/research/:id`: Delete a research project
- `GET /api/research/:id/results`: Get research results
- `GET /api/research/:id/download`: Download research as PDF

## Database Schema

### User Collection

```javascript
{
  name: String,
  email: String,
  password: String (hashed),
  role: String,
  apiCredits: Number,
  preferences: {
    defaultIndustry: String,
    defaultDepth: String,
    defaultVisualizations: Boolean
  },
  createdAt: Date
}
```

### Research Collection

```javascript
{
  topic: String,
  industry: String,
  focusAreas: [String],
  timeframe: String,
  depth: String,
  visualizations: Boolean,
  competitors: [String],
  additionalNotes: String,
  status: String,
  progress: Number,
  results: {
    summary: String,
    sections: [{
      title: String,
      content: String
    }],
    visualizations: {
      marketSize: {
        years: [Number],
        values: [Number],
        cagr: Number
      },
      competitors: [{
        name: String,
        share: Number
      }],
      trends: [{
        name: String,
        data: [Number]
      }]
    }
  },
  pdfUrl: String,
  user: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
```

## LLM Integration

The application uses OpenAI's GPT-4o model for generating market research. The integration follows these steps:

1. **Research Planning**: Generate a structured research plan based on the topic
2. **Data Collection**: Gather relevant market data from various sources
3. **Data Analysis**: Analyze the collected data to generate insights
4. **Visualization Generation**: Create data for charts and graphs
5. **Report Compilation**: Compile all sections into a cohesive report

Each step uses carefully crafted prompts to guide the LLM in generating high-quality, relevant content.

## Security Considerations

- **Authentication**: JWT-based authentication with secure token storage
- **Authorization**: Role-based access control for API endpoints
- **Data Protection**: Encryption for sensitive data
- **Input Validation**: Server-side validation for all user inputs
- **Rate Limiting**: Protection against brute force and DoS attacks
- **Error Handling**: Secure error messages that don't expose system details

## Performance Optimization

- **Caching**: Implement Redis caching for frequently accessed data
- **Database Indexing**: Optimize MongoDB queries with proper indexes
- **Lazy Loading**: Load components and data only when needed
- **Code Splitting**: Split frontend code for faster initial loading
- **API Optimization**: Minimize payload size and number of requests

## Testing Strategy

- **Unit Tests**: Test individual components and functions
- **Integration Tests**: Test API endpoints and database interactions
- **End-to-End Tests**: Test complete user flows
- **Performance Tests**: Ensure the application can handle expected load

## Maintenance and Monitoring

- **Logging**: Comprehensive logging for debugging and auditing
- **Monitoring**: Track application performance and errors
- **Alerting**: Set up alerts for critical issues
- **Backup**: Regular database backups
- **Updates**: Schedule regular dependency updates and security patches
