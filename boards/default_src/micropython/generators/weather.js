export const WEATHER_NOW = function (_, generator) {
    generator.definitions_['import_seniverse_api'] = "import seniverse_api";
    var dropdown_mode = this.getFieldValue('mode');
    var key = generator.valueToCode(this, 'key', generator.ORDER_ATOMIC);
    var addr = generator.valueToCode(this, 'addr', generator.ORDER_ATOMIC);
    var code = 'seniverse_api.' + dropdown_mode + '(' + key + ',' + addr + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const WEATHER_DAILY = function (_, generator) {
    generator.definitions_['import_seniverse_api'] = "import seniverse_api";
    var dropdown_mode = this.getFieldValue('mode');
    var key = generator.valueToCode(this, 'key', generator.ORDER_ATOMIC);
    var addr = generator.valueToCode(this, 'addr', generator.ORDER_ATOMIC);
    var day = generator.valueToCode(this, 'day', generator.ORDER_ATOMIC);
    var code = 'seniverse_api.' + dropdown_mode + '(' + key + ',' + addr + ',' + day + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const WEATHER_HOUR = function (_, generator) {
    generator.definitions_['import_seniverse_api'] = "import seniverse_api";
    var key = generator.valueToCode(this, 'key', generator.ORDER_ATOMIC);
    var addr = generator.valueToCode(this, 'addr', generator.ORDER_ATOMIC);
    var hour = generator.valueToCode(this, 'hour', generator.ORDER_ATOMIC);
    var code = 'seniverse_api.weather_hourly(' + key + ',' + addr + ',' + hour + ')';
    return [code, generator.ORDER_ATOMIC];
}