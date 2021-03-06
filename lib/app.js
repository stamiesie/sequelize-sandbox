const express = require('express');
const app = express();

app.use(express.json());

// add controller routes here
app.use('/api/v1/studios', require('./controllers/studios'));


app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
