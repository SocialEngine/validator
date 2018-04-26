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
     * @return {Check}
     */
    contains (contains) {
        return this.add('contains', contains);
    }

    /**
     * @param min
     * @return {Check}
     */
    min (min) {
        return this.add('min', min);
    }

    /**
     * @param max
     * @return {Check}
     */
    max (max) {
        return this.add('max', max);
    }

    /**
     * @param regex
     * @return {Check}
     */
    regex (regex) {
        return this.add('regex', regex);
    }

    /**
     *
     * @return {Check}
     */
    username () {
        return this.add('username');
    }

    /**
     *
     * @return {Check}
     */
    email () {
        return this.add('email');
    }

    /**
     *
     * @return {Check}
     */
    url () {
        return this.add('url');
    }

    /**
     *
     * @return {Check}
     */
    array () {
        return this.add('array');
    }

    /**
     *
     * @return {Check}
     */
    exists () {
        return this.add('exists');
    }

    /**
     *
     * @return {Check}
     */
    string () {
        return this.add('string');
    }

    /**
     *
     * @return {Check}
     */
    number () {
        return this.add('number');
    }

    /**
     *
     * @return {Check}
     */
    notEmpty () {
        return this.add('exists');
    }

    /**
     *
     * @return {Check}
     */
    isTrue () {
        return this.add('isTrue');
    }

    /**
     *
     * @return {Check}
     */
    any () {
        return this.add('any');
    }

    /**
     *
     * @return {Check}
     */
    boolean () {
        return this.add('boolean');
    }

    /**
     *
     * @param item
     * @return {Check}
     */
    is (item) {
        return this.add('is', item);
    }

    /**
     *
     * @param item
     * @return {Check}
     */
    not (item) {
        return this.add('not', item);
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
     * @return {Check}
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
