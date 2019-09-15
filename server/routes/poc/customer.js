const services = require('../../services');
const Boom = require('boom');

module.exports = {
  method: 'GET',
  path: '/poc/customer/requestInformation/{id}',
  options: {
    description: 'Fetches the record from the customer table',
    handler: async (request, h) => {
      try {
        const result = await services.getcustomerRequestInformationById(request.params.id);
        console.log('result: ' ,result)
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
  }
}