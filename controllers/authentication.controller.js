var Applicant = require('../models/test.model');
var jwt = require('jsonwebtoken');

const ApplicantInstance = Applicant.ApplicantInstance;
const TestInstance = Applicant.TestInstance;

exports.generatetoken = (req,res) => {
    ApplicantInstance.findById (req.params.applicantID).then (applicant => {
        if(!applicant) {
            return res.status(400).send({
                message: 'Unable to generate token for applicant with ID = ' +  req.body.email
            });
        }
        var name = applicant.name;
        var email = applicant.email;
        var aptitudeTest = applicant.aptitudeTest;
        TestInstance.findById(aptitudeTest, function (err, test) {
            if (err) {
                throw err;
            }
            else if (test) {
             const tokenExpiration = JSON.parse(JSON.stringify(test.countdownMinute));
             var token = jwt.sign({
                 name,
                 email,
                 aptitudeTest
             }, 'RESTFULAPIs', 
             {
                 expiresIn: tokenExpiration + "m"
             });
             return res.json({
                 token: token 
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