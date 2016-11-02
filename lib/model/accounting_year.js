
/*
 * Mixin that inject accounting year methods necessary for
 * dealing with abcenses.
 * */

'use strict';

var moment = require('moment');

function AccountingYear(args) {
    var me    = this;
    this.year = moment();

    if (args && args.hasOwnProperty('year')) {
        if (args.year._isAMomentObject) {
            this.year = args.year;
        } else {
            this.year = moment(args.year);
        }
    }
};

AccountingYear.prototype.start_at = function(){
    var juneIndex = 5;

    return moment([this.year.format('YYYY'), juneIndex, 1, 0, 0, 0]);
};

AccountingYear.prototype.end_at = function(){
    var mayIndex = 4;

    return moment([parseInt(this.year.format('YYYY'))+1, mayIndex, 31, 0, 0, 0]);
};

module.exports = AccountingYear;