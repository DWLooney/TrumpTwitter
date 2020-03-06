const db = require('../../../lib/db')
const escape = require('sql-template-strings')

// Potential options for request (req):
// - WHERE DATE > {req.dates}
// - AND DATE < {req.dates}
// - AND primary_term  = {req.primary_terms}
// - AND secondary_term = {req.secondary_terms}
// - ORDER BY {req.order}
// - Need default values for all
module.exports = async (req, res) => {
    console.log(req.query.keyword);
    if (req.query.keyword === 'None') {
        const candidates_info = await db.query(escape`
        SELECT *
        FROM tweets
        WHERE twitter_id = ${req.query.id}
        `);
        res.status(200).json({candidates_info})
    } else {
        const candidates_info = await db.query(escape`
        SELECT *
        FROM tweets
        WHERE twitter_id = ${req.query.id} AND
        primary_term = ${req.query.keyword}
        `);
        console.log(candidates_info);
        res.status(200).json({candidates_info})
    }

}