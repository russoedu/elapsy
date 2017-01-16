const Elapsy = require('./elapsy');

const elapsy = new Elapsy(new Date());

setTimeout(function() {
  for (let i = 0; i < 10000000000000000000; i += 1) {
    elapsy.log();
    if (i % 100000 === 0) {
      console.log('');
    }
  }
}, 100);