/**
 * Created by Alejandro on 8/19/2015.
 */
var mongoose = require('mongoose');
var schemaType = mongoose.Schema;
// todo: get the schematype and ObjectID
var restgenerator = require('../module/simple_rest_generator');

mongoose.connect('mongodb://localhost/test', function (err) {
    console.log(err);
    if (!err) console.log('successfully connected to mongodb ... ');
    else console.log('was not able to connect to mongodb ... ');
});

var Contact = mongoose.model('contact', {
    name: {
        type:String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
});

module.exports = function (app) {

    app.use('/contacts', restgenerator(Contact));
};