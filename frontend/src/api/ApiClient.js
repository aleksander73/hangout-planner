const axios = require('axios');

class ApiClient {
    async userExists(username) {
        const { data } = await axios.post('/api/user/exists', { username });
        return data.exists;
    }

    async registerUser(username, email, password) {
        try {
            const { status } = await axios.post('/api/user/register', { username, email, password });
            return status === 200;
        } catch(error) {
            return false;
        }
    }

    async loginUser(username, password) {
        try {
            const { status } = await axios.post('/api/user/login', { username, password });
            return status === 200;
        } catch (error) {
            return false;
        }
    }

    async whoami() {
        try {
            const { data } = await axios.get('/api/user/whoami');
            return data.user;
        } catch(error) {
            return undefined;
        }
    }
}

module.exports = Object.freeze(new ApiClient());
