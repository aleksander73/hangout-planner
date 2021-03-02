const axios = require('axios');

class ApiClient {
    async userExists(username) {
        const { data } = await axios.post('/api/user/exists', { username });
        return data.exists;
    }

    async registerUser(username, email, password) {
        const { status } = await axios.post('/api/user/register', { username, email, password });
        return status === 200;
    }

    async loginUser(username, password) {
        const { status } = await axios.post('/api/user/login', { username, password });
        return status === 200;
    }
}

module.exports = Object.freeze(new ApiClient());
