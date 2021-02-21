const express = require('express');
const { userService } = require('../services');

const router = express.Router();
router.post('/register', async (req, res) => {
    try {
        await userService.registerUser(req.body.username, req.body.email, req.body.password);
        res.sendStatus(200);
    } catch(error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
