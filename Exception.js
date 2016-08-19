'use strict';

export default class Exception extends Error {
    constructor(data) {
        super();
        /* istanbul ignore next */
        if (!data.fields) throw "FIELDS REQUIRED";
        /* istanbul ignore next */
        if (!data.code)   throw "MESSAGE REQUIRED";

        this.fields  = data.fields;
        this.code    = data.code;
        this.message = data.message;
    }

    toHash() {
        return {
            fields: this.fields,
            code:   this.code
        };
    }
}
