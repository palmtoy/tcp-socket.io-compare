var util = require('util');

var iId = 0;

var totalCnt = 5
  , cnt = 0
  , intervalId = 0;

var sendMessage = function(message) {
  console.log('%j ~ sendMessage : %j', cnt, message);
};

var flush = function() {
  intervalId = setInterval(function() {
    sendMessage('hi, baby');
    if (++cnt >= totalCnt) {
      console.log('B ~ intervalId = ', util.inspect(intervalId, { showHidden: true, depth: null }));
      clearInterval(intervalId);
    }
  }, 500);
  console.log('A ~ intervalId = ', JSON.stringify(intervalId));
};

flush();
