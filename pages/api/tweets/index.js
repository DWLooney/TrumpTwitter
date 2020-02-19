const db = require('../../../lib/db')
const escape = require('sql-template-strings')

module.exports = async (req, res) => {
    const candidates_info = await db.query(escape`
    SELECT *
    FROM tweets
    WHERE twitter_id = ${req.query.id}
  `);
    res.status(200).json({candidates_info})
}