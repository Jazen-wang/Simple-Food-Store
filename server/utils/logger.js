/*
 * A Logger For foodStore 
 */

var log4js = require('log4js');

log4js.configure({
  appenders: [
    {
      type: 'console',
      category: 'foodLogger'
    }
  ]
});

var logger = log4js.getLogger('foodLogger');
logger.setLevel('DEBUG');

module.exports = logger;