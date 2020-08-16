'use strict';

goog.provide('Blockly.Python.logic');

goog.require('Blockly.Python');

Blockly.Python.logic_compare = function() {
  // Comparison operator.
  var mode = this.getFieldValue('OP');
  var operator = Blockly.Python.logic_compare.OPERATORS[mode];
  var order = (operator == '==' || operator == '!=') ?
      Blockly.Python.ORDER_EQUALITY : Blockly.Python.ORDER_RELATIONAL;
  var argument0 = Blockly.Python.valueToCode(this, 'A', order) || '0';
  var argument1 = Blockly.Python.valueToCode(this, 'B', order) || '0';
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

Blockly.Python.logic_compare_continous = function() {
  // Comparison operator.
  var mode1 = this.getFieldValue('OP1');
  var operator1 = Blockly.Python.logic_compare.OPERATORS[mode1];
  var mode2 = this.getFieldValue('OP2');
  var operator2 = Blockly.Python.logic_compare.OPERATORS[mode2];  
  var argument0 = Blockly.Python.valueToCode(this, 'A', Blockly.Python.ORDER_RELATIONAL) || '0';
  var argument1 = Blockly.Python.valueToCode(this, 'B', Blockly.Python.ORDER_RELATIONAL) || '0';
  var argument2 = Blockly.Python.valueToCode(this, 'C', Blockly.Python.ORDER_RELATIONAL) || '0';
  var code = argument0 + ' ' + operator1 + ' ' + argument1 + ' ' + operator2 + ' ' + argument2;
  return [code, Blockly.Python.ORDER_RELATIONAL];
};

Blockly.Python.logic_compare.OPERATORS = {
  EQ: '==',
  NEQ: '!=',
  LT: '<',
  LTE: '<=',
  GT: '>',
  GTE: '>='
};

Blockly.Python.logic_operation = function() {
  // Operations 'and', 'or'.
  var operator = (this.getFieldValue('OP') == 'AND') ? 'and' : 'or';
  var order = (operator == '&&') ? Blockly.Python.ORDER_LOGICAL_AND :
      Blockly.Python.ORDER_LOGICAL_OR;
  var argument0 = Blockly.Python.valueToCode(this, 'A', order) || 'False';
  var argument1 = Blockly.Python.valueToCode(this, 'B', order) || 'False';
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

Blockly.Python.logic_negate = function() {
  // Negation.
  var order = Blockly.Python.ORDER_UNARY_PREFIX;
  var argument0 = Blockly.Python.valueToCode(this, 'BOOL', order) || 'False';
  var code = 'not ' + argument0;
  return [code, order];
};

Blockly.Python.logic_boolean = function() {
  // Boolean values true and false.
  var code = (this.getFieldValue('BOOL') == 'TRUE') ? 'True' : 'False';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.logic_null = function() {
  var code = 'None';
  return [code ,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.logic_true_or_false = function() {
  var a = Blockly.Python.valueToCode(this, 'A',Blockly.Python.ORDER_ATOMIC) || 'False';
  var b = Blockly.Python.valueToCode(this, 'B',Blockly.Python.ORDER_ATOMIC) || 'False';
  var c = Blockly.Python.valueToCode(this, 'C',Blockly.Python.ORDER_ATOMIC) || 'False';
  var code='(' + b+' if '+a+' else '+c+')';
  return [code ,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.logic_is_in = function() {
  var a = Blockly.Python.valueToCode(this, 'A',Blockly.Python.ORDER_ATOMIC) || '\'\'';
  var b = Blockly.Python.valueToCode(this, 'B',Blockly.Python.ORDER_ATOMIC) || '\'\'';
  var bool = this.getFieldValue('BOOL');
  var code=a+' '+bool+' '+b;
  return [code ,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.logic_is = function() {
  var a = Blockly.Python.valueToCode(this, 'A',Blockly.Python.ORDER_ATOMIC) || '\'\'';
  var b = Blockly.Python.valueToCode(this, 'B',Blockly.Python.ORDER_ATOMIC) || '\'\'';
  var bool = this.getFieldValue('BOOL');
  var code=a+' '+bool+' '+b;
  return [code ,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.logic_tobool = function() {  
  var str = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) || '0'
  return ['bool('+str+')', Blockly.Python.ORDER_ATOMIC];
};