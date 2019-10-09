const Wreck = require('@hapi/wreck');
const Boom = require('boom');
const mapData = require('./mapdata')
async function getMap() {
    try {
        //URL for the Map Server
        const { res, payload } = await Wreck.get("https://fra-snd-inbound.azure.defra.cloud/arcgisserver/rest/services/fmfp/fmfp_dev_print/GPServer/Export%20Web%20Map/execute?Web_Map_as_JSON={}&Format=JPG&Layout_Template=EA_Colour_(A4-Landscape)&f=json");
        const payloadResult = JSON.parse(payload.toString());
        if (!payloadResult) {
            return Boom.badImplementation('error occuredin payload data', err);
        }
        if (!payloadResult.results) {
            return Boom.badImplementation('error occuredin payload data', err);
        }
        if (!payloadResult.results[0].value) {
            return Boom.badImplementation('error occuredin payload data', err);
        }
        if (!payloadResult.results[0].value.url) {
            return Boom.badImplementation('error occuredin getting url data', err);
        }
        var result = payloadResult.results[0].value.url;
              if (result.includes('http')) {
            return await mapData(result);
        }
        return Boom.badRequest("Some Issue occured in getting arcgis data")

    } catch (error) {
        return Boom.badRequest("Some Issue occured in getting arcgis data");
    }
}
module.exports = getMap;