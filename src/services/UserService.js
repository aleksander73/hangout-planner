const { User } = require('../models');

class UserService {
    async registerUser(username, email, password) {
        const user = new User(username, email, password);
        return user;
    }
}

module.exports = Object.freeze(new UserService());
