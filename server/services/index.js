const queries = require('./queries.json')
const conn = require('../../config').database.connectionString
console.log('connection string is ',conn);
const { Pool } = require('pg')
const pool = new Pool({
  connectionString: conn
});

module.exports = {
  getFloodZones: (x, y, radius) => {
    return pool.query(queries.getFloodZones, [x, y, radius])
  },
  getFloodZonesByPolygon: (polygon) => {
    return pool.query(queries.getFloodZonesByPolygon, [polygon])
  },
  isEngland: (x, y) => {
    return pool.query(queries.isEngland, [x, y])
  },
  getCustomerById:(id)=>{
     return pool.query(queries.getCustomerById,[id])
    }
}