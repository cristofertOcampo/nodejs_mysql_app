const mysql = require('mysql');
const {promisify} = require('util'); // Me permite convertir codigo de coldback a codigo de promesas
const {database} = require('./keys');

const pool = mysql.createPool(database); // Es tener una especie de hilos que se van ejecutando y cada uno va haciendo una tarea en secuencia

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('DATABASE CONNECTION WAS CLOSED');
        }
        if (err.code === 'ER_CON_COUNT_ERROR'){
            console.error('DATABASE HAS TO MANY CONNECTIONS');
        }
        if (err.code === 'ECONNREFUSED'){
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
    }

    if (connection) connection.release();
    console.log('DB is Connected');
    return;
})

// Promisify Pool Query
pool.query = promisify(pool.query); //Cada Vez que yo quiera hacer una consulta en la DB voy a poder utilizar async await o promesas

module.exports = pool;