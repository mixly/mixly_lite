import * as Blockly from 'blockly/core';
import { Boards } from 'mixly';

const ACTUATOR_ONBOARD_HUE = '#6C9858'

//LED
export const number = {
    init: function () {
        this.setColour(ACTUATOR_ONBOARD_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([
                ["L1", "1"],
                ["L2", "2"]
            ]), 'op')
        this.setOutput(true);
    }
};

export const ledswitch = {
    init: function () {
        this.setColour(ACTUATOR_ONBOARD_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_ESP32_ON, "1"],
                [Blockly.Msg.MIXLY_ESP32_OFF, "0"],
                [Blockly.Msg.MIXLY_ESP32_TOGGLE, "-1"]
            ]), "flag");
        this.setOutput(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_INOUT_HIGHLOW);
    }
};

export const actuator_led_bright = {
    init: function () {
        this.setColour(ACTUATOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_SETTING);
        this.appendValueInput('led')
            .appendField(Blockly.Msg.MIXLY_BUILDIN_LED)
        this.appendValueInput('bright')
            .appendField(Blockly.Msg.MIXLY_PULSEIN_STAT)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_LED_SETONOFF);
    }
};

export const actuator_get_led_bright = {
    init: function () {
        this.setColour(ACTUATOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET);
        this.appendValueInput('led')
            .appendField(Blockly.Msg.MIXLY_BUILDIN_LED)
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_BRIGHTNESS)
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_LED_GETONOFF);
    }
};

export const actuator_get_led_state = {
    init: function () {
        this.setColour(ACTUATOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET);
        this.appendValueInput('led')
            .appendField(Blockly.Msg.MIXLY_BUILDIN_LED)
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_PULSEIN_STAT)
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_LED_GETONOFF);
    }
};

export const actuator_led_brightness = {
    init: function () {
        this.setColour(ACTUATOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_SETTING);
        this.appendValueInput('led')
            .appendField(Blockly.Msg.MIXLY_BUILDIN_LED)
        this.appendValueInput('bright')
            .appendField(Blockly.Msg.MIXLY_BRIGHTNESS)
        this.appendDummyInput("")
            .appendField("%")
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_SETTING + Blockly.Msg.MIXLY_BUILDIN_LED + Blockly.Msg.MIXLY_BRIGHTNESS + '(0-100%)');
    }
};

export const actuator_mixgo_zero_led_color = {
    init: function () {
        this.setColour(ACTUATOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_SETTING);
        this.appendValueInput('led')
            .appendField(Blockly.Msg.MIXLY_BUILDIN_LED)
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_LCD_SETCOLOR)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_LIGHT_OFF, "0"],
                [Blockly.Msg.MIXLY_LIGHT_RED, "1"],
                [Blockly.Msg.MIXLY_LIGHT_GREEN, "2"],
                [Blockly.Msg.MIXLY_LIGHT_BLUE, "3"],
                [Blockly.Msg.MIXLY_LIGHT_YELLOW, "4"],
                [Blockly.Msg.MIXLY_LIGHT_CYAN, "5"],
                [Blockly.Msg.MIXLY_LIGHT_PURPLE, "6"],
                [Blockly.Msg.MIXLY_LIGHT_WHITE, "7"]
            ]), 'colorvalue');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip();
    }
};

export const rm_actuator_led_bright = {
    init: function () {
        this.setColour(ACTUATOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_SETTING)
            .appendField(Blockly.Msg.MIXLY_BUILDIN_LED)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.COLOUR_RGB_RED, "r"],
                [Blockly.Msg.COLOUR_RGB_GREEN, "g"]
            ]), "color");
        this.appendValueInput('bright')
            .appendField(Blockly.Msg.MIXLY_PULSEIN_STAT)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_LED_SETONOFF);
    }
};

export const rm_actuator_get_led_bright = {
    init: function () {
        this.setColour(ACTUATOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET)

            .appendField(Blockly.Msg.MIXLY_BUILDIN_LED)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.COLOUR_RGB_RED, "r"],
                [Blockly.Msg.COLOUR_RGB_GREEN, "g"]
            ]), "color");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_BRIGHTNESS)
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_LED_GETONOFF);
    }
};

export const rm_actuator_get_led_state = {
    init: function () {
        this.setColour(ACTUATOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET)
            .appendField(Blockly.Msg.MIXLY_BUILDIN_LED)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.COLOUR_RGB_RED, "r"],
                [Blockly.Msg.COLOUR_RGB_GREEN, "g"]
            ]), "color");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_PULSEIN_STAT)
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_LED_GETONOFF);
    }
};

