'use strict';

var expect = require('chai').expect;
var Company = require('../../server/db/models/company.js');
var db = require('../../server/db/_db');

function companyModelTest(){
  console.log('testing company')
}

module.exports={test: companyModelTest}
