const sigma = 5.670367 * 10e-8;
const lsun = 3.827 * 10e26;

function lstar(r, t) {
    return 4 * Math.PI * Math.pow(radius, 2) * sigma * Math.pow(temp, 4);
}

function chz(r, t) {
    return Math.sqrt(lstar() / lsun);
}

module.exports = {
    lstar,
    chz
};