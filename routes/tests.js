var express = require('express');
var router = express.Router();
var test_controller = require('../controllers/test.controller.js');

router.post('/', test_controller.create);
router.get('/', test_controller.findall);
router.get('/testID', test_controller.findone);
router.put('/testID', test_controller.update);
router.delete('/testID', test_controller.delete);

module.exports = router;