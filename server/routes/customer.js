const services = require('../services');
const Boom = require('boom');

module.exports = {
  method: 'GET',
  path: '/customer/{id}',
  options: {
    description: 'Fetches the record from the customer table',
    handler: async (request, h) => {
      try {
        const result = await services.getCustomerById(request.params.id);
        if (!result) {
          return Boom.badRequest('Invalid result', new Error('Error Occured'))
        }
        if (!result.rows[0].data) {
          return {};
        }
        return result.rows[0].data;
      } catch (err) {
        return Boom.badImplementation('error occured while fetching the customer data', err)
      }
    },
  }
}