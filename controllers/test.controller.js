var Test = require('../models/test.model.js');
var TestInstance = Test.TestInstance;

exports.create = function (req,res) {
    if (!req.body) {
        return res.status(400).send({
            message: 'Test cannot be empty'
        });
    }

    var newTest = new TestInstance({
        testTitle: req.body.testTitle,
        positionApplied: req.body.positionApplied,
        questions: req.body.questions
    });

    newTest.save(function (err,data) {
        console.log(data);
        if(err) {
            return res.send({
                message: 'New test creation failed.',
                err
            });
        }
        return res.json(data);
    });
};

exports.findall = function (req,res) {
    TestInstance.find(function (err,tests) {
        if (err) {
            res.status(500).send({
                message: 'Could not retrieve tests'
            });
        } else {
            res.send(tests);
        }
    });
};

exports.findone = function (req,res) {
    var query = req.body;
    TestInstance.findById(req.params.testID, function (err,data) {
        if (err) {
            return res.status(500).send({
                message: 'Could not retrieve test with id: ' + req.params.testID
            });
        }
        return res.json(data);
    });
};

exports.update = function (req,res) {
    //change test
    Test.findById(req.params.testID, function (err,test) {
        if (err) {
            return res.status(500).send({
                message: 'Could not retrieve test with id: ' + req.params.testID
            });
        }
        
        test.testTitle = req.body.testTitle;
        test.positionApplied = req.body.positionApplied;
        test.questions = req.body.questions;
        
        test.save(function (err,data) {
            if (err) {
                res.status(500).send({
                    message: 'Could not update aptitude test with id: ' + req.params.testID
                });
            } else {
                res.send(data);
            }
        });
    }); 
};

exports.delete = function (req, res) {
    Test.remove({
        _id: req.params.testID
    }, function (err, data) {
        if (err) {
            res.status(500).send({
                message: 'Could not delete aptitude test with id: ' + req.params.id
            });
        } else {
            res.send({
                message: 'Aptitude test succesfully deleted'
            });
        }
    });
};