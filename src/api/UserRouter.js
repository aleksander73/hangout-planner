const express = require('express');
const { userService } = require('../services');

const router = express.Router();
router.post('/register', async (req, res) => {
    let registered = await userService.registerUser(req.body.username, req.body.email, req.body.password);
    registered ? res.sendStatus(200) : res.send(500, "Username already exists!");
});

module.exports = router;