export const rm_actuator_led_brightness = {
    init: function () {
        this.setColour(ACTUATOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_SETTING)
            .appendField(Blockly.Msg.MIXLY_BUILDIN_LED)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.COLOUR_RGB_RED, "r"],
                [Blockly.Msg.COLOUR_RGB_GREEN, "g"]
            ]), "color");
        this.appendValueInput('bright')
            .appendField(Blockly.Msg.MIXLY_BRIGHTNESS)
        this.appendDummyInput("")
            .appendField("%")
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_SETTING + Blockly.Msg.MIXLY_BUILDIN_LED + Blockly.Msg.MIXLY_BRIGHTNESS + '(0-10)');
    }
};

export const cc_number = {
    init: function () {
        this.setColour(ACTUATOR_ONBOARD_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([
                ["L1", "20"],
                ["L2", "21"]
            ]), 'op')
        this.setOutput(true);
    }
};

export const actuator_onboard_neopixel_rgb = {
    init: function () {
        this.setColour(ACTUATOR_ONBOARD_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_RGB)
        this.appendValueInput("_LED_")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_NUM);
        this.appendValueInput("RVALUE")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_R);
        this.appendValueInput("GVALUE")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_G);
        this.appendValueInput("BVALUE")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_B);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        const boardKey = Boards.getSelectedBoardKey();
        switch (boardKey) {
        case 'micropython:esp32c3:mixgo_cc':
            this.setTooltip(Blockly.Msg.MIXLY_RGB_NUM_R_G_B_MIXGOCC);
            break;
        case 'micropython:esp32s2:mixgo_ce':
            this.setTooltip(Blockly.Msg.MIXLY_RGB_NUM_R_G_B_MIXGOCC);
            break;
        case 'micropython:esp32c3:mixgo_me':
            this.setTooltip(Blockly.Msg.MIXLY_RGB_NUM_R_G_B_MIXGOME);
            break;
        case 'micropython:esp32:mPython':
            this.setTooltip(Blockly.Msg.MIXLY_RGB_NUM_R_G_B_MPYTHON);
            break;
        default:
            this.setTooltip(Blockly.Msg.MIXLY_RGB_NUM_R_G_B_MIXGOME);
        }
    }
};

export const actuator_onboard_neopixel_rgb_all = {
    init: function () {
        this.setColour(ACTUATOR_ONBOARD_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_RGB)
        this.appendValueInput("RVALUE")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_R);
        this.appendValueInput("GVALUE")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_G);
        this.appendValueInput("BVALUE")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_B);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setTooltip(Blockly.Msg.MIXLY_RGB_ALL_R_G_B_MIXGOCC);
    }
};

export const actuator_onboard_neopixel_rgb_show_all_rainbow = {
    init: function () {
        this.setColour(ACTUATOR_ONBOARD_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_RGB);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_RAINBOW);
        this.appendValueInput('time')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_DURATION)
            .appendField(Blockly.Msg.MIXLY_MILLIS);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
    }
};


export const actuator_onboard_neopixel_rgb_show_all_chase = {
    init: function () {
        this.setColour(ACTUATOR_ONBOARD_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_RGB);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_CHASE);
        this.appendValueInput("RVALUE")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_R);
        this.appendValueInput("GVALUE")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_G);
        this.appendValueInput("BVALUE")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_B);
        this.appendValueInput('time')
            .setCheck(Number)
            .appendField(Blockly.Msg.PYTHON_RANGE_STEP)
            .appendField(Blockly.Msg.MIXLY_MILLIS);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
    }
};

export const actuator_onboard_neopixel_write = {
    init: function () {
        this.setColour(ACTUATOR_ONBOARD_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_RGB)
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ESP32_RGB_WRITE)
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_MUSIC_WRI);
    }
};


export const actuator_rm_onboard_neopixel_rgb = {
    init: function () {
        this.setColour(ACTUATOR_ONBOARD_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_RGB)
        this.appendValueInput("_LED_")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_NUM);
        this.appendValueInput("RVALUE")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_R);
        this.appendValueInput("GVALUE")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_G);
        this.appendValueInput("BVALUE")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_B);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        const boardKey = Boards.getSelectedBoardKey();
        switch (boardKey) {
        case 'micropython:esp32c3:mixgocc':
            this.setTooltip(Blockly.Msg.MIXLY_RGB_NUM_R_G_B_MIXGOCC);
            break;
        case 'micropython:esp32c3:mixgome':
            this.setTooltip(Blockly.Msg.MIXLY_RGB_NUM_R_G_B_MIXGOME);
            break;
        case 'micropython:esp32:mPython':
            this.setTooltip(Blockly.Msg.MIXLY_RGB_NUM_R_G_B_MPYTHON);
            break;
        default:
            this.setTooltip(Blockly.Msg.MIXLY_RGB_NUM_R_G_B_MIXGOME);
        }
    }
};

