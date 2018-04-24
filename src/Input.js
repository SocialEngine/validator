
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
            const theValue = this.data[name] || undefined;
            if (theValue !== undefined) {
                const response = defaultValue(theValue);
                if (response !== undefined) {
                    this.set(name, response);
                }
            }

            return null;
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
