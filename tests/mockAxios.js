// mockAxios.js - A simplified mock implementation of axios
const jwt = require('jsonwebtoken');

// Mock JWT_SECRET for testing
const JWT_SECRET = 'test-secret-key';

const mockAxios = {
  defaults: {
    headers: {
      common: {}
    }
  },
  
  // Mock response factory
  createResponse(status, data, headers = {}) {
    return {
      status,
      data,
      headers,
      config: {
        url: 'mock-url',
        // Avoid circular references by not including request/response objects
      }
    };
  },
  
  // Mock implementations
  get: jest.fn().mockImplementation((url) => {
    // Return different mock responses based on URL
    if (url.includes('/stations/')) {
      const id = parseInt(url.split('/').pop());
      if (id > 9000) { // Non-existent ID
        return Promise.reject({
          response: mockAxios.createResponse(500, { message: 'Internal server error' })
        });
      }
      return Promise.resolve(mockAxios.createResponse(200, { evStation: id }));
    } else if (url.includes('/energy/')) {
      const id = parseInt(url.split('/').pop());
      if (id > 9000) { // Non-existent ID
        return Promise.reject({
          response: mockAxios.createResponse(500, { message: 'Internal server error' })
        });
      }
      return Promise.resolve(mockAxios.createResponse(200, { 
        energy: { 
          id, 
          energyUsed: 25, 
          stationId: 1, 
          userId: 1,
          user: { id: 1, name: 'Test User' },
          station: { id: 1, name: 'Test Station' }
        } 
      }));
    } else if (url.includes('/energy')) {
      return Promise.resolve(mockAxios.createResponse(200, { 
        energy: [
          { id: 1, energyUsed: 25, stationId: 1, userId: 1, user: { id: 1 }, station: { id: 1 } }
        ] 
      }));
    } else if (url.includes('/stations')) {
      return Promise.resolve(mockAxios.createResponse(200, { 
        evStation: [
          { id: 1, name: 'Test Station', location: 'Test Location', powerCapacity: 150 }
        ] 
      }));
    } else if (url.includes('/protected-route')) {
      return Promise.reject({
        response: mockAxios.createResponse(404, { message: 'Not found' })
      });
    } else {
      return Promise.resolve(mockAxios.createResponse(200, { success: true }));
    }
  }),
  
  post: jest.fn().mockImplementation((url, data) => {
    // Handle signup endpoint
    if (url.includes('/signup')) {
      // Duplicate email check
      if (data.email && data.email.includes('test') && mockAxios._isDuplicateEmail) {
        return Promise.reject({
          response: mockAxios.createResponse(500, { message: 'Internal server error' })
        });
      }
      
      // Invalid data check
      if (!data.email || !data.email.includes('@') || !data.password || data.password.length < 8) {
        return Promise.reject({
          response: mockAxios.createResponse(400, { message: 'Invalid data' })
        });
      }
      
      // Set flag for duplicate email test
      mockAxios._isDuplicateEmail = true;
      
      return Promise.resolve(mockAxios.createResponse(200, { user: 1 }));
    } 
    // Handle signin endpoint
    else if (url.includes('/signin')) {
      // Invalid data format
      if (!data.email || !data.email.includes('@') || !data.password || data.password.length < 8) {
        return Promise.reject({
          response: mockAxios.createResponse(400, { message: 'Invalid data' })
        });
      }
      
      // Valid credentials
      if (data.email && data.email.includes('test') && data.password === 'Password123!') {
        // Create a valid JWT token
        const token = jwt.sign(
          { email: data.email, name: 'Test User', id: 1 },
          JWT_SECRET,
          { expiresIn: '1h' }
        );
        
        return Promise.resolve(mockAxios.createResponse(200, { 
          token,
          user: { id: 1, name: 'Test User', email: data.email }
        }));
      } else {
        return Promise.reject({
          response: mockAxios.createResponse(401, { message: 'Invalid credentials' })
        });
      }
    } 
    // Handle energy endpoint
    else if (url.includes('/energy')) {
      // Invalid data check
      if (!data.stationId || !data.userId || data.energyUsed === undefined || data.energyUsed < 0) {
        return Promise.reject({
          response: mockAxios.createResponse(400, { message: 'Invalid data' })
        });
      }
      
      // Non-existent station or user
      if (data.stationId > 9000 || data.userId > 9000) {
        return Promise.reject({
          response: mockAxios.createResponse(500, { message: 'Internal server error' })
        });
      }
      
      return Promise.resolve(mockAxios.createResponse(200, { 
        energy: { id: 1, ...data }
      }));
    } 
    // Handle stations endpoint
    else if (url.includes('/stations')) {
      // Invalid data check
      if (!data.name || !data.location || !data.powerCapacity) {
        return Promise.reject({
          response: mockAxios.createResponse(400, { message: 'Invalid data' })
        });
      }
      
      return Promise.resolve(mockAxios.createResponse(200, { 
        evStation: { id: 1, ...data }
      }));
    } else {
      return Promise.resolve(mockAxios.createResponse(200, { success: true }));
    }
  }),
  
  put: jest.fn().mockImplementation((url, data) => {
    if (url.includes('/stations/')) {
      // Invalid data check
      if (!data.name || !data.location || !data.powerCapacity) {
        return Promise.reject({
          response: mockAxios.createResponse(400, { message: 'Invalid data' })
        });
      }
      
      const id = parseInt(url.split('/').pop());
      return Promise.resolve(mockAxios.createResponse(200, { evStation: id }));
    } else {
      return Promise.resolve(mockAxios.createResponse(200, { success: true }));
    }
  }),
  
  delete: jest.fn().mockImplementation((url) => {
    if (url.includes('/stations/')) {
      const id = parseInt(url.split('/').pop());
      return Promise.resolve(mockAxios.createResponse(200, { evStation: id }));
    } else {
      return Promise.resolve(mockAxios.createResponse(200, { success: true }));
    }
  }),
  
  // Internal state for testing
  _isDuplicateEmail: false,
  
  // Reset all mocks between tests
  reset() {
    this.get.mockClear();
    this.post.mockClear();
    this.put.mockClear();
    this.delete.mockClear();
    this._isDuplicateEmail = false;
  }
};

module.exports = mockAxios;
