var path = require('path');
var fs = require('fs');
var spawn = require('cross-spawn');
var minimist = require('minimist');
var getStdin = require('get-stdin');

var getPipedData = require('./getPipedData');
var parseEnvVariables = require('./parseEnvVariables');
var isNPMScript = require('./isNPMScript');
var flattenFromScriptName = require('./flattenFromScriptName');
var flattenFromScript = require('./flattenFromScript');
var injectEnvIntoScripts = require('./injectEnvIntoScripts');
var injectArgsIntoScripts = require('./injectArgsIntoScripts');


module.exports = function() {
  // check if there was data which was piped to node
  getStdin()
  .then(function(pipedData) {
    var npmArgs = JSON.parse(process.env.npm_config_argv).original;
    var argsParsed = minimist(process.argv.slice(2));
    var pathPackageJSON = path.join(process.cwd(), 'package.json'); // since npm runs this it will be the folder where package.json exists  
    var scriptAndEnv = argsParsed._.slice();
    var env = parseEnvVariables(scriptAndEnv, pipedData);
    var scriptRun;
    
    if(scriptAndEnv.length > 1) {
      throw new Error('You did not pass an npm script to run');
    } else {
      scriptRun = scriptAndEnv[ 0 ];
    }

    // read in package.json
    fs.readFile(pathPackageJSON, 'utf8', function(err, contents) {
      var packageJSON = JSON.parse(contents);
      var scripts = packageJSON.scripts;
      var npmScript;

      // flatten npmScript
      if(isNPMScript(scriptRun)) {
        npmScript = flattenFromScript(packageJSON, scriptRun);
      } else {
        npmScript = flattenFromScriptName(packageJSON, scriptRun);
      }

      // lob off the call to run-run
      npmScript = npmScript.replace(/.*run-run(;| && | -- )/, '');

      // inject environment variables
      npmScript = injectEnvIntoScripts(npmScript, env);

      // inject args
      npmScript = injectArgsIntoScripts(npmScript, argsParsed);

      // run the flattened npm script after injecting environment variables
      runFlattenedScript(npmScript);
    });
  });
};

function runFlattenedScript(script) {
  var isWin = /^win/.test(process.platform);
  var proc;

  if(!isWin) {
    proc = spawn('sh', ['-c', script], {
      env: process.env,
      cwd: process.cwd()
    });
  } else {
    proc = spawn('cmd', ['/c', script], {
      env: process.env,
      cwd: process.cwd()
    });
  }

  proc.stdout.pipe(process.stdout);
  proc.stderr.pipe(process.stdout);
}