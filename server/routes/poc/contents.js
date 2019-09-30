const services = require('../../services');
const Boom = require('boom');

var contentsData = async function (isinland) {
  try {
    const result = await services.getContents();
    if (!result) {
      return Boom.badRequest('Invalid result', new Error('Error Occured'))
    }
    if (!result.rows[0].contents) {
      return {};
    }
    if (isinland) {
      var dataForInlandOnly = result.rows[0].contents.filter((item) => {
        return item.isinland == true;
      });
      return formatResponseContent(dataForInlandOnly);
    }
    else {
      return formatResponseContent(result.rows[0].contents);
    }
  } catch (err) {
    return Boom.badImplementation('error occured while fetching the contents data', err)
  }
}

function formatResponseContent(arrayData) {
  var arrayWithName = arrayData.map(item => item.name)
  try {
   return arrayWithName.join('\n\n  ').toString();
  }
  catch (error) {
    console.log(error);
  }
}
module.exports = contentsData;