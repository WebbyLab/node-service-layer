const LIVR      = require('livr');
const Exception = require('./Exception');

class Base {
    constructor(args) {
        if (!args.context) throw new Error('CONTEXT_REQUIRED');
        this.context = args.context;
    }

    run(params) {
        return this.validate(params).then(cleanParams => {
            return this.execute(cleanParams)
        });
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
                code   : 'FORMAT_ERROR',
                fields : validator.getErrors()
            });

            return Promise.reject(exception);
        }

        return Promise.resolve(result);
    }
}

module.exports = Base;
