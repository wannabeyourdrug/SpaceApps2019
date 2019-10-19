const config = require('./.app.config.js');
const http = require('http');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const log = require('./app/helpers/log')('main');
const router = require('./app/router');

const app = express();
app.use(cors());
app.disable('x-powered-by');
app.use(session({
    secret: 'dskf890hn4rif803e28982bi9perh4t76yg49xm8fs4r5tu6u789we',
    name: 'sid',
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    },
    resave: false,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(router);

http.createServer(app).listen(config.server.port, () => {
    log(`Started on port`, config.server.port);
});