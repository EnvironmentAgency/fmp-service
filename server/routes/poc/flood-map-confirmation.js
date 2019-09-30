const services = require('../../services');
const Boom = require('boom');
var floodMapConfirmationData = async function () {
  try {
    const result = await services.getFloodMapConfirmation();
    if (!result) {
      return Boom.badRequest('Invalid result', new Error('Error Occured'))
    }
    if (!result.rows[0].floodmapconfirmation) {
      return {};
    }
    return result.rows[0].floodmapconfirmation;
  } catch (err) {
    return Boom.badImplementation('error occured while floodmap for confirmation data', err)
  }
}
module.exports = floodMapConfirmationData;