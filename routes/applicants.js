var express = require('express');
var router = express.Router();
var cors = require('cors');
var applicant_controller = require('../controllers/applicant.controller.js');

router.all('*', cors());
router.post('/', applicant_controller.create);
router.get('/', applicant_controller.findall);
router.get('/applicantID', applicant_controller.findone);
router.put('/applicantID', applicant_controller.update);
router.delete('/applicantID', applicant_controller.delete);

module.exports = router;