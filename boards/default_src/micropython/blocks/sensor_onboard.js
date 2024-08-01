import * as Blockly from 'blockly/core';
import { Profile } from 'mixly';
import {
    sensor_dht11,
    sensor_mpu9250_field_strength,
    sensor_mpu9250_temperature
} from './sensor_extern.js';

const SENSOR_ONBOARD_HUE = '#947C54'; //'#9e77c9'//40;

export const sensor_mixgo_button_is_pressed = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendValueInput('btn')
            .appendField(Blockly.Msg.MIXLY_BUTTON)
            .setCheck(Number);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_IS_PRESSED);
        this.setOutput(true, Boolean);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_SENOR_IS_PRESSED);
    }
};

export const sensor_mixgo_button_was_pressed = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendValueInput('btn')
            .appendField(Blockly.Msg.MIXLY_BUTTON)
            .setCheck(Number);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_WAS_PRESSED);
        this.setOutput(true, Boolean);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_SENOR_WAS_PRESSED);
    }
};

export const sensor_mixgo_button_get_presses = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendValueInput('btn')
            .appendField(Blockly.Msg.MIXLY_BUTTON)
            .setCheck(Number);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GET_PRESSES);
        this.appendValueInput('VAR')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_GET_PRESSES_TIME);
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN + Blockly.Msg.MIXLY_BUTTON + Blockly.Msg.MIXLY_GET_PRESSES);
    }
};

export const sensor_mixgo_button_attachInterrupt = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendValueInput("btn")
            .appendField(Blockly.Msg.MIXLY_ESP32_INTERRUPT)
            .appendField(Blockly.Msg.MIXLY_BUTTON)
            .setCheck(Number);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_MODE)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_RISING, "machine.Pin.IRQ_RISING"], [Blockly.Msg.MIXLY_FALLING, "machine.Pin.IRQ_FALLING"], [Blockly.Msg.MIXLY_CHANGE, "(machine.Pin.IRQ_RISING | machine.Pin.IRQ_FALLING)"]]), "mode");
        this.appendValueInput('DO')
            .appendField(Blockly.Msg.MIXLY_DO)
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_INOUT_ATTACHINTERRUPT);
    }
};

export const sensor_mixgocar42_button_is_pressed = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_BUTTON)
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_IS_PRESSED);
        this.setOutput(true, Boolean);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_SENOR_IS_PRESSED);
    }
};

export const sensor_mixgocar42_button_was_pressed = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_BUTTON)
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_WAS_PRESSED);
        this.setOutput(true, Boolean);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_SENOR_WAS_PRESSED);
    }
};

export const sensor_mixgocar42_button_get_presses = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_BUTTON)
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GET_PRESSES);
        this.appendValueInput('VAR')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_GET_PRESSES_TIME);
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN + Blockly.Msg.MIXLY_BUTTON + Blockly.Msg.MIXLY_GET_PRESSES);
    }
};

export const sensor_mixgocar42_button_attachInterrupt = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ESP32_INTERRUPT)
            .appendField(Blockly.Msg.MIXLY_BUTTON)
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_MODE)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_RISING, "machine.Pin.IRQ_RISING"], [Blockly.Msg.MIXLY_FALLING, "machine.Pin.IRQ_FALLING"], [Blockly.Msg.MIXLY_CHANGE, "(machine.Pin.IRQ_RISING | machine.Pin.IRQ_FALLING)"]]), "mode");
        this.appendValueInput('DO')
            .appendField(Blockly.Msg.MIXLY_DO)
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_INOUT_ATTACHINTERRUPT);
    }
};

export const sensor_mixgo_pin_pressed = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendValueInput("button")
            .appendField(Blockly.Msg.MIXLY_ESP32_TOUCH_SENSOR)
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_IS_TOUCHED);
        this.setOutput(true, Boolean);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_sensor_pin_pressed);
    }
};

export const sensor_mixgoce_pin_pressed = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendValueInput("button")
            .appendField(Blockly.Msg.MIXLY_ESP32_TOUCH_SENSOR)
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_IS_TOUCHED);
        this.setOutput(true, Boolean);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_sensor_pin_pressed);
    }
};

export const sensor_mpython_pin_pressed = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendValueInput("button")
            .appendField(Blockly.Msg.MIXLY_ESP32_TOUCH_SENSOR)
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_IS_TOUCHED);
        this.setOutput(true, Boolean);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_sensor_pin_pressed);
    }
};

export const sensor_mixgo_touch_slide = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_TOUCH_SLIDE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ESP32_EXTERN_VALUE);
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOUCH_SLIDE_TOOLTIP);
    }
};


export const sensor_distance_hrsc04 = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_CHAOSHENGBO)
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_CHAOSHENGBO);
    }
};

