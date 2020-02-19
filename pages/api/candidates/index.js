const db = require('../../../lib/db')
const escape = require('sql-template-strings')

module.exports = async (req, res) => {
    const tweets = await db.query(escape`
      SELECT *
      FROM candidates
      ORDER BY candidate_id
      LIMIT ${parseInt(req.query.limit)}
    `)
    res.status(200).json({ tweets })

}
