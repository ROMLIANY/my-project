const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const log4js = require('./utils/log');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use('/auth', authRoutes);

app.listen(PORT, () => {
    log4js.info("Server running on port " + PORT);
});

