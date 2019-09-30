const Boom = require('boom');
const Joi = require('joi');
const reportTypeData = require('./report-type');
const customerRequestData = require('./customer');
const contentsData = require('./contents');
const disclaimerData = require('./disclaimer');

module.exports = {
  method: 'POST',
  path: '/poc/dataset',
  options: {
    description: 'Fetches the data from all the static and dynamic tables',
    handler: async (request, h) => {
      var Response = { ReportTypeName: {}, CustomerReference: {}, 'Product4(Detailed Flood Risk)': {}, 'Requested By': {}, 'Date Requested': {}, ContentListData: '', Disclaimer: '' };
      try {

        //Report Type Data
        Response.ReportTypeName = await reportTypeData(request.payload.reportType);

        //CustomerData
        var customerData = await customerRequestData(request.payload.id);
        Response.CustomerReference = customerData.Reference
        Response["Date Requested"] = customerData.Date;
        Response["Requested By"] = customerData['Requested By'];
        Response["Product4(Detailed Flood Risk)"] = customerData['Product4(Detailed Flood Risk)'];

        //Content Headings
       var contentData= await contentsData(request.payload.isinland);
       console.log(contentData);
       Response.ContentListData=contentData;

        //Disclaimer data
        Response.Disclaimer = await disclaimerData();
        return Response;
      }
      catch (err) {
        return Boom.badImplementation('error occured while fetching the contents data', err)
      }
    }
  }
}