const express = require('express');
let router = express.Router();

const uuid = require('short-uuid')();
const log = require('../helpers/log')('api.system');
const validate = require('../helpers/validate');

const Star = require('../models/Star');
const Planet = require('../models/Planet');

router.post('/getList', async (req, res) => {
    try {
        let data = await Star.getList(req.session.user_id || 0);
        data = data.map(star => [star.star_id = uuid.fromUUID(star.star_id), star][1]);
        res.json({
            success: true,
            data
        });
    } catch (e) {
        log(e);
        res.json({
            success: false,
            error: e.toString()
        });
    }
});

router.post('/load/:uuid', async (req, res) => {
    try {
        let star_id = req.params.uuid;

        let star = await Star.load(star_id, req.session.user_id || 0);

        if (star) {
            let planets = await Planet.loadByStar(star_id);

            res.json({
                success: true,
                data: {
                    star,
                    planets
                }
            });
        } else {
            res.json({
                success: false,
                error: 'Star not found'
            });
        }
    } catch (e) {
        log(e);
        res.json({
            success: false,
            error: e.toString()
        });
    }
});

router.post('/create', async (req, res) => {
    try {
        let planetsCount = parseInt(req.body.planets);
        let data = {
            user_id: req.session.user_id,
            name: req.body.name,
            radius: parseFloat(req.body.radius),
            mass: parseFloat(req.body.mass),
            temp: parseFloat(req.body.temp)
        };

        let star_id = await Star.create(...Object.values(data));

        let planets = [];
        for (let i = 0; i < planetsCount; i++) {
            planets.push(await Planet.create(star_id));
        }

        res.json({
            success: true,
            data: {
                star: star_id,
                planets
            }
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