const moment = require('moment')
const CONFIG = require('../config');

module.exports = class SuccessHandler {
    constructor(message){
        this.ts = moment().utc().format(CONFIG.DATE_FORMAT);
        this.data = message;
        return this.ts, this.data;
    }
}