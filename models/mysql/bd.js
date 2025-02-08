import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'moviesdb'
});



export { connection };