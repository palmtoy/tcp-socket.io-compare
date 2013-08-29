var child_process = require('child_process');

var idx = process.argv[2]
  , pCnt = parseInt(process.argv[3]);

var pathDict = {1: 'socket.io', 2: 'tcp'};
var tmpPath = pathDict[idx];

var destPath = './' + tmpPath + '/client/client';
console.log(destPath + ' is runnging ...');

for(var i = 0; i < pCnt; i++) {
  child_process.fork(destPath);
}
