/**
 * @this {Validator}
 * @param data
 * @param key
 */
module.exports = function (data, key) {
    if (this.options.env[key] === undefined) {
        throw new Error('Using a not() function with the env variable "' + key + '" set.');
    }

    return (this.options.env[key] !== true);
};
