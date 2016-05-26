var minimist = require('minimist');

var fs = require('fs');

var parsedArgs = minimist(process.argv.slice(2));
var file = parsedArgs._[ 0 ];
var contents = 'hello ' + process.env.SCRIPT;

fs.writeFileSync(file, contents, 'utf8');