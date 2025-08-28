#!/usr/bin/env node

/**
 * Comprehensive MongoDB Endpoints Test Script
 * Tests all API endpoints for the Pet Adoption System
 */

const axios = require('axios');
const colors = require('colors');

// Configuration
const BASE_URL = 'http://localhost:3000/api';
const TIMEOUT = 10000; // 10 seconds

// Test data storage
let testData = {
  pets: [],
  users: [],
  admins: [],
  requests: []
};

// Utility functions
function log(message, type = 'info') {
  const timestamp = new Date().toISOString();
  switch (type) {
    case 'success':
      console.log(`[${timestamp}] ✅ ${message}`.green);
      break;
    case 'error':
      console.log(`[${timestamp}] ❌ ${message}`.red);
      break;
    case 'warning':
      console.log(`[${timestamp}] ⚠️  ${message}`.yellow);
      break;
    case 'info':
    default:
      console.log(`[${timestamp}] ℹ️  ${message}`.blue);
      break;
  }
}

function logSection(title) {
  console.log('\n' + '='.repeat(60).cyan);
  console.log(`🧪 ${title}`.cyan.bold);
  console.log('='.repeat(60).cyan);
}

async function makeRequest(method, url, data = null, expectedStatus = 200) {
  try {
    const config = {
      method,
      url: `${BASE_URL}${url}`,
      timeout: TIMEOUT,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (data) {
      config.data = data;
    }

    const response = await axios(config);
    
    if (response.status === expectedStatus) {
      log(`${method} ${url} - Status: ${response.status}`, 'success');
      return { success: true, data: response.data, status: response.status };
    } else {
      log(`${method} ${url} - Expected: ${expectedStatus}, Got: ${response.status}`, 'warning');
      return { success: false, data: response.data, status: response.status };
    }
  } catch (error) {
    if (error.response) {
      log(`${method} ${url} - Error: ${error.response.status} - ${error.response.data?.error || error.message}`, 'error');
      return { success: false, error: error.response.data, status: error.response.status };
    } else {
      log(`${method} ${url} - Network Error: ${error.message}`, 'error');
      return { success: false, error: error.message };
    }
  }
}

// Test functions
async function testHealthEndpoint() {
  logSection('Testing Health Check Endpoint');
  
  const result = await makeRequest('GET', '/health');
  if (result.success) {
    log('Health check passed - System is healthy', 'success');
    if (result.data.database?.status === 'healthy') {
      log('Database connection is working', 'success');
    } else {
      log('Database connection issue detected', 'warning');
    }
  }
  return result.success;
}

async function testPetsEndpoints() {
  logSection('Testing Pets API Endpoints');
  
  let allTestsPassed = true;

  // Test GET /api/pets (empty)
  let result = await makeRequest('GET', '/pets');
  if (result.success) {
    log(`Found ${result.data.pets?.length || 0} existing pets`, 'info');
  } else {
    allTestsPassed = false;
  }

  // Test POST /api/pets (create new pets)
  const testPets = [
    {
      name: 'Buddy',
      animal: 'dog',
      breed: 'Golden Retriever',
      age: 3,
      medicalCondition: 'Healthy, fully vaccinated'
    },
    {
      name: 'Luna',
      animal: 'cat',
      breed: 'Domestic Shorthair',
      age: 2,
      medicalCondition: 'Spayed, healthy'
    },
    {
      name: 'Charlie',
      animal: 'bird',
      breed: 'Parakeet',
      age: 1,
      medicalCondition: 'Healthy, wing clipped'
    }
  ];

  for (const pet of testPets) {
    result = await makeRequest('POST', '/pets', pet, 201);
    if (result.success && result.data.pet) {
      testData.pets.push(result.data.pet);
      log(`Created pet: ${pet.name} (ID: ${result.data.pet._id})`, 'success');
    } else {
      allTestsPassed = false;
    }
  }

  // Test GET /api/pets (with data)
  result = await makeRequest('GET', '/pets');
  if (result.success) {
    log(`Retrieved ${result.data.pets?.length || 0} pets`, 'success');
  } else {
    allTestsPassed = false;
  }

  // Test GET /api/pets with filters
  result = await makeRequest('GET', '/pets?animal=dog&limit=5');
  if (result.success) {
    log(`Filtered pets (dogs): ${result.data.pets?.length || 0} results`, 'success');
  } else {
    allTestsPassed = false;
  }

  // Test GET /api/pets/{id}
  if (testData.pets.length > 0) {
    const petId = testData.pets[0]._id;
    result = await makeRequest('GET', `/pets/${petId}`);
    if (result.success && result.data.pet) {
      log(`Retrieved pet by ID: ${result.data.pet.name}`, 'success');
    } else {
      allTestsPassed = false;
    }
  }

  // Test PUT /api/pets/{id}
  if (testData.pets.length > 0) {
    const petId = testData.pets[0]._id;
    const updateData = {
      age: 4,
      medicalCondition: 'Healthy, fully vaccinated, microchipped'
    };
    result = await makeRequest('PUT', `/pets/${petId}`, updateData);
    if (result.success) {
      log(`Updated pet: ${petId}`, 'success');
    } else {
      allTestsPassed = false;
    }
  }

  return allTestsPassed;
}

async function testUsersEndpoints() {
  logSection('Testing Users API Endpoints');
  
  let allTestsPassed = true;

  // Test GET /api/users (empty)
  let result = await makeRequest('GET', '/users');
  if (result.success) {
    log(`Found ${result.data.users?.length || 0} existing users`, 'info');
  } else {
    allTestsPassed = false;
  }

  // Test POST /api/users (create new users)
  const testUsers = [
    {
      email: 'john.doe@example.com',
      password: 'password123',
      name: 'John Doe',
      phone: '+1234567890',
      photo: 'https://example.com/john.jpg'
    },
    {
      email: 'jane.smith@example.com',
      password: 'password456',
      name: 'Jane Smith',
      phone: '+1987654321'
    }
  ];

  for (const user of testUsers) {
    result = await makeRequest('POST', '/users', user, 201);
    if (result.success && result.data.user) {
      testData.users.push(result.data.user);
      log(`Created user: ${user.name} (ID: ${result.data.user._id})`, 'success');
    } else {
      allTestsPassed = false;
    }
  }

  // Test GET /api/users (with data)
  result = await makeRequest('GET', '/users');
  if (result.success) {
    log(`Retrieved ${result.data.users?.length || 0} users`, 'success');
  } else {
    allTestsPassed = false;
  }

  // Test GET /api/users/{id}
  if (testData.users.length > 0) {
    const userId = testData.users[0]._id;
    result = await makeRequest('GET', `/users/${userId}`);
    if (result.success && result.data.user) {
      log(`Retrieved user by ID: ${result.data.user.name}`, 'success');
    } else {
      allTestsPassed = false;
    }
  }

  // Test PUT /api/users/{id}
  if (testData.users.length > 0) {
    const userId = testData.users[0]._id;
    const updateData = {
      name: 'John Doe Updated',
      phone: '+1111111111'
    };
    result = await makeRequest('PUT', `/users/${userId}`, updateData);
    if (result.success) {
      log(`Updated user: ${userId}`, 'success');
    } else {
      allTestsPassed = false;
    }
  }

  return allTestsPassed;
}

async function testAdminEndpoints() {
  logSection('Testing Admin API Endpoints');
  
  let allTestsPassed = true;

  // Test GET /api/admin (empty)
  let result = await makeRequest('GET', '/admin');
  if (result.success) {
    log(`Found ${result.data.admins?.length || 0} existing admins`, 'info');
  } else {
    allTestsPassed = false;
  }

  // Test POST /api/admin (create new admin)
  const testAdmin = {
    email: 'admin@petadoption.com',
    password: 'admin123456'
  };

  result = await makeRequest('POST', '/admin', testAdmin, 201);
  if (result.success && result.data.admin) {
    testData.admins.push(result.data.admin);
    log(`Created admin: ${testAdmin.email} (ID: ${result.data.admin._id})`, 'success');
  } else {
    allTestsPassed = false;
  }

  // Test GET /api/admin (with data)
  result = await makeRequest('GET', '/admin');
  if (result.success) {
    log(`Retrieved ${result.data.admins?.length || 0} admins`, 'success');
  } else {
    allTestsPassed = false;
  }

  return allTestsPassed;
}

async function testRequestsEndpoints() {
  logSection('Testing Adoption Requests API Endpoints');
  
  let allTestsPassed = true;

  // Test GET /api/requests (empty)
  let result = await makeRequest('GET', '/requests');
  if (result.success) {
    log(`Found ${result.data.requests?.length || 0} existing requests`, 'info');
  } else {
    allTestsPassed = false;
  }

  // Test POST /api/requests (create new requests)
  if (testData.pets.length > 0) {
    const testRequests = [
      {
        userName: 'Alice Johnson',
        phoneNumber: '+1555123456',
        pet: testData.pets[0]._id,
        pickupDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
        message: 'I would love to adopt this wonderful pet. I have experience with dogs.',
        responsibilityAccepted: true
      },
      {
        userName: 'Bob Wilson',
        phoneNumber: '+1555987654',
        pet: testData.pets[1]._id,
        pickupDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
        message: 'I am ready to provide a loving home for this cat.',
        responsibilityAccepted: true
      }
    ];

    for (const request of testRequests) {
      result = await makeRequest('POST', '/requests', request, 201);
      if (result.success && result.data.request) {
        testData.requests.push(result.data.request);
        log(`Created adoption request: ${request.userName} for pet ${request.pet}`, 'success');
      } else {
        allTestsPassed = false;
      }
    }
  } else {
    log('No pets available to create adoption requests', 'warning');
  }

  // Test GET /api/requests (with data)
  result = await makeRequest('GET', '/requests');
  if (result.success) {
    log(`Retrieved ${result.data.requests?.length || 0} adoption requests`, 'success');
  } else {
    allTestsPassed = false;
  }

  // Test GET /api/requests with filters
  if (testData.pets.length > 0) {
    result = await makeRequest('GET', `/requests?pet=${testData.pets[0]._id}`);
    if (result.success) {
      log(`Filtered requests by pet: ${result.data.requests?.length || 0} results`, 'success');
    } else {
      allTestsPassed = false;
    }
  }

  // Test GET /api/requests/{id}
  if (testData.requests.length > 0) {
    const requestId = testData.requests[0]._id;
    result = await makeRequest('GET', `/requests/${requestId}`);
    if (result.success && result.data.request) {
      log(`Retrieved request by ID: ${result.data.request.userName}`, 'success');
    } else {
      allTestsPassed = false;
    }
  }

  // Test PUT /api/requests/{id}
  if (testData.requests.length > 0) {
    const requestId = testData.requests[0]._id;
    const updateData = {
      message: 'Updated: I am even more excited to adopt this pet!',
      phoneNumber: '+1555111222'
    };
    result = await makeRequest('PUT', `/requests/${requestId}`, updateData);
    if (result.success) {
      log(`Updated adoption request: ${requestId}`, 'success');
    } else {
      allTestsPassed = false;
    }
  }

  return allTestsPassed;
}

async function testDeleteEndpoints() {
  logSection('Testing DELETE Endpoints (Cleanup)');
  
  let allTestsPassed = true;

  // Delete adoption requests first (they reference pets)
  for (const request of testData.requests) {
    const result = await makeRequest('DELETE', `/requests/${request._id}`);
    if (result.success) {
      log(`Deleted adoption request: ${request._id}`, 'success');
    } else {
      allTestsPassed = false;
    }
  }

  // Delete users
  for (const user of testData.users) {
    const result = await makeRequest('DELETE', `/users/${user._id}`);
    if (result.success) {
      log(`Deleted user: ${user._id}`, 'success');
    } else {
      allTestsPassed = false;
    }
  }

  // Delete pets
  for (const pet of testData.pets) {
    const result = await makeRequest('DELETE', `/pets/${pet._id}`);
    if (result.success) {
      log(`Deleted pet: ${pet._id}`, 'success');
    } else {
      allTestsPassed = false;
    }
  }

  return allTestsPassed;
}

// Main test runner
async function runAllTests() {
  console.log('🚀 Starting MongoDB Endpoints Test Suite'.rainbow.bold);
  console.log(`📍 Base URL: ${BASE_URL}`.cyan);
  console.log(`⏱️  Timeout: ${TIMEOUT}ms`.cyan);
  
  const startTime = Date.now();
  const testResults = [];

  try {
    // Run all tests
    testResults.push({ name: 'Health Check', passed: await testHealthEndpoint() });
    testResults.push({ name: 'Pets API', passed: await testPetsEndpoints() });
    testResults.push({ name: 'Users API', passed: await testUsersEndpoints() });
    testResults.push({ name: 'Admin API', passed: await testAdminEndpoints() });
    testResults.push({ name: 'Requests API', passed: await testRequestsEndpoints() });
    testResults.push({ name: 'DELETE Operations', passed: await testDeleteEndpoints() });

    // Summary
    logSection('Test Results Summary');
    
    const passedTests = testResults.filter(test => test.passed).length;
    const totalTests = testResults.length;
    
    testResults.forEach(test => {
      const status = test.passed ? '✅ PASSED'.green : '❌ FAILED'.red;
      console.log(`${test.name}: ${status}`);
    });
    
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`\n📊 Results: ${passedTests}/${totalTests} test suites passed`.bold);
    console.log(`⏱️  Total time: ${duration}s`.cyan);
    
    if (passedTests === totalTests) {
      console.log('\n🎉 All tests passed! MongoDB endpoints are working correctly.'.green.bold);
      process.exit(0);
    } else {
      console.log('\n⚠️  Some tests failed. Please check the logs above.'.yellow.bold);
      process.exit(1);
    }
    
  } catch (error) {
    log(`Fatal error during testing: ${error.message}`, 'error');
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Test interrupted by user'.yellow);
  process.exit(1);
});

// Run tests if this file is executed directly
if (require.main === module) {
  runAllTests();
}

module.exports = {
  runAllTests,
  testHealthEndpoint,
  testPetsEndpoints,
  testUsersEndpoints,
  testAdminEndpoints,
  testRequestsEndpoints
};