// jest.setup.js
const { toJSON } = require('jest-serializer');

// Add a custom serializer to handle circular references
expect.addSnapshotSerializer({
  test: (val) => val && typeof val === 'object',
  print: (val, serialize) => {
    // Create a safe copy without circular references
    try {
      const cache = new Set();
      const safeVal = JSON.parse(JSON.stringify(val, (key, value) => {
        // Skip functions
        if (typeof value === 'function') {
          return '[Function]';
        }
        // Skip known circular references
        if (key === 'req' || key === 'res' || key === 'request' || key === 'response' || key === 'config') {
          return '[Circular]';
        }
        // Handle other circular references
        if (typeof value === 'object' && value !== null) {
          if (cache.has(value)) {
            return '[Circular]';
          }
          cache.add(value);
        }
        return value;
      }));
      return serialize(safeVal);
    } catch (e) {
      return serialize('[Circular Object]');
    }
  },
});

// Add global beforeEach to reset mocks
beforeEach(() => {
  jest.clearAllMocks();
  
  // Reset axios mock if it exists
  if (global.axios && typeof global.axios.reset === 'function') {
    global.axios.reset();
  }
});
