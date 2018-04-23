let file = null;
try {
    file = require('@socialengine/breeze-eslint/.eslintrc');
} catch (e) {
    file = require('../breeze-eslint/.eslintrc');
}
module.exports = file;
