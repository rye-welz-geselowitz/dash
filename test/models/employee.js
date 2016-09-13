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
            expect(result.message).to.contain('Validation is failed');
          });
      });
      // it('email must be unique', function() {
      //   return Employee.create({
      //     name: 'Badass Bridget',
      //     email: 'b@b.com'
      //   }).then(function (){
      //     employee = Employee.build({
      //       name: 'Badass Bee',
      //       email: 'b@b.com',
      //     });
      //     return employee.save()
      //     .catch(function (error){
      //       expect(error).to.be.an.instanceOf(Error);
      //       expect(error.message).to.contain('Validation');
      //     })
      //   });
      // });
    });

	describe('hire date', function () {
      it('has hire date', function () {
      	var date=Date.parse('Fri Sep 09 2016 17:59:21 GMT-0400 (EDT)');
        return Employee.create({
          name: 'Gregarious Greg',
          hireDate: date
        }).then(function (savedEmployee) {
          expect(savedEmployee.hireDate.toString()).to.equal('Fri Sep 09 2016 17:59:21 GMT-0400 (EDT)');
        });
      });
    });

	describe('phone number', function () {
      it('has phone number of 10 or 11 digits', function () {
        return Employee.create({
          name: 'Gregarious Greg',
          phone: '4180382999'
        })
        .then(function (savedEmployee) {
          employee=savedEmployee;
          return Employee.create({
          	name: 'Gregarious Greg',
          	phone: '14180382999'
           })
         })
         .then(function(savedEmployee){
          expect(savedEmployee.phone).to.equal('14180382999');
          expect(employee.phone).to.equal('4180382999');
        });
      });
      it('phone number only has digits', function () {
        employee = Employee.build({
        	name: 'Gregarious Greg',
          	phone: '418o382999'
          });
        return employee.validate()
          .then(function(result) {
            expect(result).to.be.an.instanceOf(Error);
            expect(result.message).to.contain('Validation error');
          });
      });
      it('phone number no longer than 11 char', function () {
        employee = Employee.build({
        	name: 'Gregarious Greg',
          	phone: '1418038299900'
          });
        return employee.validate()
          .then(function(result) {
            expect(result).to.be.an.instanceOf(Error);
            expect(result.message).to.contain('Validation error');
          });
      });
      it('phone number no shorter than 10 char', function () {
        employee = Employee.build({
        	name: 'Gregarious Greg',
          	phone: '141803829'
          });
        return employee.validate()
          .then(function(result) {
            expect(result).to.be.an.instanceOf(Error);
            expect(result.message).to.contain('Validation error');
          });
      });
    });

  });

}

module.exports={test: employeeModelTest}
