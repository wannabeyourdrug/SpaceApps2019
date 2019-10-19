const express = require('express');
let router = express.Router();

const log = require('../helpers/log')('api.system');
const validate = require('../helpers/validate');

const Star = require('../models/Star');

router.use('/create', async (req, res) => {
    try {
        let data = {
            user_id: req.session.user_id,
            name: req.body.name,
            radius: parseFloat(req.body.radius),
            mass: parseFloat(req.body.mass),
            temp: parseFloat(req.body.temp)
        };

        res.json({
            success: true,
            data: Star.create(...data)
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