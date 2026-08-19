import mysql from 'mysql2/promise';

const conexao = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'express_bd',
    port: 3306
});

export default conexao;