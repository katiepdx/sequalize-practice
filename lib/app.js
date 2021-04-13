const express = require('express');
const app = express();

app.use(express.json());
app.use('/api/v1/players', require('./controllers/players'));
app.use('/api/v1/positions', require('./controllers/positions'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
