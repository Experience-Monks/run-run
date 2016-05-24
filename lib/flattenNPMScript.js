module.exports = function flattenNPMScript(packageJSON, scriptName) {

  // this function will flatten npm script via String.replace
  var flatten = function(scriptName) {
    var REGEX_NPM_SCRIPT = /npm run ([\w\-]+)/g;
    var script = packageJSON.scripts[ scriptName ];
    var result;

    // see if this script contains npm scripts
    if(REGEX_NPM_SCRIPT.test(script)) {
      return script.replace(REGEX_NPM_SCRIPT, function(match, scriptName) {
        return flatten(scriptName);
      });  
    // otherwise just return the script
    } else {
      return script;
    }
  };

  return flatten(scriptName);
};