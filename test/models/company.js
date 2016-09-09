'use strict';

var expect = require('chai').expect;
var Company = require('../../server/db/models/company.js');
var db = require('../../server/db/_db');

function companyModelTest(){
  describe('Category Model', function () {
    /*
      Clear database and recreate tables
    */
    before(function () {
      return db.sync({force: true});
    });

    describe('name field', function () {
      it('has name', function () {
        return Company.create({
          name: 'liwwa',
          email: 'elana@liwwa.com'
        }).then(function (savedCompany) {
          expect(savedCompany.name).to.equal('liwwa');
        });
      });
      it('requires name', function () {
        var company = Company.build({email: 'elana@liwwa.com'});
        return company.validate()
          .then(function(result) {
            expect(result).to.be.an.instanceOf(Error);
            expect(result.message).to.contain('notNull');
          });
      });
      it('name cannot be empty', function () {
        var company= Company.build({
          name: '',
          email: 'elana@liwwa.com'
        });

        return company.validate()
          .then(function (result) {
            expect(result).to.be.an.instanceOf(Error);
            expect(result.message).to.contain('Validation error');
          });
      });
    });

    describe('email field', function () {
      it('has email', function () {
        return Company.create({
          name: 'liwwa',
          email: 'samer@liwwa.com'
        }).then(function (savedCompany) {
          expect(savedCompany.email).to.equal('samer@liwwa.com');
        });
      });
      it('requires email', function () {
        var company = Company.build({name: 'liwwa'});
        return company.validate()
          .then(function(result) {
            expect(result).to.be.an.instanceOf(Error);
            expect(result.message).to.contain('notNull');
          });
      });
      it('email cannot be empty', function () {
        var company= Company.build({
          name: 'liwwa',
          email: ''
        });
        return company.validate()
          .then(function (result) {
            expect(result).to.be.an.instanceOf(Error);
            expect(result.message).to.contain('Validation error');
          });
      });
    });

  });

}

module.exports={test: companyModelTest}
