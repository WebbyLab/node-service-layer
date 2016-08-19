'use strict';

const LIVR      = require('livr');
const Exception = require('./Exception');

class Base {
    constructor(args) {
        if (!args.context) throw "context required";
        this.context = args.context;
    }

    async run(params) {
        const cleanParams = await this.validate(params);
        return await this.execute(cleanParams);
    }

    validate(data) {
        // Feel free to override this method if you need dynamic validation

        // Cache validator
        const validator = this.constructor.validator || new LIVR.Validator(this.constructor.validationRules).prepare();
        this.constructor.validator = validator;

        return this._doValidationWithValidator( data, validator );
    }

    doValidation(data, rules) {
        // You can use this in overriden "validate" method
        const validator = new LIVR.Validator(rules).prepare();
        return this._doValidationWithValidator(data, validator);
    }

    _doValidationWithValidator(data, validator) {
        const result = validator.validate(data);

        if (!result) {
            const exception = new Exception({
                code   : "FORMAT_ERROR",
                fields : validator.getErrors()
            });

            return Promise.reject(exception);
        }

        return result;
    }
}

module.exports = Base;
