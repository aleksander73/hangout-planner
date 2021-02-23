const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

class CryptographyService {
    async encrypt(string) {
        const salt = await bcryptjs.genSalt();
        const encrypted = await bcryptjs.hash(string, salt);
        return encrypted;
    }

    async compare(string, hash) {
        return await bcryptjs.compare(string, hash);
    }

    generateToken(payload) {
        return jwt.sign(payload, process.env.JWT_SECRET);
    }

    authorize(req, res, next) {
        const token = req.cookies['authentication-token'];
        if(!token) {
            res.status(400).send('Access denied');
            return;
        }
        try {
            req.user = jwt.verify(token, process.env.JWT_SECRET);
            next();
        } catch(error) {
            res.status(400).send('Access denied');
        }
    }
}

module.exports = Object.freeze(new CryptographyService());
