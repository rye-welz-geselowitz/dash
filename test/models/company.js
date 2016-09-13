'use strict';

var expect = require('chai').expect;
var Company = require('../../server/db/models/company.js');
var db = require('../../server/db/_db');

function companyModelTest(){
  var company;
  describe('Company Model', function () {
    /*
      Clear database and recreate tables
    */
    before(function () {
      return db.sync({force: true});
    });

    describe('name', function () {
      it('has name', function () {
        return Company.create({
          name: 'liwwa',
          email: 'elana@liwwa.com',
          password: 's0s3cr3t'
        }).then(function (savedCompany) {
          expect(savedCompany.name).to.equal('liwwa');
        });
      });
      it('requires name', function () {
        company = Company.build({email: 'elana@liwwa.com',password: 's0s3cr3t'});
        return company.validate()
          .then(function(result) {
            expect(result).to.be.an.instanceOf(Error);
            expect(result.message).to.contain('notNull');
          });
      });
      it('name cannot be empty', function () {
        company= Company.build({
          name: '',
          email: 'elana@liwwa.com',
          password: 's0s3cr3t'
        });

        return company.validate()
          .then(function (result) {
            expect(result).to.be.an.instanceOf(Error);
            expect(result.message).to.contain('Validation error');
          });
      });
    });

    describe('email', function () {
      it('has email', function () {
        return Company.create({
          name: 'liwwa',
          email: 'samer@liwwa.com',
          password: 's0s3cr3t'
        }).then(function (savedCompany) {
          expect(savedCompany.email).to.equal('samer@liwwa.com');
        });
      });
      it('requires email', function () {
        company = Company.build({name: 'liwwa',password: 's0s3cr3t'});
        return company.validate()
          .then(function(result) {
            expect(result).to.be.an.instanceOf(Error);
            expect(result.message).to.contain('notNull');
          });
      });
      it('email cannot be empty', function () {
        company= Company.build({
          name: 'liwwa',
          email: '',
          password: 's0s3cr3t'
        });
        return company.validate()
          .then(function (result) {
            expect(result).to.be.an.instanceOf(Error);
            expect(result.message).to.contain('Validation error');
          });
      });
      it('must be a valid email', function () {
        company = Company.build({name: 'liwwa',password: 's0s3cr3t',email:'dog'});
        return company.validate()
          .then(function(result) {
            expect(result).to.be.an.instanceOf(Error);
            expect(result.message).to.contain('isEmail');
          });
      });
      it('email must be unique', function() {
        return Company.create({
          name: 'liwwa',
          email: 'david@liwwa.com',
          password: 's0s3cr3t'
        }).then(function (){
          company = Company.build({
            name: 'liwwa2',
            email: 'david@liwwa.com',
            password: 's0s3cr3t'
          });
          return company.save()
          .catch(function (error){
            expect(error).to.be.an.instanceOf(Error);
            expect(error.message).to.contain('Validation');
          })
        });
      });
    });
    describe('password', function () {
        it('requires password', function () {
          company = Company.build({name: 'White House',email: 'obama@whitehouse.com'});
          return company.validate()
            .then(function(result) {
              expect(result).to.be.an.instanceOf(Error);
              expect(result.message).to.contain('notNull');
            });
        });

      });
  });

}

module.exports={test: companyModelTest}
