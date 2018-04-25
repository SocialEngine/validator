
module.exports = function (data) {
    if (data === undefined) {
        return true;
    }
    return (data !== true && data !== 'true');
};
