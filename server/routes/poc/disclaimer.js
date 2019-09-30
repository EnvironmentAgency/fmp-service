const services = require('../../services');
const Boom = require('boom');

var disclaimerData = async function () {
    try {
        const result = await services.getDisclaimer();
        if (!result) {
            return Boom.badRequest('Invalid result', new Error('Error Occured'))
        }
        if (!result.rows[0].disclaimer) {
            return '';
        }
        return formatResponseDisclaimer(result.rows[0].disclaimer);
    } catch (err) {
        return Boom.badImplementation('error occured while fetching the contents data', err)
    }
}
function formatResponseDisclaimer(arrayData) {
    var arrayWithName = arrayData.map(item => item.data)
    try {
        return arrayWithName.join('\n');
    }
    catch (error) {
        console.log(error);
    }
}
module.exports = disclaimerData;