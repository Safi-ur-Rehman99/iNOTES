const mongoose = require('mongoose');
const mongoURL = 'mongodb://localhost:27017';

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURL);
        console.log('connected to mongo successfully');
    } catch (error) {
        console.error('Failed to connect to mongo', error);
    }
};

module.exports = connectToMongo;


    