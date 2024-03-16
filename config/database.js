const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGO_URL || 'mongodb+srv://dummy123:dummy123@bitbazaar.imeimd6.mongodb.net/admin-dashboard';

const connectDB = () => {
mongoose.connect(MONGO_URL , {}
).then((con) => console.log(`Connected to MongoDB 🥳: ${con.connection.host}`))
.catch(err => console.log(err));
};

module.exports = connectDB;