const sigma = 5.670367 * 10e-8;
const lsun = 3.827 * 10e26;

const eradius = 6371;
const emass = 5.976 * 10e24;

const k1 = 0.20945;
const k2 = 0.0804;
const k3 = 0.394;

function lstar(r, t) {
    return 4 * Math.PI * Math.pow(r, 2) * sigma * Math.pow(t, 4);
}

function chz(r, t) {
    return Math.sqrt(lstar(r * 1e3, t) / lsun);
}

function radius(mass) {
    return Math.pow(10, k1 + 1/3 * Math.log10(mass / emass) - k2 * Math.pow(mass / emass, k3));
}

function mass(radius) {
    let rel = radius / eradius;
    if (rel > 1.5) return 3.24 * Math.pow(rel, 0.8) * emass;
    else return 1.08 * Math.pow(rel, 3.45) * emass;
}

function random(a, b = null) {
    if (b === null) {
        b = a;
        a = 0;
    }
    return Math.random() * (b - a) + a;
}

module.exports = {
    lstar,
    chz,
    mass,
    radius,
    random
};