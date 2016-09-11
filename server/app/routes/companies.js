var router = require('express').Router();
var db=require('../../db/');
var Company=db.model('company');
var Employee=db.model('employee');
// var Company=require('../../db/models/company');

router.get('/',function(req,res,next){
	res.send('YOU GOT ME')
})

router.post('/', function (req, res, next) {
  Company.create(req.body)
  .then(function (user) {
    res.status(201).json(user);
  })
  .catch(next);
});

router.get('/:companyId/employees', function (req, res, next) {
  console.log('req.user.id',req.user.id);
  console.log('req.params.companyId',req.params.companyId);
  if (req.user.id.toString()===req.params.companyId){
  	console.log('yay')
    Employee.findAll({where: {companyId: req.params.companyId}})
    .then(function(employees){
      res.send(employees);
    })
    .catch(next);
  }
  else{
    res.sendStatus(401);
  }
});

module.exports=router;