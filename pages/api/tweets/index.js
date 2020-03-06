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
    if (req.query.keyword === 'None' || req.query.keyword === '') {
        const candidates_info = await db.query(escape`
        SELECT *
        FROM tweet_content JOIN tweets ON tweet_content.twitter_post_id = tweets.twitter_post_id
        WHERE tweets.twitter_id = ${req.query.id}
        `);
        res.status(200).json({candidates_info})
    } else {
        const candidates_info = await db.query(escape`
        SELECT *
        FROM tweet_content JOIN tweets ON tweet_content.twitter_post_id = tweets.twitter_post_id
        WHERE tweets.twitter_id = ${req.query.id} AND
        keyword = ${req.query.keyword}
        `);
        console.log(candidates_info);
        res.status(200).json({candidates_info})
    }

}