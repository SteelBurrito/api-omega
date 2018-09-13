//Import the mongoose module
var mongoose = require('mongoose');

module.exports = function () {
    mongoose.connect('mongodb://206.189.76.247/OmegaDB');
        mongoose.connection.on('error', function () {
            console.log('Could not connect to DB. Exiting now.')
            process.exit();
        })
        mongoose.connection.once('open', function () {
            console.log('Connection to DB is successful.');
        })
}