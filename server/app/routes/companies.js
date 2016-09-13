var router = require('express').Router();
var db=require('../../db/');
var Company=db.model('company');
var Employee=db.model('employee');
var utils=require('./utils')



router.post('/', function (req, res, next) {
  Company.create(req.body)
  .then(function (user) {
    res.status(201).json(user);
  })
  .catch(next);
});

utils.ensureLoggedIn(router);

router.put('/:id',function(req,res,next){
  Company.findById(req.params.id)
  .then(function(company){
    console.log('HERE',company)
    return company.update(req.body);
  })
  .then(function(company){
    res.send(company);
  })
  .catch(next);
})

router.get('/:companyId/employees', function (req, res, next) {
  console.log('hitting route');
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