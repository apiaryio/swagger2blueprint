/*
 * Converts Swagger into API Blueprint.
 */

'use strict';

var fs = require('fs');
var fury = require('fury');
var request = require('request');
var yaml = require('js-yaml');

var parser = require('yargs')
  .usage('Usage: $0 [options] infile')
  .example('$0 swagger.yml', 'Convert file')
  .example('$0 \'http://example.com/swagger.json\'', 'Convert URL')
  .example('$0 -s 2.0 swagger.yml', 'Convert Swagger 2.0 file')
  .options('s', {describe: 'Swagger version [1.2]'})
  .strict();

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

  if (argv._.length !== 1) {
    parser.showHelp();
    return done(null);
  }

  var input = argv._[0];
  if (input.indexOf('http://') === 0 || input.indexOf('https://') === 0) {
    request(input, function (err, res, body) {
      if (err) {
        return done(err);
      }
      convert(yaml.safeLoad(body), done);
    });
  } else {
    fs.readFile(input, 'utf-8', function (err, content) {
      if (err) {
        return done(err);
      }
      convert(yaml.safeLoad(content), done);
    });
  }
}

// Run the command if this is a script, otherwise expose the run method
// as a module (useful for testing).
if (require.main === module) {
  run(null, function (err, blueprint) {
    if (err) {
      console.warn(err);
      process.exit(1);
    } else {
      console.log(blueprint);
    }
  });
} else {
  exports.run = run;
}