// var RTC_TIME_TYPE = [
//     [Blockly.Msg.MIXLY_YEAR, "Year"],
//     [Blockly.Msg.MIXLY_MONTH, "Month"],
//     [Blockly.Msg.MIXLY_DAY, "Day"],
//     [Blockly.Msg.MIXLY_HOUR, "Hour"],
//     [Blockly.Msg.MIXLY_MINUTE, "Minute"],
//     [Blockly.Msg.MIXLY_SECOND, "Second"],
//     [Blockly.Msg.MIXLY_WEEK, "Week"],
//     [Blockly.Msg.MIXLY_MIX1, "Mix1"],
//     [Blockly.Msg.MIXLY_MIX2, "Mix2"],
// ];

export const RTC_set_time = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendDummyInput("")
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_RTCSETTIME)
            .appendField('myRTC');
        this.appendValueInput("hour")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("  " + Blockly.Msg.MIXLY_HOUR);
        this.appendValueInput("minute")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("  " + Blockly.Msg.MIXLY_MINUTE);
        this.appendValueInput("second")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("  " + Blockly.Msg.MIXLY_SECOND);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(false);
        this.setTooltip(Blockly.Msg.MIXLY_RTCSETTIME + Blockly.Msg.MIXLY_MIX2);
    }
};

export const RTC_set_date = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendDummyInput("")
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_RTCSETDATE)
            .appendField('myRTC');
        this.appendValueInput("year")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("  " + Blockly.Msg.MIXLY_YEAR);
        this.appendValueInput("month")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("  " + Blockly.Msg.MIXLY_MONTH);
        this.appendValueInput("day")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("  " + Blockly.Msg.MIXLY_DAY);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.MIXLY_RTCSETDATE + Blockly.Msg.MIXLY_MIX1);
    }
};



export const HCSR04 = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_CHAOSHENGBO);
        this.appendValueInput("PIN1", Number)
            .appendField('Trig #')
            .setCheck(Number);
        this.appendValueInput("PIN2", Number)
            .appendField('Echo #')
            .setCheck(Number);
        this.setInputsInline(true);
        this.setOutput(true, Number);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_BLOCKGROUP_CHAOSHENGBO);
    }

};

export const sensor_mixgo_light = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ESP32_LIGHT);
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.ESP32_SENSOR_NIXGO_LIGHT_TOOLTIP);
    }
};


export const number1 = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([["1", "touch1"], ["2", "touch2"]]), 'op')
        this.setOutput(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_INOUT_HIGHLOW);
    }
};

export const number2 = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"]]), 'op')
        this.setOutput(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_INOUT_HIGHLOW);
    }
};

export const number3 = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_UP, "12"], [Blockly.Msg.MIXLY_DOWN, "14"], [Blockly.Msg.MIXLY_LEFT, "13"], [Blockly.Msg.MIXLY_RIGHT, "15"], ["A", "32"], ["B", "33"]]), 'op')
        this.setOutput(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_INOUT_HIGHLOW);
    }
};

export const number4 = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"]]), 'op')
        this.setOutput(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_INOUT_HIGHLOW);
    }
};

export const number5 = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"]]), 'op')
        this.setOutput(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_INOUT_HIGHLOW);
    }
};

export const number6 = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([["3", "3"], ["4", "4"]]), 'op')
        this.setOutput(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_INOUT_HIGHLOW);
    }
};

export const number7 = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"]]), 'op')
        this.setOutput(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_INOUT_HIGHLOW);
    }
};

export const sensor_mixgo_pin_near_single = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ESP32_EXTERN_NEAR);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ESP32_EXTERN_VALUE);
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_SENSOR_MIXGO_PIN_NEAR_TOOLTIP + Blockly.Msg.MIXLY_ESP32_NEAR);
    }
};

export const sensor_mixgo_pin_near_double = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.TEXT_TRIM_LEFT, "left"], [Blockly.Msg.TEXT_TRIM_RIGHT, "right"]]), "direction")
            .appendField(Blockly.Msg.MIXLY_ESP32_NEAR);
        this.setOutput(true, Number);
        this.setInputsInline(true);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('direction');
            var mode0 = Blockly.Msg.MIXLY_ESP32_SENSOR_MIXGO_PIN_NEAR_TOOLTIP;
            var mode1 = Blockly.Msg.MIXLY_ESP32_NEAR;
            var TOOLTIPS = {
                'left': Blockly.Msg.TEXT_TRIM_LEFT,
                'right': Blockly.Msg.TEXT_TRIM_RIGHT,
            };
            return mode0 + TOOLTIPS[mode] + mode1
        });
    }
};

