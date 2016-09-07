class Exception extends Error {
    constructor(data) {
        super();
        if (!data.fields) throw new Error('FIELDS_REQUIRED');
        if (!data.code) throw new Error('MESSAGE_REQUIRED');

        this.fields = data.fields;
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
