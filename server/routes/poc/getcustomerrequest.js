const services = require('../../services');
const Boom = require('boom');
const Joi = require('joi');
module.exports = {
    method: 'POST',
    path: '/poc/customer/getcustomerrequestbyid',
    options: {
        description: 'This creates a record in to cutsomer request record',
        handler: async (request, h) => {
            try {
                var id = request.payload.id
                const data = await services.getCustomerRequestById(id);
                if (!data) {
                    return Boom.badRequest('Invalid result', new Error('Error Occured'))
                }
                if (!data.rows[0]) {
                    return Boom.badRequest('Invalid result', new Error('Error Occured'))
                }
                if (!data.rows[0].getcustomerrequestinformationbyid) {
                    return '';
                }
                return data.rows[0].getcustomerrequestinformationbyid

            } catch (err) {
                return Boom.badImplementation('error occured while saving record to customer data', err)
            }
        }
    }
}