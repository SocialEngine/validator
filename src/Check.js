const validators = require('./validators');

class Check {
    /**
     *
     * @memberOf breeze-validator
     * @param validator {Validator}
     * @param name
     */
    constructor (validator, name) {
        /**
         * @private
         * @type {Validator}
         */
        this.validator = validator;
        /**
         * @private
         */
        this.name = name;
    }

    /**
     * @param contains
     * @return {Validator}
     */
    contains (contains) {
        return this.add('contains', contains);
    }

    /**
     * @param min
     * @return {Validator}
     */
    min (min) {
        return this.add('min', min);
    }

    /**
     * @param max
     * @return {Validator}
     */
    max (max) {
        return this.add('max', max);
    }

    /**
     * @param regex
     * @return {Validator}
     */
    regex (regex) {
        return this.add('regex', regex);
    }

    /**
     *
     * @return {Validator}
     */
    username () {
        return this.add('username');
    }

    /**
     *
     * @return {Validator}
     */
    email () {
        return this.add('email');
    }

    /**
     *
     * @return {Validator}
     */
    url () {
        return this.add('url');
    }

    /**
     *
     * @return {Validator}
     */
    array () {
        return this.add('array');
    }

    /**
     *
     * @return {Validator}
     */
    exists () {
        return this.add('exists');
    }

    /**
     *
     * @return {Validator}
     */
    string () {
        return this.add('string');
    }

    /**
     *
     * @return {Validator}
     */
    number () {
        return this.add('number');
    }

    /**
     *
     * @return {Validator}
     */
    notEmpty () {
        return this.add('exists');
    }

    /**
     *
     * @return {Validator}
     */
    boolean () {
        return this.add('boolean');
    }

    /**
     *
     * @param name
     * @return {Check}
     */
    where (name) {
        return this.validator.where(name);
    }

    /**
     *
     * @param name
     * @return {Check}
     */
    ifExists (name) {
        return this.validator.ifExists(name);
    }

    /**
     * @private
     * @param type
     * @param param
     * @return {Validator}
     */
    add (type, param = null) {
        if (this.validator.checks[this.name] === undefined) {
            this.validator.checks[this.name] = [];
        }

        if (validators[type] === undefined) {
            console.log('Failed validator:', type);
            return this;
        }

        const validator = validators[type];
        if (typeof validator === 'object') {
            for (let check of Object.keys(validator)) {
                this.add(check, validator[check]);
            }
        } else {
            this.validator.checks[this.name].push({
                type: type,
                param: param
            });
        }
        return this;
    }

    /**
     *
     * @param checks
     * @return {Input|boolean}
     */
    check (checks = null) {
        return this.validator.check(checks);
    }
}

module.exports = Check;
