var child_process = require('child_process');

for(var i = 0; i < 30; i++) {
  child_process.fork('./client');
}
