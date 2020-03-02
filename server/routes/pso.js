const Boom = require('boom')
const Wreck = require('@hapi/wreck')
const helpers = require('../util/helpers')

module.exports = {
  method: 'GET',
  path: '/pso-region-contact-details/{x}/{y}',
  options: {
    description: 'Returns PSO region contact detials',
    handler: async (request) => {
      var psoContactDetails = { EmailAddress: '', AreaName: '', LocalAuthorities: [] }
      try {
        if (request && request.params && request.params.x && request.params.y) {
          const fullPrintServicePSOContactURL = helpers.constructPrintServiceURLForPSOAddress(request.params.x, request.params.y)
          const { payload } = await Wreck.get(fullPrintServicePSOContactURL)
          if (payload) {
            var payloadResponseASJson = JSON.parse(payload.toString())
            if (payloadResponseASJson && payloadResponseASJson.results && payloadResponseASJson.results[0] && payloadResponseASJson.results[0].value) {
              if (payloadResponseASJson.results[0].value.errorMessage === '' && payloadResponseASJson.results[0].value.details) {
                var innerObject = payloadResponseASJson.results[0].value;
                if (innerObject.details.areaEmailAddress) {
                  psoContactDetails.EmailAddress = innerObject.details.areaEmailAddress
                }
                if (innerObject.details.areaName) {
                  psoContactDetails.AreaName = innerObject.details.areaName
                }
                if (innerObject.details.areaEmailAddress) {
                  psoContactDetails.EmailAddress = innerObject.details.areaEmailAddress
                }
                psoContactDetails.LocalAuthorities.push(innerObject.details.localAuthorities.map((item) => { return item }))

              }
              return psoContactDetails

            } else {
              return Boom.badRequest('There are no details in the response')
            }
           
          } else {
            return Boom.badRequest('There is issue in getting the contact details for PSO regions')
          }
        } else {
          return Boom.badRequest('Location parameters are missing')
        }
      }
      catch (error) {
        return Boom.badRequest({ error }, 'Some Issue occured in getting the data from print service')
      }
    }
  }
}