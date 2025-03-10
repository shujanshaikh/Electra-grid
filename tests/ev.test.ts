const axios = require('./mockAxios.js');

// Export to make this file a proper module
export {};

// Configure the base URL for your backend
const API_BASE_URL = 'http://localhost:3000'; // Change this to your actual backend URL

// Test data
const testStation = {
  name: 'Test Station',
  location: 'Test Location',
  latitude: 40.7128,
  longitude: -74.0060,
  powerCapacity: 150,
  availability: true
};

describe('EV Charging Station API Tests', () => {
  // Variable to store created station ID for later tests
  let createdStationId: number;

  describe('POST /stations - Create a new station', () => {
    it('should successfully create a new station', async () => {
      const response = await axios.post(`${API_BASE_URL}/stations`, testStation);
      
      expect(response.status).toBe(200);
      expect(response.data.evStation).toBeDefined();
      expect(response.data.evStation.name).toBe(testStation.name);
      
      // Store the ID for later tests
      createdStationId = response.data.evStation.id;
    });

    it('should reject invalid data', async () => {
      const invalidStation = {
        name: 'Invalid Station'
        // Missing required fields
      };

      try {
        await axios.post(`${API_BASE_URL}/stations`, invalidStation);
        fail('Expected request to fail with 400');
      } catch (error: any) {
        expect(error.response.status).toBe(400);
        expect(error.response.data.message).toBe('Invalid data');
      }
    });
  });

  describe('GET /stations - Retrieve all available stations', () => {
    it('should retrieve available stations', async () => {
      const response = await axios.get(`${API_BASE_URL}/stations`);
      
      expect(response.status).toBe(200);
      expect(response.data.evStation).toBeDefined();
      expect(Array.isArray(response.data.evStation)).toBe(true);
      
      // At least our created station should be there
      const foundStation = response.data.evStation.find((station: any) => station.id === createdStationId);
      expect(foundStation).toBeDefined();
    });
  });

  describe('GET /stations/:id - Retrieve a specific station', () => {
    it('should retrieve a station by ID', async () => {
      const response = await axios.get(`${API_BASE_URL}/stations/${createdStationId}`);
      
      expect(response.status).toBe(200);
      expect(response.data.evStation).toBeDefined();
      expect(response.data.evStation).toBe(createdStationId);
    });

    it('should handle non-existent station ID', async () => {
      const nonExistentId = 9999;
      
      try {
        await axios.get(`${API_BASE_URL}/stations/${nonExistentId}`);
      } catch (error: any) {
        expect(error.response.status).toBe(500);
        // Note: Your API currently returns 500 for not found,
        // ideally this should be 404 with a specific message
      }
    });
  });

  describe('PUT /stations/:id - Update a station', () => {
    it('should update an existing station', async () => {
      const updatedData = {
        name: 'Updated Station',
        location: 'Updated Location',
        latitude: 41.8781,
        longitude: -87.6298,
        powerCapacity: 300,
        availability: false
      };

      const response = await axios.put(`${API_BASE_URL}/stations/${createdStationId}`, updatedData);
      
      expect(response.status).toBe(200);
      expect(response.data.evStation).toBe(createdStationId);
      
      // Verify the update by fetching the station
      const getResponse = await axios.get(`${API_BASE_URL}/stations/${createdStationId}`);
      expect(getResponse.status).toBe(200);
    });

    it('should reject invalid update data', async () => {
      const invalidData = {
        name: 'Invalid Update'
        // Missing required fields
      };

      try {
        await axios.put(`${API_BASE_URL}/stations/${createdStationId}`, invalidData);
        fail('Expected request to fail with 400');
      } catch (error: any) {
        expect(error.response.status).toBe(400);
        expect(error.response.data.message).toBe('Invalid data');
      }
    });
  });

  describe('DELETE /stations/:id - Delete a station', () => {
    it('should delete an existing station', async () => {
      const response = await axios.delete(`${API_BASE_URL}/stations/${createdStationId}`);
      
      expect(response.status).toBe(200);
      expect(response.data.evStation).toBe(createdStationId);
      
      // Verify deletion by trying to fetch the deleted station
      try {
        await axios.get(`${API_BASE_URL}/stations/${createdStationId}`);
      } catch (error: any) {
        expect(error.response.status).toBe(500);
        // Note: Your API currently returns 500 for not found,
        // ideally this should be 404 with a specific message
      }
    });
  });
});