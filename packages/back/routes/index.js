const express = require('express');
const app = express();

const customers = require('./customers');
app.use('/customers', customers);

module.exports = app;
