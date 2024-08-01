import * as Blockly from 'blockly/core';
import { Profile } from 'mixly';

import Variables from '@mixly/python/others/variables';
import Procedures from '@mixly/python/others/procedures';
import { Python } from '@mixly/python/python_generator';

import * as PythonVariablesBlocks from '@mixly/python/blocks/variables';
import * as PythonControlBlocks from '@mixly/python/blocks/control';
import * as PythonMathBlocks from '@mixly/python/blocks/math';
import * as PythonTextBlocks from '@mixly/python/blocks/text';
import * as PythonListsBlocks from '@mixly/python/blocks/lists';
import * as PythonDictsBlocks from '@mixly/python/blocks/dicts';
import * as PythonLogicBlocks from '@mixly/python/blocks/logic';
import * as PythonStorageBlocks from '@mixly/python/blocks/storage';
import * as PythonProceduresBlocks from '@mixly/python/blocks/procedures';
import * as PythonTupleBlocks from '@mixly/python/blocks/tuple';
import * as PythonSetBlocks from '@mixly/python/blocks/set';
import * as PythonHtmlBlocks from '@mixly/python/blocks/html';
import * as PythonUtilityBlocks from '@mixly/python/blocks/utility';

import * as MixPyAlgorithmBlocks from '@mixly/python-mixpy/blocks/algorithm';
import * as MixPyFactoryBlocks from '@mixly/python-mixpy/blocks/factory';

import * as DataBlocks from './blocks/data';
import * as InoutBlocks from './blocks/inout';
import * as IotBlocks from './blocks/iot';
import * as SystemBlocks from './blocks/system';
import * as TurtleBlocks from './blocks/turtle';

import * as PythonVariablesGenerators from '@mixly/python/generators/variables';
import * as PythonControlGenerators from '@mixly/python/generators/control';
import * as PythonMathGenerators from '@mixly/python/generators/math';
import * as PythonTextGenerators from '@mixly/python/generators/text';
import * as PythonListsGenerators from '@mixly/python/generators/lists';
import * as PythonDictsGenerators from '@mixly/python/generators/dicts';
import * as PythonLogicGenerators from '@mixly/python/generators/logic';
import * as PythonStorageGenerators from '@mixly/python/generators/storage';
import * as PythonProceduresGenerators from '@mixly/python/generators/procedures';
import * as PythonTupleGenerators from '@mixly/python/generators/tuple';
import * as PythonSetGenerators from '@mixly/python/generators/set';
import * as PythonHtmlGenerators from '@mixly/python/generators/html';
import * as PythonUtilityGenerators from '@mixly/python/generators/utility';

import * as MixPyAlgorithmGenerators from '@mixly/python-mixpy/generators/algorithm';
import * as MixPyFactoryGenerators from '@mixly/python-mixpy/generators/factory';

import * as DataGenerators from './generators/data';
import * as InoutGenerators from './generators/inout';
import * as IotGenerators from './generators/iot';
import * as SystemGenerators from './generators/system';
import * as TurtleGenerators from './generators/turtle';

import './others/loader';

import './css/color_mixpy_python_skulpt.css';

Object.assign(Blockly.Variables, Variables);
Object.assign(Blockly.Procedures, Procedures);
Blockly.Python = Python;
Blockly.generator = Python;

Profile.default = {};

Object.assign(
    Blockly.Blocks,
    PythonVariablesBlocks,
    PythonControlBlocks,
    PythonMathBlocks,
    PythonTextBlocks,
    PythonListsBlocks,
    PythonDictsBlocks,
    PythonLogicBlocks,
    PythonStorageBlocks,
    PythonProceduresBlocks,
    PythonTupleBlocks,
    PythonSetBlocks,
    PythonHtmlBlocks,
    PythonUtilityBlocks,
    MixPyAlgorithmBlocks,
    MixPyFactoryBlocks,
    DataBlocks,
    InoutBlocks,
    IotBlocks,
    SystemBlocks,
    TurtleBlocks
);

Object.assign(
    Blockly.Python.forBlock,
    PythonVariablesGenerators,
    PythonControlGenerators,
    PythonMathGenerators,
    PythonTextGenerators,
    PythonListsGenerators,
    PythonDictsGenerators,
    PythonLogicGenerators,
    PythonStorageGenerators,
    PythonProceduresGenerators,
    PythonTupleGenerators,
    PythonSetGenerators,
    PythonHtmlGenerators,
    PythonUtilityGenerators,
    MixPyAlgorithmGenerators,
    MixPyFactoryGenerators,
    DataGenerators,
    InoutGenerators,
    IotGenerators,
    SystemGenerators,
    TurtleGenerators
);