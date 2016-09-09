'use strict';
var router = require('express').Router();

router.use('/companies', require('./companies'));
router.use('/employees', require('./employees'));

router.use(function (req, res) {
    res.status(404).end();
});

module.exports = router;