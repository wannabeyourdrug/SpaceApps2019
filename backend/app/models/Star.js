const db = require('../helpers/db');
const calculate = require('../helpers/calculate');
const log = require('../helpers/log')('models.star');

const uuid = require('short-uuid');

module.exports = {
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

        return uuid.fromUUID(starUUID);
    }
};