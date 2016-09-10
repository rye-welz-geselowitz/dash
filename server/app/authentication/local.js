//TODO: clean up comments
'use strict';
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function (app, db) {
    var Company = require('../../db/models/company.js');
    // When passport.authenticate('local') is used, this function will receive
    // the email and password to run the actual authentication logic.
    var strategyFn = function (email, password, done) {
        Company.findOne({
                where: {
                    email: email
                }
            })
            .then(function (company) {
                if (!company || !company.correctPassword(password)) {
                    done(null, false);
                } else {
                    // Properly authenticated.
                    done(null, company);
                }
            })
            .catch(done);
    };

    passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'}, strategyFn));

    // A POST /login route is created to handle login.
    app.post('/login', function (req, res, next) {

        var authCb = function (err, company) {
            if (err) return next(err);
            if (!company) {
                var error = new Error('Invalid login credentials.');
                error.status = 401;
                return next(error);
            }
            // req.logIn will establish our session.
            req.logIn(company, function (loginErr) {
                if (loginErr) return next(loginErr);
                // We respond with a response object that has user with _id and email.
                res.status(200).send({
                    company: company.sanitize()
                });
            });
        };
        passport.authenticate('local', authCb)(req, res, next);

    });

};
