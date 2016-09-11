process.env.NODE_ENV = 'testing';

require('./models/company').test();
require('./models/employee').test();