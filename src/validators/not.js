/**
 * @this {Validator}
 * @param data
 * @param key
 */
module.exports = function (data, key) {
    if (this.options.env[key] === undefined) {
        throw new Error('Using a not() function with the env variable "' + key + '" set.');
    }

    if (data === undefined) {
        return true;
    }
    return (this.options.env[key] === true);
};
