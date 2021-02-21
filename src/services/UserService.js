const { User } = require('../models');
const cryptographyService = require('./CryptographyService');
const { Database } = require('../database');

class UserService {
    async getUsers(filter) {
        return Database.getInstance().getCollection('users', filter);
    }

    async getUserByUsername(username) {
        const users = await this.getUsers({ username });
        return users[0];
    }

    async registerUser(username, email, password) {
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
}

module.exports = Object.freeze(new UserService());
