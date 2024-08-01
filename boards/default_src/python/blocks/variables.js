import * as Blockly from 'blockly/core';
import Names from '../others/names';

const VARIABLES_HUE = 330//'#af5180'//330;

// ************************************************************************
// THIS SECTION IS INSERTED INTO BLOCKLY BY BLOCKLYDUINO.
//  export const variables_declare = {
//  // Variable setter.
//   init: function() {
//     this.setColour(VARIABLES_HUE);
//     this.appendValueInput('VALUE', null)
//         .appendField(Blockly.Msg.MIXLY_DECLARE)
//         .appendField(new Blockly.FieldTextInput(''), 'VAR')
//         //.appendField(Blockly.Msg.MIXLY_AS)
//         //.appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_NUMBER, 'number'], [Blockly.Msg.LANG_MATH_STRING, 'string'], [Blockly.Msg.LANG_MATH_BOOLEAN, 'boolean']]), 'TYPE')
// 	    .appendField(Blockly.Msg.MIXLY_VALUE);
//     this.setPreviousStatement(true);
//     this.setNextStatement(true);
//     this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_VARIABLES_DECLARE);
//   },
//   getVars: function() {
//     return [this.getFieldValue('VAR')];
//   },
//   renameVar: function(oldName, newName) {
//     if (Names.equals(oldName, this.getFieldValue('VAR'))) {
//       this.setTitleValue(newName, 'VAR');
//     }
//   }
// };
// ************************************************************************

export const variables_get = {
    init: function () {
        this.setColour(VARIABLES_HUE);
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput(''), 'VAR')
        this.setOutput(true);
        this.setTooltip(Blockly.Msg.VARIABLES_GET_TOOLTIP);
    },
    getVars: function () {
        return [this.getFieldValue('VAR')];
    },
    renameVar: function (oldName, newName) {
        if (Names.equals(oldName, this.getFieldValue('VAR'))) {
            this.setFieldValue(newName, 'VAR');
        }
    }/*,
  onchange: function() {
	  var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'),Blockly.Variables.NAME_TYPE);
	  if(Blockly.Arduino.definitions_['var_declare'+varName]){
		  this.setWarningText(null);
	  }else{
		  this.setWarningText(Blockly.Msg.MIXLY_WARNING_NOT_DECLARE);
	  }
  }*/
};

// export const variables_set = {
//   init: function() {
//     this.setColour(VARIABLES_HUE);
//     this.appendValueInput('VALUE')
//         .appendField(new Blockly.FieldTextInput(''), 'VAR')
// 		.appendField(Blockly.Msg.MIXLY_VALUE2);
//     this.setPreviousStatement(true);
//     this.setNextStatement(true);
//     this.setTooltip(Blockly.Msg.VARIABLES_SET_TOOLTIP);
//   },
//   getVars: function() {
//     return [this.getFieldValue('VAR')];
//   },
//   renameVar: function(oldName, newName) {
//     if (Names.equals(oldName, this.getFieldValue('VAR'))) {
//       this.setFieldValue(newName, 'VAR');
//     }
//   }/*,
//   onchange: function() {
// 	  var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'),Blockly.Variables.NAME_TYPE);
// 	  if(Blockly.Arduino.definitions_['var_declare'+varName]){
// 		  this.setWarningText(null);
// 	  }else{
// 		  this.setWarningText(Blockly.Msg.MIXLY_WARNING_NOT_DECLARE);
// 	  }
//   }*/
// };
export const variables_set = {
    init: function () {
        this.setColour(VARIABLES_HUE);
        this.appendValueInput('VALUE')
            .appendField(new Blockly.FieldTextInput(''), 'VAR')
            .appendField(Blockly.Msg.MIXLY_VALUE2);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.VARIABLES_SET_TOOLTIP);
    },
    getVars: function () {
        var varValue = this.getFieldValue('VAR');
        if (varValue == null) {
            return [];
        }
        return varValue.split(",");
    },
    renameVar: function (oldName, newName) {
        if (Names.equals(oldName, this.getFieldValue('VAR'))) {
            this.setFieldValue(newName, 'VAR');
        }
    }
};
/**
  * Block for basic data type change.
  * @this Blockly.Block
  */
