const db = require('../helpers/db');
const calculate = require('../helpers/calculate');
const log = require('../helpers/log')('models.star');

const uuid = require('short-uuid');
const tranlator = uuid();

module.exports = {
    getList: async (user_id) => {
        return (await db.query(`
            select
                star_id,
                name
            from stars
            where
                user_id = $1
        `, [user_id])).rows;
    },

    load: async (star_id, user_id) => {
        star_id = tranlator.toUUID(star_id);
        return (await db.query(`
            select
                name,
                radius,
                mass,
                temp,
                chz
            from stars
            where
                star_id = $1 AND
                user_id = $2
        `, [
            star_id,
            user_id
        ])).rows[0] || null;
    },

    create: async (user_id, name, radius, mass, temp) => {
        let starUUID = uuid.uuid();
        const chz = calculate.chz(radius, temp);

        await db.query(`
            insert
            into stars
                (
                    star_id,
                    user_id,
                    name,
                    radius,
                    mass,
                    temp,
                    chz
                )
            values
                ($1, $2, $3, $4, $5, $6, $7)
        `, [
            starUUID,
            user_id,
            name,
            radius,
            mass,
            temp,
            chz
        ]);

        return tranlator.fromUUID(starUUID);
    },

    destroy: async (star_id) => {
        await db.query(`
            delete
            from stars
            where
                star_id = $1
        `, [star_id]);
    }
};