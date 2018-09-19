var Applicant = require('../models/test.model');
var jwt = require('jsonwebtoken');

const ApplicantInstance = Applicant.ApplicantInstance;
const TestInstance = Applicant.TestInstance;
const fs = require('fs');

var privateKEY = fs.readFileSync('./Config/private.key', 'utf8');
var publicKEY = fs.readFileSync('./Config/public.key', 'utf8');

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
        var jobtitleApplied = applicant.jobtitleApplied;

        TestInstance.findById(aptitudeTest, function (err, test) {
            if (err) {
                throw err;
            }
            else if (test) {
             const tokenExpiration = JSON.parse(JSON.stringify(test.countdownMinute));
             var token = jwt.sign({
                 name,
                 email,
                 aptitudeTest,
                 jobtitleApplied
             }, privateKEY, 
             {
                 expiresIn: tokenExpiration + "m",
                 algorithm: 'RS256'
             });
             return res.json({
                 token: token 
             });
            }
        });
    });
};

exports.verifytoken = (req,res,next) => {
    const token = req.params.token;
    var decodedToken = jwt.decode(token);
    
    if (decodedToken.aptitudeTest == null) {
        return res.status(400).send({
            message: 'Applicant is not registered for a test. Please register applicant to an aptitude test before proceding.'
        });
    }
    else {
        TestInstance.findById(decodedToken.aptitudeTest, function (err, test) {
            if (err) {
                throw err;
            } else if (test) {
                const tokenExpiration = JSON.parse(JSON.stringify(test.countdownMinute));
                var verification = {
                    expiresIn: tokenExpiration + 'm',
                    algorithm: ['RS256']
                }
                var verified = jwt.verify(token, publicKEY, verification);
                if (verified) {
                    next()
                }
                else {
                    return res.status(400).send({
                        message: 'Token Invalid!'
                    });
                }
            }
        });
    }
}

exports.tokenrequired = (req,res,next) => {
    if (req.test) {
        next()
    } else {
        return res.status(400).json({ message: 'Unauthorized access!'});
    }
}