var Applicant = require('../models/test.model.js');
var ApplicantInstance = Applicant.ApplicantInstance;
var jwt = require('jsonwebtoken');

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
                message: 'Unable to retrieve applicant with ID = ' + req.params.applicantID
            });
        }
        return res.json(data);
    });
};

exports.update = (req,res) => {
    if(!req.body) {
        return res.status(400).send ({
            message: 'Update content cannot be empty'
        });
    }
    ApplicantInstance.findByIdAndUpdate (req.params.applicantID, {
            name : req.body.name,
            jobtitleApplied : req.body.jobtitleApplied,
            email : req.body.email,
            aptitudeTest : req.body.aptitudeTest,
            results : req.body.results
    }, {new: true})
    .then(applicant => {
        if(!applicant) {
            return res.status(404).send({
                message: 'Applicant not found with ID = ' + req.params.applicantID
            });
        }
        res.send(applicant);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: 'Applicant not found with ID = ' + req.params.applicantID
            });
        }
        return res.status(500).send({
            message: 'An error occured while updating applicant with ID = ' + req.params.applicantID
        });
    });
};  

exports.submitapplicanttestresult = function (req,res) {
    const tokenPayload = jwt.decode(req.params.token);
    ApplicantInstance.findByIdAndUpdate (tokenPayload.applicantID, {
        results: req.body.results
    }, {new: true})
    .then(applicant => {
        if (!applicant) {
            return res.status(404).send({
                message: 'Applicant not found with ID = ' + tokenPayload.applicantID
            });
        }
        res.send(applicant);
    }).catch (err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: 'Applicant not found with ID = ' + tokenPayload.applicantID
            });
        }
        return res.status(500).send({
            message: 'An error occured while updating applicant with ID = ' + tokenPayload.applicantID
        });
    });
};

exports.delete = function (req,res) {
    ApplicantInstance.findByIdAndRemove(req.params.applicantID)
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