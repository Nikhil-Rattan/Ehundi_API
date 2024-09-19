import mysql from 'mysql2'; // Use mysql2 instead of mysql

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "Ehundi",
    port: 3010 
});

con.connect(function (err) {
    if (err) {
        console.log("Connection error:", err);
    } else {
        console.log('Connected to the database');
    }
});

export default con;