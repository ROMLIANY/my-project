const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const log = require('./utils/log');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use('/auth', authRoutes);

app.get('/', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => {
  log.info(`Server running on port ${PORT}`);
});
