#!/usr/bin/env node
/*
 * Converts Swagger into API Blueprint.
 */

'use strict';

var fs = require('fs');
var fury = require('fury');
var request = require('request');

var parser = require('yargs')
  .usage('Usage: $0 [options] infile')
  .example('$0 swagger.yml', 'Convert file')
  .example('$0 swagger.yml swagger.apib', 'Convert to file')
  .example('$0 \'http://example.com/swagger.json\'', 'Convert URL')
  .options('h', {alias: 'help', description: 'Show help'})
  .options('s', {describe: 'Swagger version [auto]'})
  .strict();

fury.use(require('fury-adapter-apib-serializer'));
fury.use(require('fury-adapter-swagger'));

// Take a loaded Swagger object and converts it to API Blueprint
function convert(swagger, done) {
  fury.parse({source: swagger}, function (parseErr, api) {
    if (parseErr) {
      return done(parseErr);
    }

    fury.serialize({api: api}, function (serializeErr, blueprint) {
      if (serializeErr) {
        return done(serializeErr);
      }

      done(null, blueprint);
    });
  });
}

// Run the command with the given arguments.
function run(argv, done) {
  if (!argv) {
    argv = parser.argv;
  }

  if (argv.h) {
    parser.showHelp();
    return done(null);
  }

  if (!argv._.length) {
    return done(new Error('Requires an input argument'));
  } else if (argv._.length > 2) {
    return done(new Error('Too many arguments given!'));
  }

  var input = argv._[0];
  if (input.indexOf('http://') === 0 || input.indexOf('https://') === 0) {
    request(input, function (err, res, body) {
      if (err) {
        return done(err);
      }
      convert(body, done);
    });
  } else {
    if (!fs.existsSync(input)) {
      return done(new Error('`' + input + '` does not exist!'));
    }

    fs.readFile(input, 'utf-8', function (err, content) {
      if (err) {
        return done(err);
      }

      convert(content, done);
    });
  }
}

// Run the command if this is a script, otherwise expose the run method
// as a module (useful for testing).
if (require.main === module) {
  run(null, function (err, blueprint) {
    if (err) {
      console.warn(err.toString());
      process.exit(1);
    } else if (blueprint) {
      if (parser.argv._.length === 2) {
        fs.writeFileSync(parser.argv._[1], blueprint, 'utf-8');
      } else {
        console.log(blueprint);
      }
    }
  });
} else {
  exports.run = run;
}
