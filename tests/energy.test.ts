const axios = require('./mockAxios.js');

// Export to make this file a proper module
export {};

// Configure the base URL for your backend
const API_BASE_URL = 'http://localhost:3000'; // Change this to your actual backend URL

// Sample data for testing
const testEnergyUsage = {
  stationId: 1, // You'll need an existing station ID
  userId: 1,    // You'll need an existing user ID
  energyUsed: 25
};

describe('Energy Usage API Tests', () => {
  // Store the created energy usage record ID for later tests
  let createdEnergyId: number;

  // Make sure we have valid user and station IDs before running tests
  beforeAll(async () => {
    // Optional: You could create a test user and station here if needed
    // For now, we'll assume the IDs provided in testEnergyUsage exist
    
    try {
      // Try to get a station to verify it exists
      await axios.get(`${API_BASE_URL}/stations/${testEnergyUsage.stationId}`);
      
      // Try to get a user to verify it exists (if you have a user endpoint)
      // await axios.get(`${API_BASE_URL}/users/${testEnergyUsage.userId}`);
      
      console.log('Using existing station ID:', testEnergyUsage.stationId);
      console.log('Using existing user ID:', testEnergyUsage.userId);
    } catch (error) {
      console.warn('Warning: Test prerequisites may not exist. Tests might fail.');
      console.warn('Make sure you have a station with ID', testEnergyUsage.stationId);
      console.warn('Make sure you have a user with ID', testEnergyUsage.userId);
    }
  });

  describe('POST /energy - Create energy usage record', () => {
    it('should successfully create a new energy usage record', async () => {
      const response = await axios.post(`${API_BASE_URL}/energy`, testEnergyUsage);
      
      expect(response.status).toBe(200);
      expect(response.data.energy).toBeDefined();
      expect(response.data.energy.energyUsed).toBe(testEnergyUsage.energyUsed);
      expect(response.data.energy.stationId).toBe(testEnergyUsage.stationId);
      expect(response.data.energy.userId).toBe(testEnergyUsage.userId);
      
      // Store the ID for later tests
      createdEnergyId = response.data.energy.id;
    });

    it('should reject invalid energy usage data', async () => {
      const invalidData = {
        // Missing required fields
        energyUsed: -5 // Assuming negative energy is invalid
      };

      try {
        await axios.post(`${API_BASE_URL}/energy`, invalidData);
        fail('Expected request to fail with 400');
      } catch (error: any) {
        expect(error.response.status).toBe(400);
        expect(error.response.data.message).toBe('Invalid data');
      }
    });

    it('should reject energy usage with non-existent station or user', async () => {
      const nonExistentData = {
        stationId: 99999, // Assuming this ID doesn't exist
        userId: 99999,    // Assuming this ID doesn't exist
        energyUsed: 10
      };

      try {
        await axios.post(`${API_BASE_URL}/energy`, nonExistentData);
        fail('Expected request to fail with 500 due to foreign key constraints');
      } catch (error: any) {
        expect(error.response.status).toBe(500);
        // This would ideally be a 400 with a more specific message, but your API returns 500
        expect(error.response.data.message).toBe('Internal server error');
      }
    });
  });

  describe('GET /energy - Retrieve all energy usage records', () => {
    it('should retrieve all energy usage records', async () => {
      const response = await axios.get(`${API_BASE_URL}/energy`);
      
      expect(response.status).toBe(200);
      expect(response.data.energy).toBeDefined();
      expect(Array.isArray(response.data.energy)).toBe(true);
      
      // At least our created record should be there
      const foundRecord = response.data.energy.find((record: any) => record.id === createdEnergyId);
      expect(foundRecord).toBeDefined();
      
      // Check that related data is included
      expect(foundRecord.user).toBeDefined();
      expect(foundRecord.station).toBeDefined();
    });
  });

  describe('GET /energy/:id - Retrieve a specific energy usage record', () => {
    it('should retrieve an energy usage record by ID', async () => {
      const response = await axios.get(`${API_BASE_URL}/energy/${createdEnergyId}`);
      
      expect(response.status).toBe(200);
      expect(response.data.energy).toBeDefined();
      expect(response.data.energy.id).toBe(createdEnergyId);
      expect(response.data.energy.energyUsed).toBe(testEnergyUsage.energyUsed);
    });

    it('should handle non-existent energy usage ID', async () => {
      const nonExistentId = 99999;
      
      try {
        await axios.get(`${API_BASE_URL}/energy/${nonExistentId}`);
        // If your API returns null for non-existent IDs instead of an error, 
        // adjust this test accordingly
      } catch (error: any) {
        expect(error.response.status).toBe(500);
        // Ideally this should be a 404 with a specific message
      }
    });
  });

  // Additional tests for user-specific energy usage if needed
  describe('Energy usage analytics', () => {
    it('should verify data integrity across related entities', async () => {
      // Get the energy record
      const energyResponse = await axios.get(`${API_BASE_URL}/energy/${createdEnergyId}`);
      
      // Get the related station
      const stationResponse = await axios.get(`${API_BASE_URL}/stations/${testEnergyUsage.stationId}`);
      
      // Verify relationships
      expect(energyResponse.data.energy.stationId).toBe(parseInt(stationResponse.data.evStation));
    });
  });
});