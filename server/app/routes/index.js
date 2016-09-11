'use strict';
var router = require('express').Router();

router.use(function(req,res,next){
	if(!req.user){
		res.sendStatus(401);
	}
})

router.use('/companies', require('./companies'));
router.use('/employees', require('./employees'));

router.use(function (req, res) {
    res.status(404).end();
});

module.exports = router;