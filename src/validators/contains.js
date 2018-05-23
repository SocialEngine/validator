
module.exports = function (data, reserved) {
    if (data === undefined) {
        return true;
    }
    return !reserved.includes(data);
};
