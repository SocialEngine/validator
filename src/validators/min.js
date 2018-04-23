
module.exports = function (data, min) {
    if (data === undefined) {
        return true;
    }
    return (data.length < min);
};