export const sensor_mixgo_pin_near = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.mixpy_PL_TEXT_TOP, "l"], [Blockly.Msg.mixpy_PL_TEXT_BOTTOM, "r"]]), "direction")
            .appendField(Blockly.Msg.MIXLY_ESP32_NEAR);
        this.setOutput(true, Number);
        this.setInputsInline(true);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('direction');
            var mode0 = Blockly.Msg.MIXLY_ESP32_SENSOR_MIXGO_PIN_NEAR_TOOLTIP;
            var mode1 = Blockly.Msg.MIXLY_ESP32_NEAR;
            var TOOLTIPS = {
                'l': Blockly.Msg.mixpy_PL_TEXT_TOP,
                'r': Blockly.Msg.mixpy_PL_TEXT_BOTTOM,
            };
            return mode0 + TOOLTIPS[mode] + mode1
        });
    }
};


export const sensor_mixgo_nova_pin_near = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.TEXT_TRIM_LEFT, "l"], [Blockly.Msg.TEXT_TRIM_RIGHT, "r"]]), "direction")
            .appendField(Blockly.Msg.MIXLY_ESP32_NEAR);
        this.setOutput(true, Number);
        this.setInputsInline(true);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('direction');
            var mode0 = Blockly.Msg.MIXLY_ESP32_SENSOR_MIXGO_PIN_NEAR_TOOLTIP;
            var mode1 = Blockly.Msg.MIXLY_ESP32_NEAR;
            var TOOLTIPS = {
                'l': Blockly.Msg.TEXT_TRIM_LEFT,
                'r': Blockly.Msg.TEXT_TRIM_RIGHT,
            };
            return mode0 + TOOLTIPS[mode] + mode1
        });
    }
};

export const sensor_mixgo_nova_LTR308 = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.TEXT_TRIM_LEFT, "l"], [Blockly.Msg.TEXT_TRIM_RIGHT, "r"]]), "direction")
            .appendField(Blockly.Msg.MIXLY_ESP32_EXTERN_LIGHT + Blockly.Msg.MIXLY_DATA);
        this.setOutput(true, Number);
        this.setInputsInline(true);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('direction');
            var mode0 = Blockly.Msg.MIXLY_ESP32_SENSOR_MIXGO_PIN_NEAR_TOOLTIP;
            var mode1 = Blockly.Msg.MIXLY_ESP32_EXTERN_LIGHT;
            var TOOLTIPS = {
                'l': Blockly.Msg.TEXT_TRIM_LEFT,
                'r': Blockly.Msg.TEXT_TRIM_RIGHT,
            };
            return mode0 + TOOLTIPS[mode] + mode1
        });
    }
};

export const sensor_mixgo_LTR308 = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.mixpy_PL_TEXT_TOP, "l"], [Blockly.Msg.mixpy_PL_TEXT_BOTTOM, "r"]]), "direction")
            .appendField(Blockly.Msg.MIXLY_ESP32_EXTERN_LIGHT + Blockly.Msg.MIXLY_DATA);
        this.setOutput(true, Number);
        this.setInputsInline(true);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('direction');
            var mode0 = Blockly.Msg.MIXLY_ESP32_SENSOR_MIXGO_PIN_NEAR_TOOLTIP;
            var mode1 = Blockly.Msg.MIXLY_ESP32_EXTERN_LIGHT;
            var TOOLTIPS = {
                'l': Blockly.Msg.mixpy_PL_TEXT_TOP,
                'r': Blockly.Msg.mixpy_PL_TEXT_BOTTOM,
            };
            return mode0 + TOOLTIPS[mode] + mode1
        });
    }
};

//传感器-实时时钟块_获取时间
export const onboard_RTC_get_time = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField("RTC")
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_RTCGETTIME);
        this.setInputsInline(true);
        this.setOutput(true, Number);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_RTC_GET_TIME_TOOLTIP + ' (year, month, mday, hour, minute, second, weekday, yearday)');
        // var thisBlock = this;
        //     this.setTooltip(function() {
        //     var mode = thisBlock.getFieldValue('TIME_TYPE');
        //     var mode0 = Blockly.Msg.MIXLY_RTCGETTIME;
        //     var TOOLTIPS = {
        //     'Year':Blockly.Msg.MIXLY_YEAR,
        //     'Month':Blockly.Msg.MIXLY_MONTH,
        //     'Day':Blockly.Msg.MIXLY_DAY,
        //     'Hour':Blockly.Msg.MIXLY_HOUR,
        //     'Minute':Blockly.Msg.MIXLY_MINUTE,
        //     'Second':Blockly.Msg.MIXLY_SECOND,
        //     'Week':Blockly.Msg.MIXLY_WEEK,
        //     'Mix1':Blockly.Msg.MIXLY_MIX1,
        //     'Mix2':Blockly.Msg.MIXLY_MIX2
        //   };
        // return mode0 +TOOLTIPS[mode];
        // });
    }
};

