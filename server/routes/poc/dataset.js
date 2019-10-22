const Boom = require('boom');
const Wreck = require('@hapi/wreck');
const Joi = require('joi');
const arcgis = require('./external/arcgis');
const reportTypeData = require('./report-type');
const customerRequestData = require('./customer');
const contentsData = require('./contents');
const disclaimerData = require('./disclaimer');
const floodMapConfirmationData = require('./flood-map-confirmation');
const arcgisUrl = require('../../../config/arcgis-template')

module.exports = {
  method: 'POST',
  path: '/poc/dataset',
  options: {
    description: 'Fetches the data from all the static and dynamic tables',
    handler: async (request, h) => {
      var Response = { ReportTypeName: {}, CustomerReference: {}, 'Product4(Detailed Flood Risk)': {}, 'Requested By': {}, 'Date Requested': {}, ContentListData: '', Disclaimer: '', FloodMapConfirmation: '', floodMap: '', nodalPointsMap: '' };
      try {

        //Report Type Data
        var reportType = request.payload.isinland ? 'Inland' : 'Coastal';
        Response.ReportTypeName = await reportTypeData(reportType);

        //Content Headings
        var contentData = await contentsData(request.payload.isinland);

        Response.ContentListData = contentData;

        //Disclaimer data
        Response.Disclaimer = await disclaimerData();


        //FloodMap ConfirmationData
        Response.FloodMapConfirmation = await floodMapConfirmationData();

        //Flood Map Extract
        try {
          const floodmapData = await arcgis(arcgisUrl.floodMapTemplateArcGisUrl());
          Response.floodMap = floodmapData;
        } catch (ex) {
          throw Boom.badImplementation('There occured an error in getting floodmap from Arcgis');
        }

        //Nodal Map 
        try {
          const nodalPointsData = await arcgis(arcgisUrl.nodalMapTemplateArcGisUrl());
          Response.nodalPointsMap = nodalPointsData;
        } catch (ex) {
          throw Boom.badImplementation('There occured an error in getting nodalPoints from Arcgis');
        }
        return Response;
      }
      catch (err) {
        return Boom.badImplementation('error occured while fetching the contents data', err)
      }
    }
  }
}