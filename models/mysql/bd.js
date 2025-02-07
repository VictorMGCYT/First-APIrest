import mysql from 'mysql';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'moviesdb'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database as id', connection.threadId);
});

// Asegúrate de cerrar la conexión cuando ya no sea necesaria
process.on('SIGINT', () => {
    connection.end((err) => {
        if (err) {
            console.error('Error closing the database connection:', err.stack);
        }
        console.log('Database connection closed.');
        process.exit();
    });
});

export { connection };