export const onboard_RTC_get_timestamp = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendValueInput('LIST')
            .appendField(Blockly.Msg.MIXLY_RTCGETTIMESTAMP);
        this.setInputsInline(true);
        this.setOutput(true, Number);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_RTC_GET_TIMESTAMP_TOOLTIP);
    }
};

export const onboard_RTC_timestamp_totuple = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendValueInput('VAR')
            .appendField(Blockly.Msg.MIXLY_RTC_TIMESTAMP);
        this.appendDummyInput()
            .appendField(Blockly.Msg.LISTS_TO_TUPLE);
        this.setInputsInline(true);
        this.setOutput(true, Number);
    }
};

export const onboard_RTC_settime_string = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField('RTC');
        this.appendValueInput('CONTENT')
            .appendField(Blockly.Msg.MIXLY_USE_STRING_TUPLE)
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_RTCSETTIME);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

export const onboard_RTC_set_datetime = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField("RTC")
        this.appendValueInput('year')
            .setCheck(Number)
            .appendField("         " + Blockly.Msg.MIXLY_YEAR);
        this.appendValueInput('month')
            .setCheck(Number)
            .appendField("         " + Blockly.Msg.MIXLY_MONTH);
        this.appendValueInput('day')
            .setCheck(Number)
            .appendField("         " + Blockly.Msg.MIXLY_DAY);
        this.appendValueInput('hour')
            .setCheck(Number)
            .appendField("         " + Blockly.Msg.MIXLY_HOUR);
        this.appendValueInput('minute')
            .setCheck(Number)
            .appendField("         " + Blockly.Msg.MIXLY_MINUTE);
        this.appendValueInput('second')
            .setCheck(Number)
            .appendField("         " + Blockly.Msg.MIXLY_SECOND);
        this.setInputsInline(false);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_RTC_SET_DATATIME_TOOLTIP);
    }
};

export const sensor_rtc_init = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendDummyInput("")
            .appendField("RTC")
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.MIXLY_SETUP)
            .setCheck("var");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_SENSOR_RTC_INT_TOOLTIP);
    }
};


export const sensor_LTR308 = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ESP32_LIGHT);
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.ESP32_SENSOR_NIXGO_LIGHT_TOOLTIP);
    }
};

export const sensor_sound = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ESP32_SOUND);
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.ESP32_SENSOR_NIXGO_SOUND_TOOLTIP);
    }
};

export const sensor_aht11 = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_TEM_HUM + " ")
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_GETTEMPERATUE, "temperature"],
                [Blockly.Msg.MIXLY_GETHUMIDITY, "humidity"]
            ]), "key");
        this.setOutput(true, Number);
        this.setInputsInline(true);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('key');
            var TOOLTIPS = {
                "temperature": Blockly.Msg.MIXLY_MICROBIT_SENSOR_SHT_temperature_TOOLTIP,
                "humidity": Blockly.Msg.MIXLY_ESP32C3_SENSOR_AHT_HUM_TOOLTIP
            };
            return TOOLTIPS[mode]
        });
    }
};


export const sensor_get_temperature = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GETTEMPERATUE);
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
};





export const sensor_hp203 = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_Altitude + Blockly.Msg.MSG.catSensor + " ")
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_GETPRESSURE, "pressure()"],
                [Blockly.Msg.MIXLY_GETTEMPERATUE, "temperature()"],
                [Blockly.Msg.MIXLY_GET_ALTITUDE, "altitude()"],
            ]), "key");
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
};

export const rfid_readid = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField("RFID" + Blockly.Msg.MIXLY_RFID_READ_CARD);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_RFID_READ_CARD_UID);
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
};

export const rfid_readcontent = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField("RFID" + Blockly.Msg.MIXLY_RFID_READ_CARD);
        this.appendValueInput('SECTOR')
            .appendField(Blockly.Msg.MIXLY_LIST_INDEX)
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_ALL);
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
};

export const rfid_write = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_COMMUNICATION_RFID_WRITE);
        this.appendValueInput('SECTOR')
            .appendField(Blockly.Msg.MIXLY_LIST_INDEX)
        this.appendValueInput('CONTENT')
            .appendField(Blockly.Msg.MIXLY_COMMUNICATION_WRITE_NUM)
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

export const rfid_write_return = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_COMMUNICATION_RFID_WRITE);
        this.appendValueInput('SECTOR')
            .appendField(Blockly.Msg.MIXLY_LIST_INDEX)
        this.appendValueInput('CONTENT')
            .appendField(Blockly.Msg.MIXLY_COMMUNICATION_WRITE_NUM)
        this.appendDummyInput()
            .appendField(Blockly.Msg.RETURN_SUCCESS_OR_NOT);
        this.setInputsInline(true);
        this.setOutput(true, Boolean);
    }
};

