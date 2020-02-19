const mysql = require('serverless-mysql');

const db = mysql({
    config: {
        host: "127.0.0.1",
        database: "sql_tweet",
        user: "root",
        password: "pass"
    }
});

exports.query = async query => {
    try {
        console.log('Querying DB...');
        const results = await db.query(query);
        await db.end();
        return results
    } catch (error) {
        return { error }
    }
};