export const actuator_rm_onboard_neopixel_rgb_all = {
    init: function () {
        this.setColour(ACTUATOR_ONBOARD_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_RGB)
        this.appendValueInput("RVALUE")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_R);
        this.appendValueInput("GVALUE")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_G);
        this.appendValueInput("BVALUE")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_B);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setTooltip(Blockly.Msg.MIXLY_RGB_ALL_R_G_B_MIXGOCC);
    }
};



export const actuator_rm_onboard_neopixel_rgb_show_all_chase = {
    init: function () {
        this.setColour(ACTUATOR_ONBOARD_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_RGB);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_CHASE);
        this.appendValueInput("RVALUE")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_R);
        this.appendValueInput("GVALUE")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_G);
        this.appendValueInput("BVALUE")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_B);
        this.appendValueInput('time')
            .setCheck(Number)
            .appendField(Blockly.Msg.PYTHON_RANGE_STEP)
            .appendField(Blockly.Msg.MIXLY_MILLIS);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
    }
};


export const esp32_music_set_tempo = {
    init: function () {
        this.setColour(ACTUATOR_ONBOARD_HUE);
        this.appendValueInput('TICKS')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_SET_TEMPO)
            .appendField(Blockly.Msg.MICROBIT_ACTUATOR_ticks);
        this.appendValueInput('BPM')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_SPEED);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_MUSIC_SET_TEMPO);
    }
}

export const esp32_music_get_tempo = {
    init: function () {
        this.setColour(ACTUATOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_Get_current_tempo)
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_MUSIC_GET_TEMPO);
    }
}

export const esp32_music_reset = {
    init: function () {
        this.setColour(ACTUATOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_Reset_music)
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_MUSIC_RESET);
    }
}

export const esp32_onboard_music_pitch = {
    init: function () {
        this.setColour(ACTUATOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_TONE);
        this.appendValueInput('pitch')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_FREQUENCY);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_BLOCKGROUP_TONE);
    }
};

export const esp32_onboard_music_pitch_with_time = {
    init: function () {
        this.setColour(ACTUATOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_TONE);
        this.appendValueInput('pitch')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_FREQUENCY);
        this.appendValueInput('time')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_DURATION);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_BLOCKGROUP_TONE2);
    }
};

export const esp32_onboard_music_stop = {
    init: function () {
        this.setColour(ACTUATOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_NOTONE);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

export const esp32_onboard_music_play_list = {
    init: function () {
        this.setColour(ACTUATOR_ONBOARD_HUE);
        this.appendValueInput('LIST')
            .appendField(Blockly.Msg.MIXLY_ESP32_MUSIC_PLAY_LISTS)
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_MUSIC_PLAY_LISTS);

    }
}

export const rm_motor = {
    init: function () {
        this.setColour(ACTUATOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MOTOR_DC)
            .appendField(new Blockly.FieldDropdown([
                ['1', "1"],
                ["2", "2"],
                ["3", "3"]
            ]), "wheel");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_Direction)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.CLOCKWISE, "CW"],
                [Blockly.Msg.ANTI_CLOCKWISE, "CCW"],
                [Blockly.Msg.MOTOR_P, "P"],
                [Blockly.Msg.MOTOR_N, "N"]
            ]), "direction");
        this.appendValueInput('speed')
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_STEPPER_SET_SPEED);
        this.appendDummyInput("")
            .appendField("%")
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
    }
}

//c3 motor onboard

export const actuator_stepper_keep = {
    init: function () {
        this.setColour(ACTUATOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField("MixGo Car")
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.blockpy_forward, "F"],
                [Blockly.Msg.blockpy_backward, "B"],
                [Blockly.Msg.blockpy_left, "L"],
                [Blockly.Msg.blockpy_right, "R"]
            ]), "VAR");
        this.appendValueInput('speed')
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_STEPPER_SET_SPEED);
        this.appendDummyInput()
            .appendField('%')
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
    }
}

export const actuator_stepper_stop = {
    init: function () {
        this.setColour(ACTUATOR_ONBOARD_HUE);
        this.appendDummyInput("")
            .appendField("MixGo Car")
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MOTOR_P, "P"],
                [Blockly.Msg.MOTOR_N, "N"]
            ]), "VAR");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
    }
};