export const sensor_get_acceleration = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_ACCELERATION)
            .appendField(new Blockly.FieldDropdown([
                ["x", "[0]"],
                ["y", "[1]"],
                ["z", "[2]"],
                ["(x,y,z)", ""],
                [Blockly.Msg.MIXLY_STRENGTH, "strength"]
            ]), "key");
        this.setOutput(true, Number);
        this.setInputsInline(true);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('key');
            var mode0 = Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET;
            var mode1 = Blockly.Msg.MIXLY_MICROBIT_Direction;
            var mode2 = Blockly.Msg.MIXLY_MICROBIT_JS_ACCELERATION1;
            var TOOLTIPS = {
                '[0]': 'x',
                '[1]': 'y',
                '[2]': 'z',
                '': Blockly.Msg.MIXLY_MICROBIT_Shiliang_Direction,
            };
            return mode0 + TOOLTIPS[mode] + mode1 + mode2;
        });
    }
};

export const sensor_eulerangles = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_GET_GESTURE_ALL)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.ME_GO_PITCH, '[0]'],
                [Blockly.Msg.ME_GO_ROLL, '[1]'],
                [Blockly.Msg.ME_GO_PITCH + ', ' + Blockly.Msg.ME_GO_ROLL, '']
            ]), 'angle');

        this.appendDummyInput("")
        this.setOutput(true, Number);
        this.setInputsInline(true);

    }
};

export const sensor_onboard_mpu9250_gesture = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendDummyInput("")
            .appendField("MPU9250")
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_CURRENT_GESTURE)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_MICROBIT_shake, "shake"], [Blockly.Msg.MIXLY_UP, "up"], [Blockly.Msg.MIXLY_DOWN, "down"], [Blockly.Msg.MIXLY_LEFT, "left"], [Blockly.Msg.MIXLY_RIGHT, "right"], [Blockly.Msg.MIXLY_MICROBIT_face_up, "face up"], [Blockly.Msg.MIXLY_MICROBIT_face_down, "face down"]]), "gesture");
        this.setOutput(true);
        this.setInputsInline(true);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('gesture');
            var mode0 = Blockly.Msg.MIXLY_MICROBIT_JS_CURRENT;
            var mode1 = Blockly.Msg.MSG.catSensor;
            var mode2 = Blockly.Msg.MIXLY_MICROBIT_JS_STATE;
            var mode3 = Blockly.Msg.MIXLY_MICROBIT_PERFORMANCE
            var TOOLTIPS = {
                'shake': Blockly.Msg.MIXLY_MICROBIT_shake,
                'up': Blockly.Msg.MIXLY_UP,
                'down': Blockly.Msg.MIXLY_DOWN,
                'left': Blockly.Msg.MIXLY_LEFT,
                'right': Blockly.Msg.MIXLY_RIGHT,
                'face up': Blockly.Msg.MIXLY_MICROBIT_face_up,
                'face down': Blockly.Msg.MIXLY_MICROBIT_face_down,
                // 'freefall':Blockly.Msg.MIXLY_MICROBIT_freefall,
                // '3g': '3g',
                // '6g': '6g',
                // '8g': '8g'
            };
            return mode0 + mode1 + mode2 + TOOLTIPS[mode] + mode3;
        });
    }
};

export const sensor_onboard_mpu9250_get_acceleration = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendDummyInput("")
            .appendField("MPU9250")
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_ACCELERATION)
            .appendField(new Blockly.FieldDropdown([
                ["x", "x"],
                ["y", "y"],
                ["z", "z"],
                ["(x,y,z)", "values"]
            ]), "key");
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_MICROBIT_JS_ACCELERATION);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('key');
            var mode0 = Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET;
            var mode1 = Blockly.Msg.MIXLY_MICROBIT_Direction;
            var mode2 = Blockly.Msg.MIXLY_MICROBIT_JS_ACCELERATION1;
            var TOOLTIPS = {
                'x': 'x',
                'y': 'y',
                'z': 'z',
                '(x,y,z)': Blockly.Msg.MIXLY_MICROBIT_Shiliang_Direction,
            };
            return mode0 + TOOLTIPS[mode] + mode1 + mode2;
        });
    }
};

