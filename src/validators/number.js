
module.exports = function (data) {
    if (data === undefined) {
        return true;
    }

    return isNaN(data);
};
