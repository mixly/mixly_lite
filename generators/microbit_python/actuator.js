'use strict';

goog.provide('Blockly.Python.actuator');
goog.require('Blockly.Python');

Blockly.Python.microbit_music_play_built_in = function(block) {
    Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Blockly.Python.definitions_['import_music'] = 'import music';
    var dropdown_melody = block.getFieldValue('melody');
    var pin = Blockly.Python.valueToCode(block, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var checkbox_wait = block.getFieldValue('wait') == 'TRUE' ? 'True' : 'False';
    var checkbox_loop = block.getFieldValue('loop') == 'TRUE' ? 'True' : 'False';
    var code = 'music.play(music.' + dropdown_melody + ', pin=pin' + pin +', wait=' + checkbox_wait + ', loop=' + checkbox_loop + ')\n';
    return code;
};

Blockly.Python.microbit_music_play_built_in_easy = function(block) {
    Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Blockly.Python.definitions_['import_music'] = 'import music';
    var dropdown_melody = block.getFieldValue('melody');
    var pin = Blockly.Python.valueToCode(block, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var code = 'music.play(music.' + dropdown_melody + ', pin=pin' + pin +')\n';
    return code;
};

Blockly.Python.microbit_music_pitch_delay = function(block) {
    Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Blockly.Python.definitions_['import_music'] = 'import music';
    Blockly.Python.definitions_['import_math'] = 'import math';
    var number_pitch = Blockly.Python.valueToCode(block, 'pitch', Blockly.Python.ORDER_ATOMIC);
    var number_duration = Blockly.Python.valueToCode(block, 'duration', Blockly.Python.ORDER_ATOMIC);
    var pin = Blockly.Python.valueToCode(block, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var checkbox_wait = block.getFieldValue('wait') == 'TRUE' ? 'True' : 'False';
    var code = 'music.pitch(round(' + number_pitch + '), round(' + number_duration + '), pin' + pin + ', wait = ' + checkbox_wait + ')\n';
    return code;
};

Blockly.Python.microbit_music_pitch = function(block) {
    Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Blockly.Python.definitions_['import_music'] = 'import music';
    Blockly.Python.definitions_['import_math'] = 'import math';
    var number_pitch = Blockly.Python.valueToCode(block, 'pitch', Blockly.Python.ORDER_ATOMIC);
    // var number_duration = Blockly.Python.valueToCode(block, 'duration', Blockly.Python.ORDER_ATOMIC);
    var pin = Blockly.Python.valueToCode(block, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var code = 'music.pitch(round(' + number_pitch + '), pin=pin' + pin + ')\n';
    return code;
};

Blockly.Python.microbit_music_play_list_of_notes = function(block) {
    Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Blockly.Python.definitions_['import_music'] = 'import music';
    var pin = Blockly.Python.valueToCode(block, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var value_notes = Blockly.Python.valueToCode(block, 'notes', Blockly.Python.ORDER_ATOMIC) ||'[]';
    var checkbox_wait = block.getFieldValue('wait') == 'TRUE' ? 'True' : 'False';
    var checkbox_loop = block.getFieldValue('loop') == 'TRUE' ? 'True' : 'False';
    var code = 'music.play(' + value_notes + ', pin=pin' + pin + ', wait=' + checkbox_wait + ', loop=' + checkbox_loop + ')\n';
    return code;
};



Blockly.Python.microbit_music_reset = function(block) {
    Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Blockly.Python.definitions_['import_music'] = 'import music';
    var code = 'music.reset()\n';
    return code;
};

Blockly.Python.microbit_music_stop = function(block) {
    Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Blockly.Python.definitions_['import_music'] = 'import music';
    var pin = Blockly.Python.valueToCode(block, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var code = 'music.stop(pin' + pin + ')\n';
    return code;
};

Blockly.Python.microbit_music_get_tempo = function(block) {
    Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Blockly.Python.definitions_['import_music'] = 'import music';
    var code = 'music.get_tempo()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.tone_set_tempo=function(){
    Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var bpm = Blockly.Python.valueToCode(this, 'BPM', Blockly.Python.ORDER_ASSIGNMENT);
    var ticks = Blockly.Python.valueToCode(this, 'TICKS', Blockly.Python.ORDER_ASSIGNMENT);
    var code = "music.set_tempo(ticks="+ ticks +", bpm="+ bpm +")\n";
    return code;
};

Blockly.Python.speech_translate=function(){
    Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Blockly.Python.definitions_['import_speech'] = 'import speech';
    var text = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var code = ["speech.translate("+ text +")", Blockly.Python.ORDER_ATOMIC];
    return code
};

Blockly.Python.speech_say=function(){
    Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Blockly.Python.definitions_['import_speech'] = 'import speech';
    var mode = this.getFieldValue("MODE");
    var text = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var pitch = Blockly.Python.valueToCode(this, 'pitch', Blockly.Python.ORDER_ATOMIC);
    var speed = Blockly.Python.valueToCode(this, 'speed', Blockly.Python.ORDER_ATOMIC);
    var mouth = Blockly.Python.valueToCode(this, 'mouth', Blockly.Python.ORDER_ATOMIC);
    var throat = Blockly.Python.valueToCode(this, 'throat', Blockly.Python.ORDER_ATOMIC);
    var code = "speech."+mode+"("+ text +", pitch="+pitch+", speed="+speed+", mouth="+mouth+", throat="+throat+")\n";
    return code
};

// Blockly.Python.speech_sing=function(){
//   Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
//   Blockly.Python.definitions_['import_speech'] = 'import speech';
//   var text = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
//   var pitch = Blockly.Python.valueToCode(this, 'pitch', Blockly.Python.ORDER_ATOMIC);
//   var speed = Blockly.Python.valueToCode(this, 'speed', Blockly.Python.ORDER_ATOMIC);
//   var mouth = Blockly.Python.valueToCode(this, 'mouth', Blockly.Python.ORDER_ATOMIC);
//   var throat = Blockly.Python.valueToCode(this, 'throat', Blockly.Python.ORDER_ATOMIC);
//   var code = "speech.sing("+ text +", pitch="+pitch+", speed="+speed+", mouth="+mouth+", throat="+throat+")\n";
//   return code
// };


// Blockly.Python.speech_prenounce=function(){
//   Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
//   Blockly.Python.definitions_['import_speech'] = 'import speech';
//   var text = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
//   var pitch = Blockly.Python.valueToCode(this, 'pitch', Blockly.Python.ORDER_ATOMIC);
//   var speed = Blockly.Python.valueToCode(this, 'speed', Blockly.Python.ORDER_ATOMIC);
//   var mouth = Blockly.Python.valueToCode(this, 'mouth', Blockly.Python.ORDER_ATOMIC);
//   var throat = Blockly.Python.valueToCode(this, 'throat', Blockly.Python.ORDER_ATOMIC);
//   var code = "speech.pronounce("+ text +", pitch="+pitch+", speed="+speed+", mouth="+mouth+", throat="+throat+")\n";
//   return code
// };

Blockly.Python.speech_say_easy=function(){
    Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Blockly.Python.definitions_['import_speech'] = 'import speech';
    var text = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var code = "speech.say("+ text +")\n";
    return code
};

Blockly.Python.speech_sing_easy=function(){
    Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Blockly.Python.definitions_['import_speech'] = 'import speech';
    var text = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var code = "speech.sing("+ text +")\n";
    return code
};


Blockly.Python.speech_pronounce_easy=function(){
    Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Blockly.Python.definitions_['import_speech'] = 'import speech';
    var text = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var code = "speech.pronounce("+ text +")\n";
    return code
};

Blockly.Python.servo_move = function() {
    Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Blockly.Python.setups_['class_servo'] =
        'class Servo:\n'+
        '    def __init__(self, pin, freq=50, min_us=600, max_us=2400, angle=180):\n'+
        '        self.min_us = min_us\n'+
        '        self.max_us = max_us\n'+
        '        self.us = 0\n'+
        '        self.freq = freq\n'+
        '        self.angle = angle\n'+
        '        self.analog_period = 0\n'+
        '        self.pin = pin\n'+
        '        analog_period = round((1/self.freq) * 1000)\n'+
        '        self.pin.set_analog_period(analog_period)\n\n'+

        '    def write_us(self, us):\n'+
        '        us = min(self.max_us, max(self.min_us, us))\n'+
        '        duty = round(us * 1024 * self.freq // 1000000)\n'+
        '        self.pin.write_analog(duty)\n'+
        '        self.pin.write_digital(0)\n\n'+
        '    def write_angle(self, degrees=None):\n'+
        '        degrees = degrees % 360\n'+
        '        total_range = self.max_us - self.min_us\n'+
        '        us = self.min_us + total_range * degrees // self.angle\n'+
        '        self.write_us(us)\n'+
        '\n'+
        'def mixly_servo_write_angle(pin, degree):\n'+
        '    Servo(pin).write_angle(degree)'+
        '\n';

    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN',Blockly.Python.ORDER_ATOMIC);
    var value_degree = Blockly.Python.valueToCode(this, 'DEGREE', Blockly.Python.ORDER_ATOMIC);

    var code = 'mixly_servo_write_angle('+dropdown_pin+', '+value_degree+')\n';
    return code;
};

Blockly.Python.bit_motor_control = function() {
    Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Blockly.Python.setups_['class_bit_motor_control'] =
        'def initPCA9685():\n'+
        '    i2c.write(0x40, bytearray([0x00, 0x00]))\n'+
        '    setFreq(50)\n'+
        '    for idx in range(0, 16, 1):\n'+
        '        setPwm(idx, 0 ,0)\n'+
        'def MotorRun(Motors, speed):\n'+
        '    speed = speed * 16\n'+
        '    if (speed >= 4096):\n'+
        '        speed = 4095\n'+
        '    if (speed <= -4096):\n'+
        '        speed = -4095\n'+
        '    if (Motors <= 4 and Motors > 0):\n'+
        '        pp = (Motors - 1) * 2\n'+
        '        pn = (Motors - 1) * 2 + 1\n'+
        '        if (speed >= 0):\n'+
        '            setPwm(pp, 0, speed)\n'+
        '            setPwm(pn, 0, 0)\n'+
        '        else :\n'+
        '            setPwm(pp, 0, 0)\n'+
        '            setPwm(pn, 0, -speed)\n'+
        'def Servo(Servos, degree):\n'+
        '    v_us = (degree * 1800 / 180 + 600)\n'+
        '    value = int(v_us * 4096 / 20000)\n'+
        '    setPwm(Servos + 7, 0, value)\n'+
        'def setFreq(freq):\n'+
        '    prescaleval = int(25000000/(4096*freq)) - 1\n'+
        '    i2c.write(0x40, bytearray([0x00]))\n'+
        '    oldmode = i2c.read(0x40, 1)\n'+
        '    newmode = (oldmode[0] & 0x7F) | 0x10\n'+
        '    i2c.write(0x40, bytearray([0x00, newmode]))\n'+
        '    i2c.write(0x40, bytearray([0xfe, prescaleval]))\n'+
        '    i2c.write(0x40, bytearray([0x00, oldmode[0]]))\n'+
        '    sleep(4)\n'+
        '    i2c.write(0x40, bytearray([0x00, oldmode[0] | 0xa1]))\n'+
        'def setPwm(channel, on, off):\n'+
        '    if (channel >= 0 and channel <= 15):\n'+
        '        buf = bytearray([0X06 + 4 * channel, on & 0xff, (on >> 8) & 0xff, off & 0xff, (off >> 8) & 0xff])\n'+
        '        i2c.write(0x40, buf)\n'+
        'def setStepper(stpMotors, dir, speed):\n'+
        '    spd = speed\n'+
        '    setFreq(spd)\n'+
        '    if (stpMotors == 1):\n'+
        '        if (dir):\n'+
        '            setPwm(0, 2047, 4095)\n'+
        '            setPwm(1, 1, 2047)\n'+
        '            setPwm(2, 1023, 3071)\n'+
        '            setPwm(3, 3071, 1023)\n'+
        '        else:\n'+
        '            setPwm(3, 2047, 4095)\n'+
        '            setPwm(2, 1, 2047)\n'+
        '            setPwm(1, 1023, 3071)\n'+
        '            setPwm(0, 3071, 1023)\n'+
        '    elif (stpMotors == 2):\n'+
        '        if (dir):\n'+
        '            setPwm(4, 2047, 4095)\n'+
        '            setPwm(5, 1, 2047)\n'+
        '            setPwm(6, 1023, 3071)\n'+
        '            setPwm(7, 3071, 1023)\n'+
        '        else:\n'+
        '            setPwm(7, 2047, 4095)\n'+
        '            setPwm(6, 1, 2047)\n'+
        '            setPwm(4, 1023, 3071)\n'+
        '            setPwm(5, 3071, 1023)\n\n'+
        'initPCA9685()\n'

    var Motor= this.getFieldValue('Motor');
    var mode= this.getFieldValue('mode');
    var speed = Blockly.Python.valueToCode(this, 'speed', Blockly.Python.ORDER_ATOMIC);

    var code = 'MotorRun('+Motor+', '+mode+''+speed+')\n';
    return code;
};

Blockly.Python.display_rgb_init=function(){
    var dropdown_rgbpin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var value_ledcount = Blockly.Python.valueToCode(this, 'LEDCOUNT', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Blockly.Python.definitions_['import_neopixel'] = 'import neopixel';
    // Blockly.Python.definitions_['include_display'] = '#include "Mixly.h"';
    Blockly.Python.setups_['var_rgb_display' + dropdown_rgbpin] = 'np = neopixel.NeoPixel(pin' + dropdown_rgbpin +  ', ' + value_ledcount + ')\n';
    // Blockly.Python.setups_['setup_rgb_display_begin_' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.begin();';
    // Blockly.Python.setups_['setup_rgb_display_setpin' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.setPin(' + dropdown_rgbpin + ');';
    return '';
};
Blockly.Python.display_rgb=function(){

  var value_led = Blockly.Python.valueToCode(this, '_LED_', Blockly.Python.ORDER_ATOMIC);
  var value_rvalue = Blockly.Python.valueToCode(this, 'RVALUE', Blockly.Python.ORDER_ATOMIC);
  var value_gvalue = Blockly.Python.valueToCode(this, 'GVALUE', Blockly.Python.ORDER_ATOMIC);
  var value_bvalue = Blockly.Python.valueToCode(this, 'BVALUE', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
  Blockly.Python.definitions_['import_neopixel'] = 'import neopixel';
  Blockly.Python.setups_['mixly_rgb_show'] = Blockly.Python.FUNCTION_MIXLY_RGB_SHOW;
  var code ='mixly_rgb_show(' + value_led + ', ' + value_rvalue + ', ' + value_gvalue + ', ' + value_bvalue + ')\n';
  return code;
};

Blockly.Python.display_rgb2=function(){

  var value_led = Blockly.Python.valueToCode(this, '_LED_', Blockly.Python.ORDER_ATOMIC);
  var colour_rgb_led_color = this.getFieldValue('RGB_LED_COLOR');
  var color = goog.color.hexToRgb(colour_rgb_led_color);
  Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
  Blockly.Python.definitions_['import_neopixel'] = 'import neopixel';

  var code = 'np['+value_led+'] = ('+color+')\n';
  code+='np.show()\n';
  return code;
};