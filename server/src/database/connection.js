const knex = require('knex');

const connection = knex({
    client: 'mysql',
    connection: {
        host: 'us-cdbr-east-02.cleardb.com',
        user: 'bcf6c7c12bd4cf',
        password: '30d91f74',
        database: 'heroku_61ecc3122c8eb1a'
    },
    useNullAsDefault: true,
});

module.exports = connection;