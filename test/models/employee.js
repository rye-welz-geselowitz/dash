'use strict';

var expect = require('chai').expect;
var Employee = require('../../server/db/models/employee.js');
var db = require('../../server/db/_db');

function employeeModelTest(){
  var employee;
  describe('Employee Model', function () {
    /*
      Clear database and recreate tables
    */
    before(function () {
      return db.sync({force: true});
    });

    describe('name', function () {
      it('has name', function () {
        return Employee.create({
          name: 'Troublesome Tom',
        }).then(function (savedEmployee) {
          expect(savedEmployee.name).to.equal('Troublesome Tom');
        });
      });
      it('requires name', function () {
        employee = Employee.build({});
        return employee.validate()
          .then(function(result) {
            expect(result).to.be.an.instanceOf(Error);
            expect(result.message).to.contain('notNull');
          });
      });
      it('name cannot be empty', function () {
        employee=Employee.build({
          name: '',
        });
        return employee.validate()
          .then(function (result) {
            expect(result).to.be.an.instanceOf(Error);
            expect(result.message).to.contain('Validation error');
          });
      });
    });

    describe('email', function () {
      it('has email', function () {
        return Employee.create({
          name: 'Gregarious Greg',
          email: 'greg@hotmail.com',
        }).then(function (savedEmployee) {
          expect(savedEmployee.email).to.equal('greg@hotmail.com');
        });
      });
      it('must be a valid email', function () {
        employee = Employee.build({
        	name: 'Gregarious Greg',
          	email: 'GRAAAAAAAAAG'
          });
        return employee.validate()
          .then(function(result) {
            expect(result).to.be.an.instanceOf(Error);
            expect(result.message).to.contain('isEmail');
          });
      });
      it('email must be unique', function() {
        return Employee.create({
          name: 'Badass Bridget',
          email: 'b@b.com'
        }).then(function (){
          employee = Employee.build({
            name: 'Badass Bee',
            email: 'b@b.com',
          });
          return employee.save()
          .catch(function (error){
            expect(error).to.be.an.instanceOf(Error);
            expect(error.message).to.contain('Validation');
          })
        });
      });
    });

  });

}

module.exports={test: employeeModelTest}
