import * as Blockly from 'blockly/core';

const WEATHER_HUE = '#27b6ac';

export const WEATHER_NOW = {
    init: function () {
        this.setColour(WEATHER_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MSG.catweather)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_WEB_DATA_SENIVERSE_GET_WEATHER_NOW, "weather_now"],
                [Blockly.Msg.MIXLY_WEB_DATA_SENIVERSE_GET_WEATHER_ALARM, "weather_alarm"],
                [Blockly.Msg.MIXLY_WEB_DATA_SENIVERSE_GET_AIR_NOW, "air_now"],
                [Blockly.Msg.MIXLY_WEB_DATA_SENIVERSE_GET_TIDE_DAILY, "tide_daily"],
                [Blockly.Msg.MIXLY_WEB_PLACE + Blockly.Msg.HTML_SEARCH, "location_search"]
            ]), "mode");
        this.appendValueInput('key')
            .appendField(Blockly.Msg.MIXLY_API_PRIVATE_KEY);
        this.appendValueInput('addr')
            .appendField(Blockly.Msg.MIXLY_GEOGRAPHIC_LOCATION);
        this.setInputsInline(true);
        this.setOutput(true);
    }
};

export const WEATHER_DAILY = {
    init: function () {
        this.setColour(WEATHER_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MSG.catweather)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_WEB_DATA_SENIVERSE_GET_WEATHER_DAILY, "weather_daily"],
                [Blockly.Msg.MIXLY_WEB_DATA_SENIVERSE_GET_LIFE_SUGGESTION, "life_suggestion"],
                [Blockly.Msg.MIXLY_WEB_DATA_SENIVERSE_GET_AIR_DAILY, "air_daily"],
                [Blockly.Msg.MIXLY_WEB_DATA_SENIVERSE_GET_GEO_SUN, "geo_sun"],
                [Blockly.Msg.MIXLY_WEB_DATA_SENIVERSE_GET_GEO_MOON, "geo_moon"]
            ]), "mode");
        this.appendValueInput('key')
            .appendField(Blockly.Msg.MIXLY_API_PRIVATE_KEY);
        this.appendValueInput('addr')
            .appendField(Blockly.Msg.MIXLY_GEOGRAPHIC_LOCATION);
        this.appendValueInput('day')
            .appendField(Blockly.Msg.MIXLY_WEB_DAILY);
        this.setInputsInline(true);
        this.setOutput(true);
    }
};

export const WEATHER_HOUR = {
    init: function () {
        this.setColour(WEATHER_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MSG.catweather)
            .appendField(Blockly.Msg.MIXLY_WEB_DATA_SENIVERSE_GET_WEATHER_HOURS);
        this.appendValueInput('key')
            .appendField(Blockly.Msg.MIXLY_API_PRIVATE_KEY);
        this.appendValueInput('addr')
            .appendField(Blockly.Msg.MIXLY_GEOGRAPHIC_LOCATION);
        this.appendValueInput('hour')
            .appendField(Blockly.Msg.MIXLY_WEB_HOURS);
        this.setInputsInline(true);
        this.setOutput(true);
    }
};