const services = require('../../services');
const Boom = require('boom');
const Joi = require('joi');

// module.exports = {
//   method: 'GET',

//   path: '/poc/customer/requestInformation/{id}',
//   options: {
//     description: 'Fetches the record from the customer table',
//     handler: async (request, h) => {
//       try {
//         const result = await services.getcustomerRequestInformationById(request.params.id);
//          if (!result) {
//           return Boom.badRequest('Invalid result', new Error('Error Occured'))
//         }
//         if (!result.rows[0].customerrequestinformationbyid) {
//           return {};
//         }
//         return result.rows[0];
//       } catch (err) {
//         return Boom.badImplementation('error occured while fetching the customer data', err)
//       }
//     },
//     validate: {
//       params: {
//         id: Joi.number().positive().required()
//       }
//     }
//   }
// }

module.exports = {
  method: 'GET',

  path: '/poc/dataset/{id}/{name}',
  options: {
    
    description: 'Fetches the data from all the static and dynamic tables',
    handler: async (request, h) => {
      var customerDataResponse;
      var reportTypeResponse;
      var contentsDataResponse;
      var confirmationDataResponse;
      try {

        //Report Type Data
        const reportType = await services.getProduct4ReportType(request.params.name);
        if (!reportType) {
          return Boom.badRequest('Invalid result', new Error('Error Occured'))
        }
        if (!reportType.rows[0].product4reporttype) {
          return {};
        }
        reportTypeResponse = reportType.rows[0];

        //Customer Data
        const customerData = await services.getcustomerRequestInformationById(request.params.id);
        if (!customerData) {
          return Boom.badRequest('Invalid result', new Error('Error Occured'))
        }
        if (!customerData.rows[0].customerrequestinformationbyid) {
          return {};
        }
        customerDataResponse = customerData.rows[0];

        //Contents Section
        const contentsData = await services.getContents();
        if (!contentsData) {
          return Boom.badRequest('Invalid result', new Error('Error Occured'))
        }
        if (!contentsData.rows[0].contents) {
          return {};
        }
        if (request.params.isinland) {
          contentsData = contentsData.rows[0].contents.filter((item) => {
            return item.isinland == true;
          });
        }
        contentsDataResponse = contentsData.rows[0];

        // Confirmation Text
        const confirmationData = await services.getFloodMapConfirmation();
        if (!confirmationData) {
          return Boom.badRequest('Invalid result', new Error('Error Occured'))
        }
        if (!confirmationData.rows[0].floodmapconfirmation) {
          return {};
        }
        confirmationDataResponse = confirmationData.rows[0];
        return { reportTypeResponse, customerDataResponse, contentsDataResponse, confirmationDataResponse };


      } catch (err) {
        return Boom.badImplementation('error occured while fetching the customer data', err)
      }
    },
    // validate: {
    //   params: {
    //    // id: Joi.number().positive().required()
    //   }
    // }
  }
}