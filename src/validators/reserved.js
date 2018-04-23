
module.exports = function (data, keywords) {
    if (data === undefined) {
        return true;
    }
    return keywords.includes(data);
};
