var db = require('./server/db');
var Company = db.model('company');
var Employee= db.model('employee');
var Promise=require('bluebird');
var chalk=require('chalk');

var seedCompanies = function () {
    var companies = [
        {
            name: 'Orange',
            password: 'totallynotapple',
            email: 'steve@orange.com'
        },
        {
            email: 'elana@liwwa.com',
            password: 'bellie',
            name: 'Liwwa'
        },
        {
            email: 'pumpkin@patch.com',
            password: 'pumpkins',
            name: 'Pumpkin Patch'
        }
    ];
    var creatingCompanies = companies.map(function (companyObj) {
        return Company.create(companyObj);
    });

    return Promise.all(creatingCompanies);

};

var seedEmployees= function () {

    var employees = [
        {
            name: 'Bilbo Baggins',
            phone: '5554443333',
            email: 'bilbo@baggins.com',
            hireDate: 'Sat Sep 10 2016 20:04:52 GMT-0400 (EDT)'
        },
        {
            name: 'Gandalf Gray',
            phone: '1114443333',
            email: 'gandalf@wizard.com',
            hireDate: 'Sat Sep 11 2016 20:04:52 GMT-0400 (EDT)'
        }
     
    ];
    var creatingEmployees = employees.map(function (employeeObj) {
        return Employee.create(employeeObj);
    });
    return Promise.all(creatingEmployees);
};

var companyArr,
    employeeArr;

db.sync({ force: true })
    .then(function () {
        return Promise.all([seedCompanies(), seedEmployees()]);
    })
    .then(function (seedArray) {
        console.log(seedArray[1]);
        companyArr = seedArray[0];
        employeeArr = seedArray[1];
    })
    .then(function () {
        return Promise.all([
            companyArr[0].setEmployees([employeeArr[0],employeeArr[1]])
        ]);
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.exit(0);
    })
    .catch(function (err) {
        console.error(err);
        process.exit(1);
    });
