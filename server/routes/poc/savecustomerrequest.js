
const services = require('../../services');
const Boom = require('boom');
const Joi = require('joi');
module.exports = {
  method: 'POST',
  path: '/poc/customer/savecustomerrequest',
  options: {
    description: 'This creates a record in to cutsomer request record',
    handler: async (request, h) => {
      try {
        const { firstname, lastname, email, placeOrPostcode } = request.payload;
        var requestedBy = firstname + '' + lastname;
        const data = await services.saveCustomerRequest(placeOrPostcode, requestedBy, email);
        if (!data) {
          return Boom.badRequest('Invalid result', new Error('Error Occured'))
        }
        if (!data.rows[0].row_to_json) {
          return '';
        }
        return data.rows[0].row_to_json
      }
      catch (error) {
        return Boom.badRequest("Some Issue occured in getting the report Type data")
      }
    }
  }
}