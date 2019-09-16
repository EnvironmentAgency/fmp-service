const services = require('../../services');
const Boom = require('boom');

module.exports = {
  method: 'GET',
  path: '/poc/floodmapconfirmation',
  options: {
    description: 'Fetches the record from the floodmap for confirmation table',
    handler: async (request, h) => {
      try {
        const result = await services.getFloodMapConfirmation();
        if (!result) {
          return Boom.badRequest('Invalid result', new Error('Error Occured'))
        }
        if (!result.rows[0].floodmapconfirmation) {
          return {};
        }
        return result.rows[0].floodmapconfirmation;
      } catch (err) {
        return Boom.badImplementation('error occured while floodmap for confirmation data', err)
      }
    },
  }
}