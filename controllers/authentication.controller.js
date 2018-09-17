var Applicant = require('../models/test.model');
var jwt = require('jsonwebtoken');

const ApplicantInstance = Applicant.ApplicantInstance;
const TestInstance = Applicant.TestInstance;

exports.generatetoken = (req,res) => {
    ApplicantInstance.find ({
        email: req.body.email,
        aptitudeTest: req.body.aptitudeTest
    }).then (applicant => {
        if(!applicant) {
            return res.status(400).send({
                message: 'Unable to generate token for applicant with ID = ' +  req.body.email
            });
        }
        TestInstance.findById(applicant.aptitudeTest, function (err, test) {
            if (err) {
                throw err;
            }
            else if (test) {
             var tokenExpiration = test.countdownMinute;
             return res.json({
                 token: jwt.sign({
                     email: applicant.email,
                     aptitudeTest: applicant.aptitudeTest,
                 }, {
                     expiresIn: tokenExpiration
                 }, 'RESTFULAPIs')
             });
            }
        });
    });
}

exports.tokenrequired = (req,res,next) => {
    if (req.test) {
        next()
    } else {
        return res.status(400).json({ message: 'Unauthorized access!'});
    }
}