module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'docker',
    database: 'gobaber',
    define: {
        timestamps:  true,
        underscored: true,
        underscoredAll: true
    }
};