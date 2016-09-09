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

    it('has name', function () {
      return Company.create({
        name: 'liwwa',
      }).then(function (savedCompany) {
        expect(savedCompany.name).to.equal('liwwa');
      });

    });

    it('requires name', function () {
      var company = Company.build({});
      return category.validate()
        .then(function(result) {
          expect(result).to.be.an.instanceOf(Error);
          expect(result.message).to.contain('notNull');
        });
    });

    // it('name must be unique', function() {
    //   return Company.create({
    //     name: ''
    //   }).then(function (){
    //     var category = Category.build({
    //       name: 'one'
    //     });
    //     return category.save()
    //     .catch(function (error){
    //       expect(error).to.be.an.instanceOf(Error);
    //       expect(error.message).to.contain('Validation');
    //     })
    //   });
    // });

    it('name cannot be empty', function () {

      var category = Category.build({
        name: '',
      });

      return category.validate()
        .then(function (result) {
          expect(result).to.be.an.instanceOf(Error);
          expect(result.message).to.contain('Validation error');
        });
    });
  });

}

module.exports={test: companyModelTest}
