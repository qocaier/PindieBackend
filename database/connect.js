const mongoose = require('mongoose');

const DB_URL = 'mongodb://localhost:27017/pindie';

async function connectToDatabase() {
    try {
        await mongoose.connect(DB_URL);
        console.log('������� ������������ � MongoDB')
    }
    catch (err) {
        console.log('��� ����������� MongoDB �������� ������')
        console.error(err);
    }
    await mongoose.connect(DB_URL);
}

module.exports = connectToDatabase;