export const sensor_onboard_mpu9250_get_magnetic = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendDummyInput("")
            .appendField("MPU9250")
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_GET + Blockly.Msg.MIXLY_MICROBIT_JS_FIELD_STRENGTH)
            .appendField(new Blockly.FieldDropdown([
                ["x", "x"],
                ["y", "y"],
                ["z", "z"],
                ["(x,y,z)", "values"]
            ]), "key");
        this.setOutput(true, Number);
        this.setInputsInline(true);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('key');
            var mode0 = Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET;
            var mode1 = Blockly.Msg.MIXLY_MICROBIT_Direction;
            var mode2 = Blockly.Msg.MIXLY_MICROBIT_JS_FIELD_STRENGTH;
            var TOOLTIPS = {
                'x': 'x',
                'y': 'y',
                'z': 'z',
                '(x,y,z)': Blockly.Msg.MIXLY_MICROBIT_Shiliang_Direction,
            };
            return mode0 + TOOLTIPS[mode] + mode1 + mode2;
        });
    }
};

export const sensor_onboard_mpu9250_get_gyro = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendDummyInput("")
            .appendField("MPU9250")
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET + Blockly.Msg.MIXLY_ESP32_SENOR_GYRO)
            .appendField(new Blockly.FieldDropdown([
                ["x", "x"],
                ["y", "y"],
                ["z", "z"],
                ["(x,y,z)", "values"]
            ]), "key");
        this.setOutput(true, Number);
        this.setInputsInline(true);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('key');
            var mode0 = Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET;
            var mode1 = Blockly.Msg.MIXLY_MICROBIT_Direction;
            var mode2 = Blockly.Msg.MIXLY_ESP32_SENOR_GYRO;
            var TOOLTIPS = {
                'x': 'x',
                'y': 'y',
                'z': 'z',
                '(x,y,z)': Blockly.Msg.MIXLY_MICROBIT_Shiliang_Direction,
            };
            return mode0 + TOOLTIPS[mode] + mode1 + mode2;
        });
    }
};

export const sensor_onboard_mpu9250_calibrate_compass = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendDummyInput("")
            .appendField("MPU9250")
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_CALIBRATE_COMPASS)
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_MICROBIT_JS_CALIBRATE_COMPASS);
    }
};


export const sensor_onboard_mpu9250_temperature = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendDummyInput("")
            .appendField("MPU9250")
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GETTEMPERATUE)
        this.setOutput(true, Number);
        this.setInputsInline(true);

        this.setTooltip(Blockly.Msg.MIXLY_GETTEMPERATUE);
    }
};


export const sensor_onboard_mpu9250_field_strength = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendDummyInput("")
            .appendField("MPU9250")
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_GET_COMPASS)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_MICROBIT_JS_FIELD_STRENGTH, 'strength'], [Blockly.Msg.MIXLY_MICROBIT_JS_BY_ANGLE, 'heading']]), 'compass');
        this.setOutput(true, Number);
        this.setInputsInline(true);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('compass');
            var mode0 = Blockly.Msg.MIXLY_MICROBIT_JS_GET_COMPASS;
            var TOOLTIPS = {
                'strength': Blockly.Msg.MIXLY_MICROBIT_JS_FIELD_STRENGTH,
                'heading': Blockly.Msg.MIXLY_MICROBIT_JS_BY_ANGLE
            };
            return mode0 + TOOLTIPS[mode];
        });
    }
};

export const sensor_onboard_compass_reset = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendDummyInput("")
            .appendField("MPU9250")
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_Reset_COMPASS)
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_MICROBIT_Reset_COMPASS);
    }
};

//mixgo_cc onboard_sensor blocks:
export const sensor_mixgo_cc_mmc5603_get_magnetic = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_GET + Blockly.Msg.MIXLY_MICROBIT_JS_FIELD_STRENGTH)
            .appendField(new Blockly.FieldDropdown([
                ["x", "[0]"],
                ["y", "[1]"],
                ["z", "[2]"],
                ["(x,y,z)", ""],
                [Blockly.Msg.MIXLY_MICROBIT_JS_FIELD_STRENGTH_ALL, "all"]
            ]), "key");
        this.setOutput(true, Number);
        this.setInputsInline(true);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('key');
            var mode0 = Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET;
            var mode1 = Blockly.Msg.MIXLY_MICROBIT_Direction;
            var mode2 = Blockly.Msg.MIXLY_MICROBIT_JS_FIELD_STRENGTH;
            var TOOLTIPS = {
                '[0]': 'x',
                '[1]': 'y',
                '[2]': 'z',
                '': Blockly.Msg.MIXLY_MICROBIT_Shiliang_Direction,
            };
            return mode0 + TOOLTIPS[mode] + mode1 + mode2;
        });
    }
};
export const sensor_mixgo_cc_mmc5603_get_angle = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_GET_COMPASS + Blockly.Msg.MIXLY_MICROBIT_JS_BY_ANGLE)
        this.setOutput(true, Number);
        this.setInputsInline(true);

    }
};

