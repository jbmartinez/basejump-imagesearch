'use strict';

var express = require('express');
var controller = require('./imagesearch.controller');

var router = express.Router();

router.get('/latest', controller.latest);
router.get('/:query', controller.search);

module.exports = router;
