const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    generateToken: (n) => {
        var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var token = '';
        for (var i = 0; i < n; i++) {
            token += chars[Math.floor(Math.random() * chars.length)];
        }
        return token;
    },

    hash: (s) => {
        return new Promise((res, rej) => {
            bcrypt.hash(s, saltRounds, function (err, hash) {
                if (err) rej(err);
                else res(hash);
            });
        });
    },
};