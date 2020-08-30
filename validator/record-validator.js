const { check } = require('express-validator');

const DATE_REGEX = "((?:19|20)\\d\\d)-(0?[1-9]|1[012])-([12][0-9]|3[01]|0?[1-9])"; // YYYY-MM-DD

exports.search = [
    check('startDate').matches(DATE_REGEX),
    check('endDate').matches(DATE_REGEX),
    check('minCount').isNumeric(),
    check('maxCount').isNumeric()
];