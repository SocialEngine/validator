
module.exports = function (data) {
    if (data === undefined) {
        return true;
    }

    if (data === null) {
        return false;
    }

    return (typeof data !== 'string');
};
