const Mixly = {};
Mixly.Config = {};
Mixly.Config.get = (path, defaultConfig = {}) => {
    let finalConfig = null;
    $.ajaxSettings.async = false;
    $.get(path, (config) => {
        if (typeof config === 'object')
            finalConfig = Object.assign(defaultConfig, config);
        else if (typeof config === 'string')
            try {
                finalConfig = Object.assign(defaultConfig, JSON.parse(config));
            } catch (e) {
                console.log(e);
                finalConfig = defaultConfig;
            }
        else
            finalConfig = defaultConfig;
    }).fail(() => {
        finalConfig = defaultConfig;
    });
    $.ajaxSettings.async = true;
    return finalConfig;
}

if (typeof AWConfig === 'undefined')
  var AWConfig = {};

AWConfig = Mixly.Config.get('./wiki-config.json', AWConfig);

console.log(AWConfig);
