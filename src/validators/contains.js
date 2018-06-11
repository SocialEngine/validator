
module.exports = function (data, reserved) {
    if (data === undefined) {
        return true;
    }
    if (Array.isArray(data)) {
        let pass = 0;
        for (let key of data) {
            if (reserved.includes(key)) {
                pass++;
            }
        }

        return (pass !== data.length);
    }

    return !reserved.includes(data);
};
