function log(mod = 'logger') {
    return (...data) => {
        console.log(`[${mod}]`, ...data);
    }
}

module.exports = log;