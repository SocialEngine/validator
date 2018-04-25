
module.exports = function (data) {
    if (data === undefined) {
        return true;
    }

    return (typeof data !== 'string');
};
