const db = require('../helpers/db');
const calculate = require('../helpers/calculate');
const log = require('../helpers/log')('models.planet');

const uuid = require('short-uuid');
const translator = uuid();

module.exports = {
    loadByStar: async (star_id) => {
        star_id = translator.toUUID(star_id);
        return (await db.query(`
            select
                planet_id,
                radius,
                mass,
                orbit,
                ms, --movment speed по орбите
                rs, --rotation speed самой планты
                angle, --наклон оси вращения
                ad, --atmospheric density
                type
            from planets
            where
                star_id = $1
        `, [star_id])).rows;
    },

    create: async (star_id) => {
        let planetUUID = uuid.uuid();

        // минимальна и максимальная масса планет в кг
        let mass = calculate.random(1.493e23, 2.4674e28);
        let radius = calculate.radius(mass);
        let orbit = calculate.random(5.791*10e7, 4.55 * 10e10);
        let type = Math.round(Math.random()) + 1;
        let ms = calculate.random(3, 50);
        let rs = calculate.random(5, 250 * 24);
        let angle = calculate.random(80);
        let ad = Math.random() > 0.3 ? calculate.random(0, 150) : 0;

        await db.query(`
            insert
            into planets
                (
                    planet_id,
                    star_id,
                    radius,
                    mass,
                    orbit,
                    type,
                    ms,
                    rs,
                    angle,
                    ad
                )
            values
                ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        `, [
            planetUUID,
            star_id,
            radius,
            mass,
            orbit,
            type,
            ms,
            rs,
            angle,
            ad
        ]);

        return translator.fromUUID(planetUUID);
    }
};