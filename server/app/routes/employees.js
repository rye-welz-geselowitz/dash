var router = require('express').Router();
var Employee=require('../../db/models/employee');

var utils=require('./utils')

utils.ensureLoggedIn(router);

router.param('id', function (req, res, next, id) {
  Employee.findById(id)
  .then(function (employee) {
    if (!employee){
    	res.sendStatus(404);
    }
    if(employee.companyId!==req.user.id){
    	res.sendStatus(401);
    }
    req.requestedEmployee = employee;
    next();
  })
  .catch(next);
});

router.post('/new', function (req, res, next) {
  var employeeInfo=req.body;
  employeeInfo.companyId=req.user.id;
  Employee.create(employeeInfo)
  .then(function (employee) {
    res.json(employee);
  })
  .catch(next);
});

router.get('/:id', function (req, res, next) {
  res.json(req.requestedEmployee); //how to catch error??
});

router.put('/:id', function (req, res, next) {
  req.requestedEmployee.update(req.body)
  .then(function (employee) {
    res.json(employee);
  })
  .catch(next);
});

router.delete('/:id', function (req, res, next) {
  req.requestedEmployee.destroy()
  .then(function () {
    res.status(204).end();
  })
  .catch(next);
});

module.exports=router;