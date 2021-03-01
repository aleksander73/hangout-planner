import Validation from './Validation';
import apiClient from '../../api/ApiClient';

const isEmail = new Validation(i => (new RegExp(/\S+@\S+\.\S+/)).test(i), 'Invalid email');
const max = (n) => new Validation(i => i.length <= n, `Maximum length is ${n}`);
const min = (n) => new Validation(i => i.length >= n, `Minimum length is ${n}`);
const required = new Validation(i => Boolean(i.length), 'Field is required');
const sameAs = (inputField, name) => new Validation(i => i === inputField.value, `Value not the same as in ${name}`);
const simple = new Validation(i => (new RegExp(/^[a-zA-Z0-9]*$/)).test(i), 'Only letters and numbers allowed');
const usernameUnique = new Validation(async i => !await apiClient.userExists(i), 'Username already exists');

export {
    isEmail,
    max,
    min,
    required,
    sameAs,
    simple,
    usernameUnique
}
