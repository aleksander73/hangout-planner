const dotenv = require('dotenv');
const express = require('express');
const cookieParser = require('cookie-parser');
const { validateToken } = require('./services').cryptographyService;
const { userRouter } = require('./api');
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/api/user', userRouter);

app.get('/', validateToken, (req, res) => {
    res.send(`You got through, ${ req.user.username }`);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
