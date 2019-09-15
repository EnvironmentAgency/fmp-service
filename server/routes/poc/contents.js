const services = require('../../services');
const Boom = require('boom');

module.exports = {
  method: 'GET',
  path: '/poc/contents/{isinland}',
  options: {
    description: 'Fetches the record from the Contents table',
    handler: async (request, h) => {
      try {
        const result = await services.getContentsCoastal(request.params.isinland);
        console.log('result: ' ,result)
        if (!result) {
          return Boom.badRequest('Invalid result', new Error('Error Occured'))
        }
        if (!result.rows[0].contentsforinland) {
          return {};
        }
        return result.rows[0].contentsforinland;
      } catch (err) {
        return Boom.badImplementation('error occured while fetching the contenets data', err)
      }
    },
  }
}