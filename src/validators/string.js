
module.exports = function (data) {
    if (data === undefined) {
        return false;
    }

    return (typeof data !== 'string');
};
