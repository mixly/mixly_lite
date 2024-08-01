goog.loadJs('common', () => {

goog.require('Mixly.Config');
goog.provide('Mixly.Debug');

const { Config, Debug } = Mixly;
const { SOFTWARE } = Config;

for (let key in console) {
    if (typeof console[key] !== 'function') {
        continue;
    }
    Debug[key] = (...args) => {
        if (!SOFTWARE.debug) {
            console.log(`[${key.toUpperCase()}]`, ...args);
        } else {
            console[key](...args);
        }
    }
}

});