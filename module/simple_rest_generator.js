/**
 * Created by Alejandro on 8/19/2015.
 */
var router = require('express').Router();

module.exports = function (MongooseModel) {
    /*router.use(function(req,res,next){
            console.log('something is happening');
            next();
        });
    */
    // this callback is executed for all get requests to /contacts
    router.get('/', function (req, res) {
        // find call to mongoose
        if (req.accepts('application/json')) {
            MongooseModel.find(function (err, response) {
                if (err) {
                    res.status(500).json({message: 'Something Broke!'});
                } else {
                    res.status(200).json(response);
                }
            });
        }
        else{
            res.status(500).json({message:'header no supported'});
        }
    });

    router.get('/:id', function (req, res) {
        // find call to mongoose
        MongooseModel.findById(req.params.id, function (err, response) {
            if (err) {
                res.status(500).json({ message: 'Something Broke!' });
            } else {
                res.status(200).json(response);
            }
        });
    });

    router.post('/', function (req, res) {
        (new MongooseModel(req.body)).save(function (err, response) {
            if (err) {
                res.status(500).json({ message: 'Something Broke!' });
            } else {
                res.set('Location', 'http://localhost:3000/contacts/' + response._id);
                res.status(201).json(response);
            }
        });
    });

    router.put('/:id', function (req, res) {
        MongooseModel.findByIdAndUpdate(req.params.id, req.body, function (err, response) {
            if (err) {
                res.status(500).json({ message: 'Something Broke!' });
            } else {

                res.status(200).json({ message: 'Succesfully updated data!' });
            }
        });
    });

    router.delete('/:id', function (req, res) {
        console.log(req.params.id);
        MongooseModel.findByIdAndRemove(req.params.id, function (err, response) {
            if (err) {
                res.status(500).json({ message: 'Something Broke!' });
            } else {
                res.status(200).json({ message: 'Succesfully deleted data!' });
            }
        });
    });

    return router;
};
