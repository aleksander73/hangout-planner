import { Validation } from '../../../../src/data/validation';
import apiClient from '../../api/ApiClient';

const sameAs = (inputField, name) => new Validation(i => i === inputField.value, `Value not the same as in ${name}`);
const usernameUnique = new Validation(async i => !await apiClient.userExists(i), 'Username already exists');

export default {
    sameAs,
    usernameUnique
}
