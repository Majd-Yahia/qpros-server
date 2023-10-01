
require('./db/mongoose'); // connect to database.

const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http').Server(app);
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: 'http://localhost:3001',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',  
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(express.json());

const AuthenticationRouter = require('./routers/authentication');
app.use(AuthenticationRouter);      // define router.

http.listen(port, host, () => {
  console.log(`Socket.IO server running at http://${host}:${port}/`);
});