const services = require('../../services');
const Boom = require('boom');
const Joi = require('joi');

module.exports = {
  method: 'GET',
  path: '/poc/contents/{isinland}',
  options: {
    description: 'Fetches the record from the Contents table',
    handler: async (request, h) => {
      try {
        const result = await services.getContents();
        if (!result) {
          return Boom.badRequest('Invalid result', new Error('Error Occured'))
        }
        if (!result.rows[0].contents) {
          return {};
        }
        if (request.params.isinland) {
          return result.rows[0].contents.filter((item) => {
            return item.isinland == true;
          });
        }
        return result.rows[0].contents;
      } catch (err) {
        return Boom.badImplementation('error occured while fetching the contents data', err)
      }
    },
    validate: {
      params: {
        isinland: Joi.boolean().required()
      }
    }
  }
}