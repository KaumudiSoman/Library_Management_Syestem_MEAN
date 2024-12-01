const lateReturn = require('./lateReturnCron');

const initializeCrons = () => {
    lateReturn();
};

module.exports = initializeCrons;