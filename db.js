import db from 'mysql2/promise';

const connectDB = db.createPool({
    host : 'localhost',
    user : 'root',
    password : 'admin1234',
    database : 'suho'
});

export default connectDB;