var floodMapTemplateArcGisUrl = function () {
    let floodMapDataURL = '';
    var floodMapTemaplateURL = 'https://fra-snd-inbound.azure.defra.cloud/arcgisserver/rest/services/fmfp/fmfp_dev_print/GPServer/Export%20Web%20Map/execute?'
    var floodMapTemplateName = 'Layout_Template=flood_map';
    var floodMapParameters = 'Web_Map_as_JSON={}'
    var floodMapFormat = 'Format=JPG';
    var outputFormat = 'f=json'
    floodMapDataURL = floodMapTemaplateURL + '&' + floodMapParameters + '&' + floodMapTemplateName + '&' + floodMapFormat + '&' + outputFormat;
    return floodMapDataURL;
}
var nodalMapTemplateArcGisUrl = function () {
    let nodalMapDataURL = '';
    var nodalMapTemplateURL = 'https://fra-snd-inbound.azure.defra.cloud/arcgisserver/rest/services/fmfp/fmfp_dev_print/GPServer/Export%20Web%20Map/execute?'
    var nodalMapTemplateName = 'Layout_Template=modelled_data_points_map';
    var nodalMapParameters = 'Web_Map_as_JSON={}'
    var nodalMapFormat = 'Format=JPG';
    var nodalFormatOutputFormat = 'f=json'
    nodalMapDataURL = nodalMapTemplateURL + '&' + nodalMapParameters + '&' + nodalMapTemplateName + '&' + nodalMapFormat + '&' + nodalFormatOutputFormat;
    return nodalMapDataURL;
}

module.exports = { floodMapTemplateArcGisUrl, nodalMapTemplateArcGisUrl };