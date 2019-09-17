
const services = require('../../services');
const Boom = require('boom');
const Joi = require('joi');
module.exports = {
  method: 'POST',
  path: '/poc/customer/create',
  options: {
    description: 'This creates a record in to cutsomer request record',
    handler: async (request, h) => {
      try {
        const result = await services.createCustomerRequest(request.payload.pointofinterest, request.payload.requested, request.payload.reference);
        return result;
      } catch (err) {
        return Boom.badImplementation('error occured while saving record to customer data', err)
      }
    }
  }
}