export const sensor_mixgo_cc_mmc5603_calibrate_compass = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_CALIBRATE_COMPASS)
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_MICROBIT_JS_CALIBRATE_COMPASS);
    }
};


//mixgo_me onboard_sensor blocks:


export const sensor_mixgome_temperature = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_GETTEMPERATUE)
        this.appendDummyInput("")
        this.setOutput(true, Number);
        this.setInputsInline(true);

    }
};

//mixgo_ce onboard_sensor blocks:


export const sensor_mixgoce_temperature = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_GETTEMPERATUE)
        this.appendDummyInput("")
        this.setOutput(true, Number);
        this.setInputsInline(true);

    }
};




export const sensor_mpython_qmi8658_get_gyro = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET + Blockly.Msg.MIXLY_ESP32_SENOR_GYRO)
            .appendField(new Blockly.FieldDropdown([
                ["x", "[0]"],
                ["y", "[1]"],
                ["z", "[2]"],
                ["(x,y,z)", ""]
            ]), "key");
        this.setOutput(true, Number);
        this.setInputsInline(true);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('key');
            var mode0 = Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET;
            var mode1 = Blockly.Msg.MIXLY_MICROBIT_Direction;
            var mode2 = Blockly.Msg.MIXLY_ESP32_SENOR_GYRO;
            var TOOLTIPS = {
                '[0]': 'x',
                '[1]': 'y',
                '[2]': 'z',
                '': Blockly.Msg.MIXLY_MICROBIT_Shiliang_Direction,
            };
            return mode0 + TOOLTIPS[mode] + mode1 + mode2;
        });
    }
};

export const sensor_mpython_qmi8658_temperature = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GETTEMPERATUE)
        this.setOutput(true, Number);
        this.setInputsInline(true);

        this.setTooltip(Blockly.Msg.MIXLY_GETTEMPERATUE);
    }
};




export const sensor_rm_pin_near_double = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.TEXT_TRIM_LEFT, "1"], [Blockly.Msg.TEXT_TRIM_RIGHT, "2"]]), "direction")
            .appendField(Blockly.Msg.MIXLY_ESP32_NEAR);
        this.setOutput(true, Number);
        this.setInputsInline(true);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('direction');
            var mode0 = Blockly.Msg.MIXLY_ESP32_SENSOR_MIXGO_PIN_NEAR_TOOLTIP;
            var mode1 = Blockly.Msg.MIXLY_ESP32_NEAR;
            var TOOLTIPS = {
                'left': Blockly.Msg.TEXT_TRIM_LEFT,
                'right': Blockly.Msg.TEXT_TRIM_RIGHT,
            };
            return mode0 + TOOLTIPS[mode] + mode1
        });
    }
};

export const sensor_rm_battery_left = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MIXGO_CAR_BATTERY_LEFT);
        this.setOutput(true);
        this.setInputsInline(true);
    }
};

export const sensor_rm_acc = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField("acc" + Blockly.Msg.MIXLY_MICROBIT_JS_GET)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_ADXL345_XA, "[0]"],
                [Blockly.Msg.MIXLY_ADXL345_YA, "[1]"],
                [Blockly.Msg.MIXLY_ACC_SHAKE, "[2]"],
                [Blockly.Msg.MIXLY_ADXL345_XA + ',' + Blockly.Msg.MIXLY_ADXL345_YA + ',' + Blockly.Msg.MIXLY_ACC_SHAKE, ""]
            ]), "key");
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_MICROBIT_JS_ACCELERATION);

    }
};

//car4.2
export const sensor_mixgocar_pin_near_line = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.TEXT_TRIM_LEFT, "[0]"],
                [Blockly.Msg.MIXGO_LEFT_MID, "[1]"],
                [Blockly.Msg.MIXGO_RIGHT_MID, "[2]"],
                [Blockly.Msg.TEXT_TRIM_RIGHT, "[3]"],
                [Blockly.Msg.MIXLY_ALL, ""]
            ]), "key")
            .appendField(Blockly.Msg.MIXGO_LINE_SENSOR_VAL);
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(function () {
            var mode0 = Blockly.Msg.MIXLY_ESP32_SENSOR_MIXGO_PIN_NEAR_TOOLTIP;
            var mode1 = Blockly.Msg.MIXLY_ESP32_NEAR;
            return mode0 + mode1
        });
    }
};

