const BaseError = require('./base.error');
const {StatusCodes} = require('http-status-codes');

class DuplicateKey extends BaseError {
    constructor(entity) {
        super("Duplicate data entry", StatusCodes.CONFLICT, `${entity} exists in the database`)
    }
}

module.exports = DuplicateKey;