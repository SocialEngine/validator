/* eslint-env node, mocha */

const {describe, it} = require('mocha');
const assert = require('assert');
const Validator = require('../src/Validator');

describe('SocialEngine Breeze Validator', function () {
    const common = {
        username: 'Bob',
        username2: 'about',
        email: 'bob@bob.com',
        email2: 'bob@bob.com ()=',
        content: 'short',
        content2: 'long',
        content3: 'TesT',
        content4: '<script>',
        contains: ['one', 'two', 'three'],
        validUsername: 'iamnatio'
    };

    it('check() unchained should return true', function () {
        const v = new Validator(common);
        const check = v.check({
            validUsername: 'username'
        });
        assert(check);
    });

    it('check() multi unchained should return true', function () {
        const v = new Validator(common);
        const check = v.check({
            content2: [
                {max: 10},
                {contains: ['long']}
            ]
        });
        assert(check);
    });

    it('username() should return false on "username"', function () {
        assert(!new Validator(common).where('username').username().check());
    });

    it('username() should return false on "username2"', function () {
        assert(!new Validator(common).where('username2').username().check());
    });

    it('username() error messages should include "min" and "reserved".', function () {
        const v = new Validator(common);
        v.where('username2').username().check();
        const errors = v.getErrors();
        const messages = Object.keys(errors['username2']);
        assert((messages.includes('min') && messages.includes('reserved')));
    });

    it('email() should return true on "email"', function () {
        assert(new Validator(common).where('email').email().check());
    });

    it('email() should return false on "email2"', function () {
        assert(new Validator(common).where('email2').email().check());
    });

    it('exists() should return false', function () {
        assert(!new Validator(common).where('_email').exists().check());
    });

    it('min() should return true on "content"', function () {
        assert(new Validator(common).where('content').min(2).check());
    });

    it('max() should return false on "content2"', function () {
        assert(new Validator(common).where('content2').max(6).check());
    });

    it('regex() should return true on "content3"', function () {
        assert(new Validator(common).where('content3').regex(/^[a-zA-Z0-9_]*$/).check());
    });

    it('regex() should return false on "content4"', function () {
        assert(!new Validator(common).where('content4').regex(/^[a-zA-Z0-9_]*$/).check());
    });

    it('contains() should return false on "contains"', function () {
        assert(!new Validator(common).where('contains').contains('five').check());
    });

    it('contains() should return true on "contains"', function () {
        assert(new Validator(common).where('contains').contains('one').check());
    });
});