export const sensor_mixgocar_pin_near = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXGO_LEFT_FRONT, "[0]"],
                [Blockly.Msg.MIXGO_RIGHT_FRONT, "[1]"],
                [Blockly.Msg.MIXGO_LEFT_BACK, "[3]"],
                [Blockly.Msg.MIXGO_RIGHT_BACK, "[2]"],
                [Blockly.Msg.MIXLY_ALL, ""]
            ]), "key")
            .appendField(Blockly.Msg.MIXGO_PROXIMITY_SENSOR);
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(function () {
            var mode0 = Blockly.Msg.MIXLY_ESP32_SENSOR_MIXGO_PIN_NEAR_TOOLTIP;
            var mode1 = Blockly.Msg.MIXLY_ESP32_NEAR;
            return mode0 + mode1
        });
    }
};

export const sensor_mixgocar_pin_near_state_change = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MIXGO_CAR_SENSOR_ONBOARD_CHANGE)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_MIXGO_CAR_SENSOR_ONBOARD_AUTO_CHANGE, "AS"],
                [Blockly.Msg.MIXLY_MIXGO_CAR_USE_LINE_ONLY, "LP"],
                [Blockly.Msg.MIXLY_MIXGO_CAR_USE_PROXIMITY_ONLY, "OA"]
            ]), "key");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
    }
};


export const sensor_mixgocar_battery_left = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MIXGO_CAR_BATTERY_LEFT);
        this.setOutput(true);
        this.setInputsInline(true);
    }
};

//mixbot onboard_sensor below:


export const sensor_mixbot_patrol_calibrate = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXGO_LINE_SENSOR)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_MIXBOT_LINE_SENSOR_CALIBRATE_WHITE, "WHITE"],
                [Blockly.Msg.MIXLY_MIXBOT_LINE_SENSOR_CALIBRATE_BLACK, "BLACK"],
                [Blockly.Msg.MIXLY_MIXBOT_LINE_SENSOR_CALIBRATE_RESET, "RESET_TO_FAB"]
            ]), "key");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
    }
};

export const sensor_mixbot_patrol_value = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXGO_LEFT_FRONT, "[0]"],
                [Blockly.Msg.MIXGO_RIGHT_FRONT, "[1]"],
                [Blockly.Msg.MIXGO_LEFT_BACK, "[3]"],
                [Blockly.Msg.MIXGO_RIGHT_BACK, "[2]"],
                [Blockly.Msg.MIXLY_ALL, ""]
            ]), "key")
            .appendField(Blockly.Msg.MIXGO_LINE_SENSOR_VAL);
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(function () {
            var mode0 = Blockly.Msg.MIXLY_ESP32_SENSOR_MIXGO_PIN_NEAR_TOOLTIP;
            var mode1 = Blockly.Msg.MIXLY_ESP32_NEAR;
            return mode0 + mode1
        });
    }
};

export const sensor_mixbot_temperature = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_GET + Blockly.Msg.MIXLY_MICROBIT_Board_temperature)
        this.appendDummyInput("")
        this.setOutput(true, Number);
        this.setInputsInline(true);

    }
};



export const sensor_mixbot_get_gyro = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET + Blockly.Msg.MIXLY_ESP32_SENOR_GYRO)
            .appendField(new Blockly.FieldDropdown([
                ["x", "[0]"],
                ["y", "[1]"],
                ["z", "[2]"],
                ["(x,y,z)", ""]
            ]), "key");
        this.setOutput(true, Number);
        this.setInputsInline(true);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('key');
            var mode0 = Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET;
            var mode1 = Blockly.Msg.MIXLY_MICROBIT_Direction;
            var mode2 = Blockly.Msg.MIXLY_ESP32_SENOR_GYRO;
            var TOOLTIPS = {
                '[0]': 'x',
                '[1]': 'y',
                '[2]': 'z',
                '': Blockly.Msg.MIXLY_MICROBIT_Shiliang_Direction,
            };
            return mode0 + TOOLTIPS[mode] + mode1 + mode2;
        });
    }
};

export const sensor_bitbot_ALS = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.ANALOG + Blockly.Msg.MIXLY_ESP32_EXTERN_LIGHT)
        this.appendValueInput('mode')
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.LCD_NUMBERING);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GET_LIGHT_INTENSITY + "(%)");
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
};

export const bitbot_als_num = {
    init: function () {
        this.setColour(SENSOR_ONBOARD_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.als_num), 'PIN');
        this.setOutput(true, Number);
    }
};

export const sensor_button_is_pressed = sensor_mixgo_button_is_pressed;
export const sensor_button_was_pressed = sensor_mixgo_button_was_pressed;
export const sensor_button_get_presses = sensor_mixgo_button_get_presses;
export const sensor_pin_pressed = sensor_mixgo_pin_pressed;
export const sensor_pin_near = sensor_mixgo_pin_near;
export const sensor_light = sensor_mixgo_light;
export const dht11 = sensor_dht11;
export const sensor_field_strength = sensor_mpu9250_field_strength;
export const sensor_temperature = sensor_mpu9250_temperature