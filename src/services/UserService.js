const { User } = require('../models');
const cryptographyService = require('./CryptographyService');
const { Database } = require('../database');
const { inputValidations, validationHelper } = require('../data/validation');

class UserService {
    async getUsers(filter) {
        return Database.getInstance().getCollection('users', filter);
    }

    async getUserByUsername(username) {
        const users = await this.getUsers({ username });
        return users[0];
    }

    async registerUser(username, email, password) {
        if(!await this.validateUser(username, email, password)) {
            throw new Error(`Validation for user ${username} failed`);
        }
        const foundUser = await this.getUserByUsername(username);
        if(foundUser) {
            throw new Error(`Username ${username} is taken`);
        }
        const user = new User(username, email, await cryptographyService.encrypt(password));
        await Database.getInstance().postDocument('users', user);
    }

    async loginUser(username, password) {
        const foundUser = await this.getUserByUsername(username);
        if(!foundUser) {
            throw new Error('Invalid username or password');
        }
        const passwordValid = await cryptographyService.compare(password, foundUser.password);
        if(!passwordValid) {
            throw new Error('Invalid username or password');
        }
        return cryptographyService.generateToken({ username: foundUser.username });
    }

    publicize(user) {
        const { username, email } = user;
        return {
            username,
            email
        };
    }

    async validateUser(username, email, password) {
        const { usernameValidation, emailValidation, passwordValidation } = inputValidations.registration;
        const maps = [
            {
                value: username,
                validationSet: usernameValidation
            }, {
                value: email,
                validationSet: emailValidation
            }, {
                value: password,
                validationSet: passwordValidation
            }
        ];
        for(let i = 0; i < maps.length; i++) {
            const { isValid, errorMessage } = await validationHelper.validateSet(maps[i].validationSet, maps[i].value);
            console.log(errorMessage);
            if(!isValid) {
                return false;
            }
        }
        return true;
    }
}

module.exports = Object.freeze(new UserService());
