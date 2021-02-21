const express = require('express');
const { userService } = require('../services');

const router = express.Router();
router.post('/register', async (req, res) => {
    let result = await userService.registerUser(req.body.username, req.body.email, req.body.password);
    res.sendStatus(result ? 200 : 500);
});

module.exports = router;
