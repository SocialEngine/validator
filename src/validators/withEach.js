
module.exports = function (data, seperator, callback, Validator, input, name) {
    let includes = {};
    if (data !== undefined) {
        for (let option of data.split(seperator)) {
            includes[option.trim()] = true;
        }
        const validator = new Validator(includes, this.options);
        const response = callback(validator);
        const responseInput = response.check();
        if (responseInput === false) {
            return true;
        }
        const inputs = responseInput.all();
        for (let key of Object.keys(inputs)) {
            input[name + ':' + key] = inputs[key];
        }
        return responseInput;
    }
    return true;
};
