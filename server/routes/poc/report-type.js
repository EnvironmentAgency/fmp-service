const services = require('../../services');
const Boom = require('boom');
const Joi = require('joi');

module.exports = {
  method: 'GET',
  path: '/poc/reportType/{name}',
  options: {
    description: 'Fetches the record from Product4ReportType, Coastal/Inland',
    handler: async (request, h) => {
      try {
        const result = await services.getReportType(request.params.name);
        if (!result) {
          return Boom.badRequest('Invalid result', new Error('Error Occured'))
        }
        if (!result.rows[0].reporttype) {
          return {};
        }
        return result.rows[0].reporttype;
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