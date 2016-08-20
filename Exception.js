const pointer = require('json-pointer');
const rename  = require('rename-keys');

class Exception extends Error {
    constructor(data) {
        super();
        /* istanbul ignore next */
        if (!data.fields) throw new Error('FIELDS REQUIRED');
        /* istanbul ignore next */
        if (!data.code) throw new Error('MESSAGE REQUIRED');
        const fields = pointer.dict(data.fields);

        this.fields = rename(fields, str => {
            return str.substr(1);
        });

        this.code    = data.code;
        this.message = data.message;
    }

    toHash() {
        return {
            fields : this.fields,
            code   : this.code
        };
    }
}

module.exports = Exception;
