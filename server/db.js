const mongoose = require('mongoose');
const mongoURL = process.env.MONGO_URI || 'mongodb://localhost:27017/iNotes';

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURL);
    } catch (error) {
        console.error('Failed to connect to mongo', error);
    }
};

module.exports = connectToMongo;
