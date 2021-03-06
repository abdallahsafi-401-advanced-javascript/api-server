'use strict';

const express = require('express');
const app = express();
require('dotenv').config('.env');
const cors = require('cors');
const morgan = require('morgan');

// ------------  middleware ------------

// Global MiddleWare
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Routes middleware
const status404 = require('./middleware/404.js');
const status500 = require('./middleware/500.js');
const apiV1 = require('./routes/api-v1.js');

//Routes
app.use('/api/v1/', apiV1);
// ---------------------------

//test the server error
app.get('/api/v1/bad', (req, res) => {
  throw new Error('bad Request');
});

// 404 page not found
app.use('*', status404);
// 500 server error
app.use(status500);

module.exports = {
  server: app,
  start: (port) => {
    let PORT = port || process.env.PORT || 3000;
    // let PORT = process.env.PORT;

    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  },
};
