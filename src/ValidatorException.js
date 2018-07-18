
class ValidatorException extends Error {
    constructor (message, data) {
        super();
        this.message = JSON.stringify({
            validator: message
            // validatorData: data
        });
    }
}

module.exports = ValidatorException;
