var express = require('express');
var router = express.Router();
var test_controller = require('../controllers/test.controller.js');

router.post('/tests', test_controller.create);
router.get('/tests', test_controller.findall);
router.get('/tests/testID', test_controller.findone);
router.put('/tests/testID', test_controller.update);
router.delete('/tests/testID', test_controller.delete);

module.exports = router;