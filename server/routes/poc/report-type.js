const services = require('../../services');
const Boom = require('boom');

var reportTypeData = async function (reportType) {
  try {
    const data = await services.getReportType(reportType);
    if (!data) {
      return Boom.badRequest('Invalid result', new Error('Error Occured'))
    }
    if (!data.rows[0].reporttype) {
      return '';
    }
    return data.rows[0].reporttype.displayname
  }
  catch(error)
  {
    return Boom.badRequest("Some Issue occured in getting the report Type data")
  }
}
module.exports = reportTypeData;