export const actuator_dc_motor = {
    init: function () {
        this.setColour(ACTUATOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MOTOR_DC)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLYCAR_WHEEL_LEFT, "L"],
                [Blockly.Msg.MIXLYCAR_WHEEL_RIGHT, "R"]
            ]), "wheel");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_Direction)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.CLOCKWISE, "CW"],
                [Blockly.Msg.ANTI_CLOCKWISE, "CCW"]
            ]), "direction");
        this.appendValueInput('speed')
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_STEPPER_SET_SPEED);
        this.appendDummyInput()
            .appendField('%')
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
    }
}

export const actuator_dc_motor_stop = {
    init: function () {
        this.setColour(ACTUATOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MOTOR_DC)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLYCAR_WHEEL_LEFT, "L"],
                [Blockly.Msg.MIXLYCAR_WHEEL_RIGHT, "R"]
            ]), "wheel");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_STOP)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MOTOR_P, "P"],
                [Blockly.Msg.MOTOR_N, "N"]
            ]), "direction");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
    }
}

//mixbot onboard_motor below:

export const mixbot_motor_status = {
    init: function () {
        this.setColour(ACTUATOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MIXBOT_MOTOR_STATUS);
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_MIXBOT_MOTOR_STATUS_TOOLTIP);
    }
};

export const mixbot_move = {
    init: function () {
        this.setColour(ACTUATOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXBOT)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.blockpy_forward, "F"],
                [Blockly.Msg.blockpy_backward, "B"],
                [Blockly.Msg.blockpy_left, "L"],
                [Blockly.Msg.blockpy_right, "R"]
            ]), "VAR");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_MODE)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_MICROBIT_JS_BLE_POWER, "PWR"],
                [Blockly.Msg.MIXLY_SPEED, "SPEED"],
                [Blockly.Msg.MIXLY_MIXBOT_MOTOR_TURNS, "TURNS"]
            ]), "mode");
        this.appendValueInput('speed')
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_PARAMS);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_MIXBOT_MOVE_TOOLTIP);
    }
}

export const mixbot_stop = {
    init: function () {
        this.setColour(ACTUATOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXBOT)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MOTOR_P, "P"],
                [Blockly.Msg.MOTOR_N, "N"]
            ]), "VAR");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
    }
}

export const mixbot_motor = {
    init: function () {
        this.setColour(ACTUATOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXBOT)
            .appendField(Blockly.Msg.MIXLY_MOTOR)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.TEXT_TRIM_LEFT, "1"],
                [Blockly.Msg.TEXT_TRIM_RIGHT, "2"],
                [Blockly.Msg.TEXT_TRIM_BOTH, "0"]
            ]), "wheel");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_MODE)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_MICROBIT_JS_BLE_POWER, "PWR"],
                [Blockly.Msg.MIXLY_SPEED, "SPEED"],
                [Blockly.Msg.MIXLY_MIXBOT_MOTOR_TURNS, "TURNS"]
            ]), "mode");
        this.appendValueInput('speed')
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_PARAMS);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_MIXBOT_MOVE_TOOLTIP);
    }
}

export const actuator_mixbot_buzzer_on_off = {
    init: function () {
        this.setColour(ACTUATOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MIXBOT_BUZZER);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_MICROBIT_PY_COMMUNICATE_ON, "0"],
                [Blockly.Msg.MIXLY_MICROBIT_PY_COMMUNICATE_OFF, "1"]
            ]), 'on_off')
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
};

//bitbot onboard_motor below:
export const bitbot_move = {
    init: function () {
        this.setColour(ACTUATOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.BITBOT)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.blockpy_forward, "F"],
                [Blockly.Msg.blockpy_backward, "B"],
                [Blockly.Msg.blockpy_left, "L"],
                [Blockly.Msg.blockpy_right, "R"]
            ]), "VAR");
        this.appendValueInput('speed')
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_SPEED);
        this.appendDummyInput("")
            .appendField("%")
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
    }
}

export const bitbot_stop = {
    init: function () {
        this.setColour(ACTUATOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.BITBOT)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MOTOR_P, "P"],
                [Blockly.Msg.MOTOR_N, "N"]
            ]), "VAR");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
    }
}

export const bitbot_motor = {
    init: function () {
        this.setColour(ACTUATOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.BITBOT)
            .appendField(Blockly.Msg.MIXLY_MOTOR)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.TEXT_TRIM_LEFT, "0"],
                [Blockly.Msg.TEXT_TRIM_RIGHT, "1"]
            ]), "wheel");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_Direction)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.CLOCKWISE, "CW"],
                [Blockly.Msg.ANTI_CLOCKWISE, "CCW"],
                [Blockly.Msg.MOTOR_P, "P"],
                [Blockly.Msg.MOTOR_N, "N"]
            ]), "direction");
        this.appendValueInput('speed')
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_SPEED);
        this.appendDummyInput("")
            .appendField("%")
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
    }
}

