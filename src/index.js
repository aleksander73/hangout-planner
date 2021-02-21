const dotenv = require('dotenv');
const express = require('express');
const { userRouter } = require('./api');
dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/user', userRouter);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
