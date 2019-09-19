const queries = require('./queries.json')
const conn = require('../../config').database.connectionString;
debugger;
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
    console.log('localpool',pool);
    return pool.query(queries.isEngland, [x, y])
  },
  getcustomerRequestInformationById: (id) => {
    return localPool.query(queries.getcustomerRequestInformationById, [id])
  },
  createCustomerRequest: (location,requestedBy,Reference) => {
    return localPool.query(queries.createCustomerRequest, [location,requestedBy,Reference])
  },
  getProduct4ReportType: (name) => {
    return localPool.query(queries.getProduct4ReportType, [name])
  },
  getContents: () => localPool.query(queries.getContents),

  getFloodMapConfirmation: () => localPool.query(queries.getFloodMapConfirmation)
}