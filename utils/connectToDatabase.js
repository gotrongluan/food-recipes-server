const mongoose = require('mongoose');

const connectToDatabase = async (url, onSuccess, onError) => {
    try {
        const db = await mongoose.connect(url);
        onSuccess(db);
    }
    catch(err) {
        onError(err);
    }
}

module.exports = connectToDatabase;