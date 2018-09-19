var express = require('express');
var router = express.Router();
var cors = require('cors');
var test_controller = require('../controllers/test.controller.js');
var authentication_controller = require('../controllers/authentication.controller.js');

router.all('*', cors());
router.post('/', test_controller.create);
router.get('/', test_controller.findall);
router.get('/:testID', test_controller.findone);
router.get('/applicant-aptitude-test/:token', authentication_controller.verifytoken, test_controller.assigntest);
router.put('/:testID', test_controller.update);
router.delete('/:testID', test_controller.delete);

module.exports = router;