var fs = require('fs');

if(!fs.existsSync('test-out')) {
  fs.mkdirSync('test-out');
}