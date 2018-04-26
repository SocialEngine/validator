
class Input {
    constructor (data) {
        /**
         * @private
         */
        this.data = data;
    }

    /**
     *
     * @param name
     * @param value
     * @return {Input}
     */
    set (name, value = null) {
        if (typeof name === 'object') {
            for (let key of Object.keys(name)) {
                this.data[key] = name[key];
            }
            return this;
        }
        this.data[name] = value;
        return this;
    }

    del (name) {
        delete this.data[name];
        return this;
    }

    get (name, defaultValue = null) {
        if (typeof defaultValue === 'function') {
            let response = this.data[name] || undefined;
            if (response === undefined) {
                response = defaultValue(response);
                if (response !== undefined) {
                    this.set(name, response);
                }
            }

            return response;
        }

        return this.data[name] || defaultValue;
    }

    with (...params) {
        let object = {};
        for (let param of params) {
            object[param] = this.get(param);
        }
        return object;
    }

    all () {
        return this.data;
    }
}

module.exports = Input;
