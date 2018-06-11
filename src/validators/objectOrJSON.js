
module.exports = function (data) {
    if (typeof data === 'object') {
        return false;
    }

    if (typeof data === 'string') {
        try {
            data = JSON.parse(data);
            return function () {
                return data;
            };
        } catch (e) {
            return true;
        }
    }

    return true;
};
