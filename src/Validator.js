
const Check = require('./Check');
const Input = require('./Input');
const ValidatorException = require('./ValidatorException');
const validators = require('./validators');

class Validator {
    constructor (data, options = {throwException: false, env: {}}) {
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
         * @type {{throwException: boolean, env: {}}}
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
     * @param key
     * @return {Check}
     */
    is (key) {
        return new Check(this, 'is:' + key).is(key);
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
            let data = this.data[name] === undefined ? undefined : this.data[name];
            if (this.exists.includes(name) && data === undefined) {
                continue;
            }

            const checks = this.checks[name];
            const callbacks = [];
            for (let check of checks) {
                const validation = validators[check.type];
                const failed = validation.apply(this, [
                    data,
                    check.param,
                    check.callback,
                    Validator,
                    input,
                    name
                ]);
                if (failed === true) {
                    if (errors[name] === undefined) {
                        errors[name] = {};
                    }
                    errors[name][check.type] = check.param;
                }

                if (typeof failed === 'function') {
                    callbacks.push(failed);
                }
            }

            if (errors[name] === undefined) {
                if (callbacks.length) {
                    for (let callback of callbacks) {
                        data = callback(data);
                    }
                }
                input[name] = data;
            }
        }

        this.errors = errors;
        if (this.hasErrors()) {
            if (this.options.throwException) {
                throw new ValidatorException(errors, this.data);
            }
            return false;
        }

        return new Input(input);
    }
}

exports.ValidatorException = ValidatorException;

module.exports = Validator;
