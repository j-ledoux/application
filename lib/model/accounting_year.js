
/*
 * Mixin that inject accounting year methods necessary for
 * dealing with abcenses.
 * */

'use strict';

var moment = require('moment');

function AccountingYear(args) {
    var me    = this;
    this.current_date = moment();

    if (args && args.hasOwnProperty('year')) {
        if (args.year._isAMomentObject) {
            this.current_date = args.year;
        } else {
            this.current_date = moment(args.year);
        }
    }

    // Ignoring argument if it corresponds to current year (fix accounting year issue)
    if (this.current_date.year() == moment().year() && this.start_at() >= moment()) {
        this.current_date = moment().subtract(1, 'year');
    }
};

AccountingYear.prototype.start_at = function(){
    var juneIndex = 5;

    return moment([this.current_date.format('YYYY'), juneIndex, 1, 0, 0, 0]);
};

AccountingYear.prototype.end_at = function(){
    var mayIndex = 4;

    return moment([parseInt(this.current_date.format('YYYY'))+1, mayIndex, 31, 0, 0, 0]);
};

module.exports = AccountingYear;