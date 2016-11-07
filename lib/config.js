
'use strict';

var nconf = require('nconf');

nconf
  .argv()
  .file('localisation', { file: __dirname+'/../config/localisation.json' })
  .file('app', { file: __dirname+'/../config/app.json' })
  ;

// Include app's dedicated env file
var env = process.env.NODE_ENV || nconf.get('default_environment');

nconf
    .file('app' + env, { file: __dirname+'/../config/app.' + env + '.json' })
    .file('db' + env, { file: __dirname+'/../config/db.' + env + '.json' })
    ;

module.exports = nconf;
