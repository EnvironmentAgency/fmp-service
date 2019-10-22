const services = require('../../services');
const Boom = require('boom');

var GetCustomerRequestDetails = async function (id) {
  try {
    const data = await services.getcustomerRequestInformationById(id);
    if (!data) {
      return Boom.badRequest('Invalid result', new Error('Error Occured'))
    }
    if (!data.rows[0].customerrequestinformationbyid) {
      return {};
    }
    return data.rows[0].customerrequestinformationbyid
  }
  catch (error) {
    return Boom.badRequest("Some Issue occured in getting the Customer data")
  }
}

var SaveCustomerRequest = async function (id) {
  try {
    const data = await services.getcustomerRequestInformationById(id);
    if (!data) {
      return Boom.badRequest('Invalid result', new Error('Error Occured'))
    }
    if (!data.rows[0].customerrequestinformationbyid) {
      return {};
    }
    return data.rows[0].customerrequestinformationbyid
  }
  catch (error) {
    return Boom.badRequest("Some Issue occured in getting the Customer data")
  }
}
module.exports = { SaveCustomerRequest, GetCustomerRequestDetails }