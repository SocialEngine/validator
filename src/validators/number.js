
module.exports = function (data) {
    if (data === undefined) {
        return false;
    }

    return isNaN(data);
};
