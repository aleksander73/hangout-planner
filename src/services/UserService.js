const { User } = require('../models');
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
        const user = new User(username, email, password);
        await Database.getInstance().postDocument('users', user);
    }
}

module.exports = Object.freeze(new UserService());
