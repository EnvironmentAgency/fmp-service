const queries = require('./queries.json')
const conn = require('../../config').database.connectionString;
const localConn = require('../../config').localDatabase.localConnectionString;
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: conn
});
const localPool = new Pool({
  connectionString: localConn
});
module.exports = {
  getFloodZones: (x, y, radius) => {
    return pool.query(queries.getFloodZones, [x, y, radius])
  },
  getFloodZonesByPolygon: (polygon) => {
    return pool.query(queries.getFloodZonesByPolygon, [polygon])
  },
  isEngland: (x, y) => {
    debugger;
    console.log('localpool', pool);
    return pool.query(queries.isEngland, [x, y])
  },
  getCustomerRequestById: (id) => {
    return localPool.query(queries.getCustomerRequestById, [id])
  },
  saveCustomerRequest: ( placeOrPostcode,requestedBy, email) => {
    return localPool.query(queries.saveCustomerRequest, [ placeOrPostcode,requestedBy, email])
  },
  getReportType: (name) => {
    return localPool.query(queries.getReportType, [name])
  },
  getContents: () => localPool.query(queries.getContents),

  getDisclaimer: () => localPool.query(queries.getDisclaimer),

  getFloodMapConfirmation: () => localPool.query(queries.getFloodMapConfirmation)
}