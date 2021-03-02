const dotenv = require('dotenv');
const express = require('express');
const cookieParser = require('cookie-parser');
const { userRouter } = require('./api');
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/api/user', userRouter);
app.use(express.static(__dirname + '/../public'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
