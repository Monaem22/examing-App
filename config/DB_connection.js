const mongoose = require("mongoose");


const dbconnection = () => {
    mongoose.connect(process.env.DB_url, { serverSelectionTimeoutMS: 50000 })
        .then(() => {
            console.log('Connected to MongoDB')
        })
        .catch(error => console.error('Error connecting to MongoDB:', error));

};

module.exports = dbconnection;