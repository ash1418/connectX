const mongoose = require('mongoose');

mongoose.connect("mongodb://0.0.0.0:27017/codial_development",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family:4
});

const db=mongoose.connection;

db.on('error', console.error.bind(console,"Error connecting to mongoDB"));


db.once('open', function()
{
    console.log('Successfully connected to the database');

});

module.exports = db;