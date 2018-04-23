
module.exports = function (data, max) {
    if (data === undefined) {
        return true;
    }
    return (data.length > max);
};
