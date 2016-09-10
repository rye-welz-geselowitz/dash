var router = require('express').Router();
var Company=require('../../db/models/company');

router.post('/', function (req, res, next) {
  Company.create(req.body)
  .then(function (user) {
    res.status(201).json(user);
  })
  .catch(next);
});

module.exports=router;