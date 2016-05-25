var flatten = require('./flatten');

module.exports = function flattenNPMScript(packageJSON, scriptName) {
  
  return flatten(packageJSON, scriptName);
};