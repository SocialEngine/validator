
module.exports = function (data, regex) {
    if (data === undefined) {
        return true;
    }
    return !data.match(regex);
};
