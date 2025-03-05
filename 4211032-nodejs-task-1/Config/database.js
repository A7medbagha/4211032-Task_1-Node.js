const mongoose = require('mongoose');

const databaseConnection = () => {
    mongoose.connect(process.env.DB_URI).then((conn)=> {
    console.log(`DB Connected: ${conn.connection.host}`);
}).catch((err)=> {
    console.log(`error: ${err}`);
    process.exit(1);
});
};

module.exports = databaseConnection;