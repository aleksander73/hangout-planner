const Validation = require('./Validation');

const isEmail = new Validation(i => (new RegExp(/\S+@\S+\.\S+/)).test(i), 'Invalid email');
const max = (n) => new Validation(i => i.length <= n, `Maximum length is ${n}`);
const min = (n) => new Validation(i => i.length >= n, `Minimum length is ${n}`);
const required = new Validation(i => Boolean(i.length), 'Field required');
const simple = new Validation(i => (new RegExp(/^[a-zA-Z0-9]*$/)).test(i), 'Only letters and numbers allowed');

module.exports = {
    isEmail,
    max,
    min,
    required,
    simple
};
