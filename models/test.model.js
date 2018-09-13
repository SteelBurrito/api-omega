var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var applicantSchema = new Schema({
    name: String,
    applicationDate: Date,
    jobtitleApplied: String,
    aptitudeTest: {type: Mongoose.Schema.Types.ObjectId, ref: 'Test'},
    results: [{ question: String, answer: String}]
}, {
    timestamps: true
});

var testSchema = new Schema({
    testTitle: String,
    jobTitle: String,
    questions: [{ question: String, answers: []}]
}, {
    timestamps: true
});

var Applicant = Mongoose.model('Applicant', applicantSchema);
var Test = Mongoose.model('Test', testSchema);

module.exports = {
    ApplicantInstance: Applicant,
    TestInstance: Test
};