export const variables_change = {
    init: function () {
        this.setColour(VARIABLES_HUE);
        var DATATYPES =
            [
                [Blockly.Msg.LANG_MATH_INT, "int"],
                [Blockly.Msg.LANG_MATH_FLOAT, "float"],
                [Blockly.Msg.LANG_MATH_BOOLEAN, "bool"],
                // [Blockly.Msg.MIXLY_MICROPYTHON_TYPE_COMPLEX, "complex"],
                [Blockly.Msg.LANG_MATH_STRING, "str"],
                [Blockly.Msg.MIXLY_MICROBIT_TYPE_LIST, "list"],
                [Blockly.Msg.MIXLY_MICROBIT_TYPE_TUPLE, "tuple"],
                [Blockly.Msg.MIXLY_MICROBIT_TYPE_DICT, "dict"],
                [Blockly.Msg.blockpy_SET_CREATE_WITH_CONTAINER_TITLE_ADD, "set"],
                [Blockly.Msg.LANG_MATH_BYTE, "bytes"]
            ];
        this.appendValueInput('MYVALUE')
            .appendField(new Blockly.FieldDropdown(DATATYPES), 'OP');
        // Assign 'this' to a variable for use in the tooltip closure below.
        this.setOutput(true);
        // this.setInputsInline(true);

    }
};


export const variables_global = {
    init: function () {
        this.setColour(VARIABLES_HUE);
        this.appendValueInput("VAR")
            .appendField(Blockly.Msg.MIXLY_PYTHON_GLOBAL)
            .setCheck("var");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.TEXT_PRINT_TOOLTIP);
    }
};


export const controls_type = {
    init: function () {
        this.setColour(VARIABLES_HUE);
        this.appendValueInput("DATA")
            .appendField(Blockly.Msg.MICROBIT_PYTHON_TYPE);
        // this.setInputsInline(true);
        this.setOutput(true);
        this.setTooltip(Blockly.Msg.MICROBIT_PYTHON_TYPE);
    }
};


export const controls_typeLists = {
    init: function () {
        this.setColour(VARIABLES_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_CONTORL_GET_TYPE)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.LANG_MATH_INT, "int"],
                [Blockly.Msg.MIXLY_MICROBIT_TYPE_FLOAT, "float"],
                [Blockly.Msg.MIXLY_MICROBIT_TYPE_STRING, "str"],
                [Blockly.Msg.MIXLY_MICROBIT_TYPE_LIST, "list"],
                [Blockly.Msg.MIXLY_MICROBIT_TYPE_TUPLE, "tuple"],
                [Blockly.Msg.MIXLY_MICROBIT_TYPE_DICT, "dict"],
                [Blockly.Msg.blockpy_SET_CREATE_WITH_CONTAINER_TITLE_ADD, "set"],
                [Blockly.Msg.LANG_MATH_BYTE, "bytes"],
                // [Blockly.Msg.MIXLY_MICROBIT_IMAGE,"image"],
                [Blockly.Msg.LOGIC_NULL, "type(None)"]]), "type");
        //整数、浮点数、字符串、列表、元组、字典、集合、图像不太对, unfinished
        this.setInputsInline(true);
        this.setOutput(true);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('type');
            var mode0 = Blockly.Msg.MICROBIT_controls_TypeLists;
            var TOOLTIPS = {
                'int': Blockly.Msg.LANG_MATH_INT,
                'float': Blockly.Msg.MIXLY_MICROBIT_TYPE_FLOAT,
                'str': Blockly.Msg.MIXLY_MICROBIT_TYPE_STRING,
                'list': Blockly.Msg.MIXLY_MICROBIT_TYPE_LIST,
                'tuple': Blockly.Msg.MIXLY_MICROBIT_TYPE_TUPLE,
                'dict': Blockly.Msg.MIXLY_MICROBIT_TYPE_DICT,
                'set': Blockly.Msg.blockpy_SET_CREATE_WITH_CONTAINER_TITLE_ADD,
                'image': Blockly.Msg.MIXLY_MICROBIT_IMAGE,
                'bytes': Blockly.Msg.LANG_MATH_BYTE,
                'NoneType': Blockly.Msg.LOGIC_NULL
            };
            return mode0 + TOOLTIPS[mode];
        });
    }
};