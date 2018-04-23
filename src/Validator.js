
const Check = require('./Check');
const Input = require('./Input');
const ValidatorException = require('./ValidatorException');
const validators = require('./validators');

class Validator {
    constructor (data, options = {throwException: false}) {
        /**
         * @private
         */
        this.data = data;

        /**
         * @protected
         * @type {{}}
         */
        this.checks = {};

        /**
         * @private
         * @type {{}}
         */
        this.errors = {};

        /**
         * @private
         * @type {{throwException: boolean}}
         */
        this.options = options;

        /**
         *
         * @type {Array}
         */
        this.exists = [];
    }

    /**
     *
     * @param name
     * @return {Check}
     */
    where (name) {
        return new Check(this, name);
    }

    /**
     *
     * @param name
     * @return {Check}
     */
    ifExists (name) {
        this.exists.push(name);
        return new Check(this, name);
    }

    /**
     *
     * @return {{}}
     */
    getErrors () {
        return this.errors;
    }

    /**
     *
     * @return {number}
     */
    hasErrors () {
        return Object.keys(this.errors).length;
    }

    getChecks () {
        return this.checks;
    }

    /**
     *
     * @param checks
     * @return {Input|boolean}
     */
    check (checks = null) {
        if (checks !== null) {
            for (let check of Object.keys(checks)) {
                const where = this.where(check);
                let value = checks[check];
                if (!Array.isArray(value)) {
                    value = [value];
                }
                value.forEach(method => {
                    if (typeof method === 'string') {
                        where.add(method);
                    } else {
                        const k = Object.keys(method)[0];
                        const v = Object.values(method)[0];
                        where.add(k, v);
                    }
                });
            }
        }

        let errors = {};
        let input = {};
        for (let name of Object.keys(this.checks)) {
            const data = this.data[name] || undefined;
            if (this.exists.includes(name) && data === undefined) {
                continue;
            }

            const checks = this.checks[name];
            for (let check of checks) {
                const validation = validators[check.type];
                const failed = validation(data, check.param);
                if (failed === true) {
                    if (errors[name] === undefined) {
                        errors[name] = {};
                    }
                    errors[name][check.type] = check.param;
                }
            }

            if (errors[name] === undefined) {
                input[name] = data;
            }
        }

        this.errors = errors;
        if (this.hasErrors()) {
            if (this.options.throwException) {
                throw new ValidatorException(errors);
            }
            return false;
        }

        return new Input(input);
    }
}

exports.ValidatorException = ValidatorException;

module.exports = Validator;
