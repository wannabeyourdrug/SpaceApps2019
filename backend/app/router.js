const express = require('express');

const api = require('./api');
const log = require('./helpers/log')('router');

const User = require('./models/User');

let router = express.Router();

router.post('/auth', async (req, res, next) => {
    if (req.body.login && req.body.passwd) {
        let user_id = await User.auth(req.body.login, req.body.passwd);
        if (user_id) {
            req.session.user_id = user_id;

            let token = helpers.generateToken(64);
            req.session.token = token;
            res.cookie('tkn', token);
            res.redirect(req.body.rpath ? req.body.rpath : '/');
        } else {
            next();
        }
    } else {
        next();
    }
});
router.get('/logout', (req, res, next) => {
    req.session.destroy();
    res.redirect('/login');
});

router.use('/api/', (req, res, next) => {
    if (!req.session.user_id || !req.session.token || !req.cookies.tkn || !(req.session.token == req.cookies.tkn)) {
        res.json({
            success: false,
            error: 'Not Authorized',
            redirect: '/login'
        });
    } else {
        next();
    }
});
router.use('/api/', api);

router.use(express.static(__dirname + '/../public/'));
router.use('/', express.static(__dirname + '/../public/index.html'));
router.use('*', (req, res, next) => {
    res.status(403).redirect('/#' + req.originalUrl);
});

module.exports = router;