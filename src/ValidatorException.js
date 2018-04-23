
class ValidatorException extends Error {
    constructor (message) {
        super();
        this.message = JSON.stringify({
            validator: message
        });
    }
}

module.exports = ValidatorException;