export const actuator_mixgo_nova_mic_set = {
    init: function () {
        this.setColour(ACTUATOR_ONBOARD_HUE);
        this.appendValueInput('bright')
            .appendField(Blockly.Msg.MIXLY_MIXBOT_SOUND_SET_LOUDNESS)
        this.appendDummyInput()
            .appendField('%');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_LED_SETONOFF);
    }
};

export const actuator_mixgo_nova_mic_get = {
    init: function () {
        this.setColour(ACTUATOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MIXBOT_SOUND_LOUDNESS + '(%)');
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_LED_GETONOFF);
    }
};

export const actuator_mixgo_nova_voice_set = {
    init: function () {
        this.setColour(ACTUATOR_ONBOARD_HUE);
        this.appendValueInput('bright')
            .appendField(Blockly.Msg.MIXLY_SETTING + Blockly.Msg.MIXLY_MIXBOT_BUZZER + Blockly.Msg.MIXLY_MP3_VOL)
        this.appendDummyInput()
            .appendField('%');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_LED_SETONOFF);
    }
};

export const actuator_mixgo_nova_voice_get = {
    init: function () {
        this.setColour(ACTUATOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GET + Blockly.Msg.MIXLY_MIXBOT_BUZZER + Blockly.Msg.MIXLY_MP3_VOL + '(%)');
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_LED_GETONOFF);
    }
};



export const actuator_mixgo_nova_record_audio = {
    init: function () {
        this.setColour(ACTUATOR_ONBOARD_HUE);
        this.appendValueInput('PATH')
            .appendField(Blockly.Msg.MIXLY_RECORD_AUDIO)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_THE_PATH);
        this.appendValueInput('TIME')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_GET_PRESSES_TIME);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
}

export const actuator_mixgo_nova_play_audio = {
    init: function () {
        this.setColour(ACTUATOR_ONBOARD_HUE);
        this.appendValueInput('PATH')
            .appendField(Blockly.Msg.MIXLY_PLAY_AUDIO)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_THE_PATH);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
}

export const actuator_mixgo_nova_play_online_audio = {
    init: function () {
        this.setColour(ACTUATOR_ONBOARD_HUE);
        this.appendValueInput('PATH')
            .appendField(Blockly.Msg.MIXLY_PLAY_ONLINE_AUDIO)
            .appendField('URL');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
}

export const actuator_mixgo_nova_onboard_music_pitch = {
    init: function () {
        this.setColour(ACTUATOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_TONE);
        this.appendValueInput('pitch')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_FREQUENCY);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_BLOCKGROUP_TONE);
    }
};

export const actuator_mixgo_nova_onboard_music_stop = {
    init: function () {
        this.setColour(ACTUATOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_NOTONE);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

export const set_power_output = {
    init: function () {
        this.setColour(ACTUATOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.LISTS_SET_INDEX_SET + Blockly.Msg.ME_GO_MOTOR_EXTERN)
            .appendField(Blockly.Msg.PIN_NUMBERING)
            .appendField(new Blockly.FieldDropdown([["1", "1"], ["2", "2"]]), "index");
        this.appendValueInput('duty')
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.blynk_IOT_IR_POWER + Blockly.Msg.MIXLY_PINMODEOUT);
        this.appendDummyInput()
            .appendField('%')
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip();
    }
}

export const get_power_output = {
    init: function () {
        this.setColour(ACTUATOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GET + Blockly.Msg.ME_GO_MOTOR_EXTERN)
            .appendField(Blockly.Msg.PIN_NUMBERING)
            .appendField(new Blockly.FieldDropdown([["1", "1"], ["2", "2"]]), "index");
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.blynk_IOT_IR_POWER + Blockly.Msg.MIXLY_PINMODEOUT + Blockly.Msg.MIXLY_DUTY_RATIO);
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
}

export const set_all_power_output = {
    init: function () {
        this.setColour(ACTUATOR_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.LISTS_SET_INDEX_SET + Blockly.Msg.ME_GO_MOTOR_EXTERN)
            .appendField(Blockly.Msg.MIXLY_ALL + Blockly.Msg.PIN_NUMBERING);
        this.appendValueInput('duty')
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.blynk_IOT_IR_POWER + Blockly.Msg.MIXLY_PINMODEOUT + Blockly.Msg.MIXLY_FREQUENCY);
        this.appendDummyInput()
            .appendField('Hz')
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_MIXBOT_MOTOR_EXTERN_TOOLTIP);
    }
}