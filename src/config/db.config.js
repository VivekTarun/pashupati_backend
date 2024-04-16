const mongoose = require('mongoose');
const { DB_URL, NODE_ENV } = require('./server.config');

async function connectToDB() {
    try {
        if (NODE_ENV == "development") {
            await mongoose.connect(DB_URL);
            console.log("Successfully connected Database");
        }
    } catch (error) {
        console.log("Unable to connect to the Database");
        console.log(error);
    }
}

module.exports = connectToDB;