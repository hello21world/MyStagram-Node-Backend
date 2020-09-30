const moment = require('moment')
const CONFIG = require('../config');

module.exports = class ErrorHandler {
    constructor(error){
        this.ts = moment().utc().format(CONFIG.DATE_FORMAT);
        this.code = error.code;
        this.error = error.message ? error.message : error;
        return this.ts, this.error;
    }
}