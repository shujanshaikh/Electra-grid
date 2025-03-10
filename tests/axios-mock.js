// axios-mock.js
const axios = require('axios');

// Create a custom axios instance that handles circular references
const originalAxios = axios.create();

// Override the default toJSON method for axios responses
const originalRequest = originalAxios.request;
originalAxios.request = async function(...args) {
  try {
    const response = await originalRequest.apply(this, args);
    
    // Add a custom toJSON method to handle circular references
    if (response && typeof response === 'object') {
      const originalToJSON = response.toJSON;
      response.toJSON = function() {
        try {
          // Create a safe copy without circular references
          const safe = { ...this };
          // Remove circular references
          if (safe.config) {
            delete safe.config.transformRequest;
            delete safe.config.transformResponse;
            delete safe.config.adapter;
          }
          return safe;
        } catch (e) {
          return { error: 'Circular reference detected' };
        }
      };
    }
    
    return response;
  } catch (error) {
    // Also handle errors with circular references
    if (error.response) {
      const originalToJSON = error.response.toJSON;
      error.response.toJSON = function() {
        try {
          const safe = { ...this };
          if (safe.config) {
            delete safe.config.transformRequest;
            delete safe.config.transformResponse;
            delete safe.config.adapter;
          }
          return safe;
        } catch (e) {
          return { error: 'Circular reference detected' };
        }
      };
    }
    throw error;
  }
};

module.exports = originalAxios;
