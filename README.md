# Market Research App - README

## Overview

The Market Research App is a powerful tool that enables users to conduct in-depth market research on any industry or product by simply entering a topic. The application leverages advanced Large Language Models (LLMs) to analyze data, generate insights, and create comprehensive reports with visualizations.

## Key Features

- **Automated Market Research**: Generate comprehensive market research reports with just a few clicks
- **In-depth Analysis**: Get detailed insights on market size, competitive landscape, trends, and future outlook
- **Data Visualization**: View interactive charts and graphs illustrating key market metrics
- **PDF Reports**: Download professionally formatted PDF reports for sharing and presentation
- **Research History**: Access and manage all your past research projects
- **Customization Options**: Tailor research parameters to your specific needs

## Technology Stack

### Frontend
- React.js with TypeScript
- Material UI component library
- Chart.js for data visualization
- React Router for navigation

### Backend
- Node.js with Express
- MongoDB for data storage
- JWT for authentication
- PDFKit for PDF generation

### AI Integration
- OpenAI GPT-4o for market research analysis
- Alternative options: Claude 3 Opus or Gemini 1.5 Pro

## Getting Started

### Prerequisites
- Node.js 16+ and npm
- MongoDB database
- OpenAI API key or other LLM provider API key

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/market-research-app.git
   cd market-research-app
   ```

2. Install backend dependencies:
   ```
   cd backend
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   OPENAI_API_KEY=your_openai_api_key
   ```

4. Start the backend server:
   ```
   npm start
   ```

5. Install frontend dependencies:
   ```
   cd ../frontend
   npm install
   ```

6. Set up frontend environment variables:
   Create a `.env` file in the frontend directory:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

7. Start the frontend development server:
   ```
   npm start
   ```

8. Access the application at `http://localhost:3000`

## Documentation

For more detailed information, please refer to the following documentation:

- [User Guide](./docs/user_guide.md): Instructions for using the application
- [Deployment Guide](./docs/deployment_guide.md): Instructions for deploying to production
- [Technical Documentation](./docs/technical_documentation.md): Technical details and architecture

## LLM Integration

This application requires an API key from OpenAI (for GPT-4o) or an alternative LLM provider. The key should be set in the backend environment variables.

The LLM is used for:
1. Generating research plans
2. Analyzing market data
3. Creating insights and recommendations
4. Compiling comprehensive reports

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- OpenAI for providing the GPT-4o API
- Material UI for the component library
- Chart.js for visualization capabilities
