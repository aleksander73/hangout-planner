const bcryptjs = require('bcryptjs');

class CryptographyService {
    async encrypt(string) {
        const salt = await bcryptjs.genSalt();
        const encrypted = await bcryptjs.hash(string, salt);
        return encrypted;
    }
}

module.exports = Object.freeze(new CryptographyService());
