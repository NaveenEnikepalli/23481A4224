const axios = require('axios');

const {
  VALID_LEVELS,
  VALID_STACKS,
  VALID_PACKAGES
} = require('./constants');

function createLogger(endpoint, token) {

  return async function log(
    level,
    stack,
    packageName,
    message
  ) {

    if (!VALID_LEVELS.includes(level)) {
      throw new Error('Invalid level');
    }

    if (!VALID_STACKS.includes(stack)) {
      throw new Error('Invalid stack');
    }

    if (!VALID_PACKAGES.includes(packageName)) {
      throw new Error('Invalid package');
    }

    try {

      const response = await axios.post(
        endpoint,
        {
          level,
          stack,
          package: packageName,
          message
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log('Log sent successfully');

      return response.data;

    } catch (error) {

      console.error(
        'Failed to send log:',
        error.response?.data || error.message
      );
    }
  };
}

module.exports = createLogger;