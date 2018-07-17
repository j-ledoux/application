
'use strict';

var nconf = require('nconf');

nconf
  .argv()
  .file('localisation', { file: __dirname+'/../config/localisation.json' })
  .file('app', { file: __dirname+'/../config/app.json' })
  ;

// Fix compatibility between NODE_ENV and ENVIRONMENT
if (process.env.ENVIRONMENT == 'dev') {
    process.env.NODE_ENV = 'development';
} else if (process.env.ENVIRONMENT == 'recette') {
    process.env.NODE_ENV = 'staging';
} else if (process.env.ENVIRONMENT == 'prod') {
    process.env.NODE_ENV = 'production';
}

// Include app's dedicated env file
var env = process.env.NODE_ENV || nconf.get('default_environment');

nconf
    .file('app' + env, { file: __dirname+'/../config/app.' + env + '.json' })
    .file('db' + env, { file: __dirname+'/../config/db.' + env + '.json' })
    ;

// Use env var to override sensitive config variables
if (typeof process.env.DATABASE_USER !== 'undefined' && nconf.get('database:username') == '*') {
    nconf.set('database:username', process.env.DATABASE_USER);
}
if (typeof process.env.DATABASE_PASSWORD !== 'undefined' && nconf.get('database:password') == '*') {
    nconf.set('database:password', process.env.DATABASE_PASSWORD);
}

module.exports = nconf;
