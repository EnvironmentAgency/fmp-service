const services = require('../../services');
const Boom = require('boom');
const Joi = require('joi');

module.exports = {
  method: 'GET',
  path: '/poc/customer/requestInformation/{id}',
  options: {
    description: 'Fetches the record from the customer table',
    handler: async (request, h) => {
      try {
        const result = await services.getcustomerRequestInformationById(request.params.id);
        if (!result) {
          return Boom.badRequest('Invalid result', new Error('Error Occured'))
        }
        if (!result.rows[0].customerrequestinformationbyid) {
          return {};
        }
        return result.rows[0].customerrequestinformationbyid;
      } catch (err) {
        return Boom.badImplementation('error occured while fetching the customer data', err)
      }
    },
    validate: {
      params: {
        id: Joi.number().positive().required()
      }
    }
  },
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