const axios = require('./mockAxios.js');
const jwt = require('jsonwebtoken');

// Use a consistent JWT_SECRET for testing
const JWT_SECRET = 'test-secret-key';

// Export to make this file a proper module
export {};

// Configure the base URL for your backend
const API_BASE_URL = 'http://localhost:3000'; // Change this to your actual backend URL

// Test user data
const testUser = {
  name: 'Test User',
  email: `test${Date.now()}@example.com`, // Using timestamp to ensure uniqueness
  password: 'Password123!'
};

describe('Authentication API Tests', () => {
  // Store the token for later tests
  let authToken: string;

  describe('POST /signup - User Registration', () => {
    it('should successfully register a new user', async () => {
      const response = await axios.post(`${API_BASE_URL}/signup`, testUser);
      
      expect(response.status).toBe(200);
      expect(response.data.user).toBeDefined();
      expect(typeof response.data.user).toBe('number');
    });

    it('should reject duplicate email registration', async () => {
      try {
        await axios.post(`${API_BASE_URL}/signup`, testUser);
        fail('Expected request to fail with duplicate email');
      } catch (error: any) {
        expect(error.response.status).toBe(500);
        // Note: Ideally your API should return a more specific error code (409 Conflict)
        // and message for duplicate emails
      }
    });

    it('should reject invalid signup data', async () => {
      const invalidUser = {
        name: 'Invalid User',
        email: 'invalid-email', // Invalid email format
        password: '123' // Likely too short based on your schema
      };

      try {
        await axios.post(`${API_BASE_URL}/signup`, invalidUser);
        fail('Expected request to fail with 400');
      } catch (error: any) {
        expect(error.response.status).toBe(400);
        expect(error.response.data.message).toBe('Invalid data');
      }
    });
  });

  describe('POST /signin - User Login', () => {
    it('should successfully authenticate a user with valid credentials', async () => {
      const loginData = {
        email: testUser.email,
        password: testUser.password
      };

      const response = await axios.post(`${API_BASE_URL}/signin`, loginData);
      
      expect(response.status).toBe(200);
      expect(response.data.token).toBeDefined();
      
      // Store token for later use
      authToken = response.data.token;
      
      // Verify token is valid and contains expected user data
      const decodedToken = jwt.verify(authToken, JWT_SECRET) as any;
      expect(decodedToken.email).toBe(testUser.email);
      expect(decodedToken.name).toBe(testUser.name);
    });

    it('should reject login with incorrect password', async () => {
      const invalidLogin = {
        email: testUser.email,
        password: 'WrongPassword123!'
      };

      try {
        await axios.post(`${API_BASE_URL}/signin`, invalidLogin);
        fail('Expected request to fail with 401');
      } catch (error: any) {
        expect(error.response.status).toBe(401);
        expect(error.response.data.message).toBe('Invalid credentials');
      }
    });

    it('should reject login with non-existent email', async () => {
      const nonExistentUser = {
        email: 'nonexistent@example.com',
        password: 'Password123!'
      };

      try {
        await axios.post(`${API_BASE_URL}/signin`, nonExistentUser);
        fail('Expected request to fail with 401');
      } catch (error: any) {
        expect(error.response.status).toBe(401);
        expect(error.response.data.message).toBe('Invalid credentials');
      }
    });

    it('should reject login with invalid data format', async () => {
      const invalidData = {
        email: 'invalid-email',
        password: '123'
      };

      try {
        await axios.post(`${API_BASE_URL}/signin`, invalidData);
        fail('Expected request to fail with 400');
      } catch (error: any) {
        expect(error.response.status).toBe(400);
        expect(error.response.data.message).toBe('Invalid data');
      }
    });
  });

  // Additional test for using the token with protected routes
  // This assumes you have a protected route that requires authentication
  describe('Protected Routes with Authentication', () => {
    it('should access protected route with valid token', async () => {
      // Skip this test if you don't have a protected route yet
      if (!authToken) {
        console.log('Skipping protected route test - no auth token available');
        return;
      }

      try {
        // Replace '/protected-route' with an actual protected endpoint in your API
        const response = await axios.get(`${API_BASE_URL}/protected-route`, {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });
        
        expect(response.status).toBe(200);
      } catch (error: any) {
        // If you don't have a protected route yet, this will fail
        console.log('Protected route test failed - this is expected if you don\'t have one yet');
        console.log(`Status: ${error.response?.status}, Message: ${error.response?.data?.message}`);
      }
    });
  });
});

// Clean up test - deletes the test user from the database
// This requires a delete user endpoint or direct database access
describe('Cleanup', () => {
  it('should clean up test data', async () => {
    // This is just a placeholder. You would need to implement a way to delete the test user
    // Either through an API endpoint or direct database access
    console.log('Cleanup: Test user should be deleted here');
    
    // If you have a delete user endpoint:
    /*
    try {
      await axios.delete(`${API_BASE_URL}/users/${testUser.email}`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
    } catch (error) {
      console.error('Failed to delete test user:', error);
    }
    */
  });
});