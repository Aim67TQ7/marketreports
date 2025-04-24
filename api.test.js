// Test script for the market research app
const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Configuration
const API_URL = 'http://localhost:5000/api';
let authToken = '';
let testResearchId = '';

// Test user credentials
const testUser = {
  name: 'Test User',
  email: 'test@example.com',
  password: 'Password123!'
};

// Test research request
const testResearch = {
  topic: 'Electric Vehicle Market Analysis',
  industry: 'Automotive',
  focusAreas: ['Market Size', 'Competitive Landscape', 'Future Outlook'],
  timeframe: 'medium-term',
  depth: 'comprehensive',
  visualizations: true,
  competitors: ['Tesla', 'BYD', 'Volkswagen', 'General Motors'],
  additionalNotes: 'Focus on battery technology trends and charging infrastructure'
};

// Helper function to log test results
function logTest(testName, success, message) {
  const status = success ? '✅ PASS' : '❌ FAIL';
  console.log(`${status} | ${testName} | ${message}`);
}

// Helper function to make API requests
async function apiRequest(method, endpoint, data = null, token = null) {
  try {
    const headers = {
      'Content-Type': 'application/json'
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await axios({
      method,
      url: `${API_URL}${endpoint}`,
      data,
      headers
    });
    
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.error || error.message,
      status: error.response?.status
    };
  }
}

// Test user registration
async function testUserRegistration() {
  console.log('\n--- Testing User Registration ---');
  
  // Test valid registration
  const result = await apiRequest('post', '/users/register', testUser);
  
  if (result.success) {
    logTest('User Registration', true, 'Successfully registered user');
    authToken = result.data.data.token;
    return true;
  } else {
    // If user already exists, try logging in
    if (result.status === 400 && result.error.includes('already exists')) {
      logTest('User Registration', true, 'User already exists, will try login');
      return true;
    } else {
      logTest('User Registration', false, `Failed to register user: ${result.error}`);
      return false;
    }
  }
}

// Test user login
async function testUserLogin() {
  console.log('\n--- Testing User Login ---');
  
  const result = await apiRequest('post', '/users/login', {
    email: testUser.email,
    password: testUser.password
  });
  
  if (result.success) {
    logTest('User Login', true, 'Successfully logged in');
    authToken = result.data.data.token;
    return true;
  } else {
    logTest('User Login', false, `Failed to login: ${result.error}`);
    return false;
  }
}

// Test user profile
async function testUserProfile() {
  console.log('\n--- Testing User Profile ---');
  
  const result = await apiRequest('get', '/users/profile', null, authToken);
  
  if (result.success) {
    logTest('Get User Profile', true, `Retrieved profile for ${result.data.data.email}`);
    return true;
  } else {
    logTest('Get User Profile', false, `Failed to get profile: ${result.error}`);
    return false;
  }
}

// Test creating research
async function testCreateResearch() {
  console.log('\n--- Testing Research Creation ---');
  
  const result = await apiRequest('post', '/research', testResearch, authToken);
  
  if (result.success) {
    logTest('Create Research', true, `Successfully created research with ID: ${result.data.data._id}`);
    testResearchId = result.data.data._id;
    return true;
  } else {
    logTest('Create Research', false, `Failed to create research: ${result.error}`);
    return false;
  }
}

// Test getting research by ID
async function testGetResearch() {
  console.log('\n--- Testing Get Research ---');
  
  if (!testResearchId) {
    logTest('Get Research', false, 'No research ID available to test');
    return false;
  }
  
  const result = await apiRequest('get', `/research/${testResearchId}`, null, authToken);
  
  if (result.success) {
    logTest('Get Research', true, `Successfully retrieved research: ${result.data.data.topic}`);
    return true;
  } else {
    logTest('Get Research', false, `Failed to get research: ${result.error}`);
    return false;
  }
}

// Test getting all research
async function testGetAllResearch() {
  console.log('\n--- Testing Get All Research ---');
  
  const result = await apiRequest('get', '/research', null, authToken);
  
  if (result.success) {
    logTest('Get All Research', true, `Successfully retrieved ${result.data.count} research items`);
    return true;
  } else {
    logTest('Get All Research', false, `Failed to get all research: ${result.error}`);
    return false;
  }
}

// Test LLM integration by checking research progress
async function testLLMIntegration() {
  console.log('\n--- Testing LLM Integration ---');
  
  if (!testResearchId) {
    logTest('LLM Integration', false, 'No research ID available to test');
    return false;
  }
  
  // Wait for research to start processing
  console.log('Waiting for research processing to start...');
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  // Check research status
  const result = await apiRequest('get', `/research/${testResearchId}`, null, authToken);
  
  if (result.success) {
    const status = result.data.data.status;
    const progress = result.data.data.progress;
    
    if (status === 'in-progress' || status === 'completed') {
      logTest('LLM Integration', true, `Research is being processed. Status: ${status}, Progress: ${progress}%`);
      return true;
    } else {
      logTest('LLM Integration', false, `Research is not being processed. Status: ${status}`);
      return false;
    }
  } else {
    logTest('LLM Integration', false, `Failed to check research status: ${result.error}`);
    return false;
  }
}

// Run all tests
async function runTests() {
  console.log('=== MARKET RESEARCH APP API TESTS ===');
  console.log('Starting tests at:', new Date().toISOString());
  
  let success = true;
  
  // User authentication tests
  success = await testUserRegistration() && success;
  success = await testUserLogin() && success;
  success = await testUserProfile() && success;
  
  // Research functionality tests
  success = await testCreateResearch() && success;
  success = await testGetResearch() && success;
  success = await testGetAllResearch() && success;
  success = await testLLMIntegration() && success;
  
  console.log('\n=== TEST SUMMARY ===');
  console.log(success ? '✅ All tests passed successfully' : '❌ Some tests failed');
  console.log('Tests completed at:', new Date().toISOString());
  
  return success;
}

// Execute tests
runTests()
  .then(success => {
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error('Error running tests:', error);
    process.exit(1);
  });
