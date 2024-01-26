import mysql from 'mysql2';

const connection = await mysql.createConnection({
	host: 'localhost',
	user: 'root',
	database: 'next',
});
