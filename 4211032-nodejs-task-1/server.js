const express = require('express');
const dotenv = require( 'dotenv');
const morgan = require("morgan");

dotenv.config({path: 'config.env'});
const dbConnection = require('./Config/database');
const categoryRoute = require('./routes/categoryRoute');

// connect with database
dbConnection();

const app = express();

app.use(express.json());

if(process.env.NODE_ENV == 'development'){
    app.use(morgan("dev"));
    console.log(`mode: ${process.env.NODE_ENV}`);
}

// Routes
app.use('/api/v1/categories', categoryRoute);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`The App is running Now on ${PORT}`);
});