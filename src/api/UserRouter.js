const express = require('express');
const { userService } = require('../services');

const router = express.Router();
router.post('/register', async (req, res) => {
    await userService.registerUser(req.body.username, req.body.email, req.body.password);
    res.sendStatus(200);
});

module.exports = router;
