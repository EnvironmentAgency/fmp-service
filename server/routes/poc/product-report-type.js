const services = require('../../services');
const Boom = require('boom');
const Joi = require('joi');

module.exports = {
  method: 'GET',
  path: '/poc/product4/ReportType/{name}',
  options: {
    description: 'Fetches the record from Product4ReportType, Coastal/Inland',
    handler: async (request, h) => {
      try {
        const result = await services.getProduct4ReportType(request.params.name);
        if (!result) {
          return Boom.badRequest('Invalid result', new Error('Error Occured'))
        }
        if (!result.rows[0].product4reporttype) {
          return {};
        }
        return result.rows[0].product4reporttype;
      } catch (err) {
        return Boom.badImplementation('error occured while fetching the Product ReportType  data', err)
      }
    },
    validate: {
      params: {
        name: Joi.string().required()
      }
    }
  }
}