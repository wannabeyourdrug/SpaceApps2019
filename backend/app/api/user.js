const express = require('express');
let router = express.Router();

const log = require('../helpers/log')('api.user');

const User = require('../models/User');

router.use('/load', async (req, res) => {
    try {
        res.json({
            success: true,
            data: User.load(req.session.user_id)
        });
    } catch (e) {
        log(e);
        res.json({
            success: false,
            error: e.toString()
        });
    }
});

module.exports = router;