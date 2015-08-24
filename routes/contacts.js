/**
 * Created by Alejandro on 8/19/2015.
 */
var mongoose = require('mongoose');
var restgenerator = require('../module/simple_rest_generator');

mongoose.connect('mongodb://localhost/test', function (err) {
    console.log(err);
    if (!err) console.log('successfully connected to mongodb ... ');
    else console.log('was not able to connect to mongodb ... ');
});

var Contact = mongoose.model('contact', {
    name: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    tel: {
        type: String,
        required: true
    }
});


var router = restgenerator(Contact);

module.exports = router;
