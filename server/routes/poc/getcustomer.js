const services = require('../../services');
const Boom = require('boom');
const Joi = require('joi');

module.exports = {
  method: 'POST',

  path: '/poc/dataset',
  options: {

    description: 'Fetches the data from all the static and dynamic tables',
    handler: async (request, h) => {
      console.log('request started');
      var Response = { ReportTypeName: {}, CustomerReference: {}, 'Product4(Detailed Flood Risk)': {}, 'Requested By': {}, 'Date Requested': {} };
      try {

        //Report Type Data
        const reportType = await services.getReportType(request.payload.reportType);
        if (!reportType) {
          return Boom.badRequest('Invalid result', new Error('Error Occured'))
        }
        if (!reportType.rows[0].reporttype) {
          return {};
        }
        Response.ReportTypeName = reportType.rows[0].reporttype.displayname

        //Customer Data
        const customerData = await services.getcustomerRequestInformationById(request.payload.id);
        if (!customerData) {
          return Boom.badRequest('Invalid result', new Error('Error Occured'))
        }
        if (!customerData.rows[0].customerrequestinformationbyid) {
          return {};
        }


        Response.CustomerReference = customerData.rows[0].customerrequestinformationbyid.Reference
        Response["Date Requested"] = customerData.rows[0].customerrequestinformationbyid.Date;
        Response["Requested By"] = customerData.rows[0].customerrequestinformationbyid['Requested By'];
        Response["Product4(Detailed Flood Risk)"] = customerData.rows[0].customerrequestinformationbyid['Product4(Detailed Flood Risk)'];
        return Response;
      } catch (err) {
        return Boom.badImplementation('error occured while fetching the customer data', err)
      }
    },
  }
}