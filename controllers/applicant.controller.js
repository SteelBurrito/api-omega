var Applicant = require('../models/test.model.js');
var ApplicantInstance = Applicant.ApplicantInstance;

exports.create = function (req,res) {
    if (!req.body) {
        return res.status(400).send({
            message: 'Applicant cannot be empty'
        });
    }

    var newApplicant = new ApplicantInstance({
        name: req.body.name,
        jobtitleApplied: req.body.jobtitleApplied,
        email: req.body.email
    });

    newApplicant.save(function (err,data) {
        console.log(data);
        if(err) {
            return res.send({
                message: 'Applicant creation failed',
                err
            });
        }
        return res.json(data);
    });
};

exports.findall = function (req,res) {
    ApplicantInstance.find(function (err,applicants) {
        if (err) {
            res.status(500).send ({
                message: 'Could not retrieve applicants'
            });
        } else {
            res.send(applicants);
        }
    });
};

exports.findone = function (req,res) {
    ApplicantInstance.findById(req.params.applicantID, function (err,data) {
        if (err) {
            return res.status(500).send({
                message: 'Unable to retrieve applicant with ID = ' + req.params.data
            });
        }
        return res.json(data);
    });
};

exports.update = function (req,res) {
    // Change applicant details
    // Associates applicant with aptitude test
    Applicant.findById(req.params.applicantID, function (err, applicant) {
        if (err) {
            return res.status(500).send ({
                message: 'Unable to retrieve applicant with ID = ' + req.params.applicantID
            });
        }

        applicant.name = req.body.name;
        applicant.jobtitleApplied = req.body.jobtitleApplied;
        applicant.email = req.body.email;
        applicant.aptitudeTest = req.body.aptitudeTest;
        applicant.results = req.body.results;

        applicant.save (function (err,data) {
            if (err) {
                res.status(500).send ({
                    message: 'Unable to update applicant with ID = ' + req.params.applicantID
                });
            } else {
                res.send(data);
            }
        });
    });
}

exports.delete = function (req,res) {
    Applicant.findByIdAndRemove(req.params.applicantID)
    .then (applicant => {
        if (!applicant) {
            return res.status(400).send({
                message: 'Unable to find applicant with ID = ' + req.params.applicantID
            });
        }
        res.send({message: 'Applicant successfully deleted'});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: 'Unable to find applicant with ID = ' + req.params.applicantID
            });
        }
        return res.status(500).send ({
            message: 'Could not delete applicant with ID = ' + req.params.applicantID
        });
    });
}