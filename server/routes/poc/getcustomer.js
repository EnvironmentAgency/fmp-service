const services = require('../../services');
const Boom = require('boom');
const Joi = require('joi');

module.exports = {
  method: 'GET',
//trying to add mapfish to  this
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
  }
}