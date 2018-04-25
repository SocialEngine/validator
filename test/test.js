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
        content5: 'Test',
        content6: true,
        contains: ['one', 'two', 'three'],
        validUsername: 'iamnatio',
        test1: '1',
        test2: 100,
        test3: 200,
        test4: '100',
        test5: true,
        test6: 'true',
        test7: false,
        test8: undefined
    };

    it('number() should return true on "test1"', function () {
        assert(new Validator(common).where('test1').number().check());
    });

    it('number() should return true on "test2"', function () {
        assert(new Validator(common).where('test2').number().check());
    });

    it('string() should return false on "test3"', function () {
        assert(!new Validator(common).where('test2').string().check());
    });

    it('string() should return true on "test4"', function () {
        assert(new Validator(common).where('test4').string().check());
    });

    it('isTrue() should return true on "test5"', function () {
        assert(new Validator(common).where('test5').isTrue().check());
    });

    it('isTrue() should return true on "test6"', function () {
        assert(new Validator(common).where('test6').isTrue().check());
    });

    it('isTrue() should return false on "test7"', function () {
        assert(!new Validator(common).where('test7').isTrue().check());
    });

    it('any() should return false on "test8"', function () {
        assert(!new Validator(common).where('test8').any().check());
    });

    it('notEmpty() should return true on "content5"', function () {
        assert(new Validator(common).where('content5').notEmpty().check());
    });

    it('boolean() should return true on "content6"', function () {
        assert(new Validator(common).where('content6').boolean().check());
    });

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
