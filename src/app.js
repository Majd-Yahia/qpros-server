require('./db/mongoose'); // connect to database.
require('./socket'); // startup socket.

const express = require('express');
const app = express();
const http = require('http').Server(app);

app.use(express.json());

module.exports = {app, http};