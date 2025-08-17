const log4js = require('log4js');

log4js.configure({
    appenders: { out: { type: 'console' } },
    categories: { default: { appenders: ['out'], level: 'info' } }
});

module.exports = log4js.getLogger();
