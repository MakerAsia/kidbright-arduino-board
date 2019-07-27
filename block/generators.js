module.exports = function(Blockly){
'use strict';

Blockly.JavaScript['taskNumber'] = 0;

Blockly.JavaScript.resetTaskNumber = function(block) {
	Blockly.JavaScript['taskNumber'] = 0;
};

Blockly.JavaScript['basic_delay'] = function(block) {
	return 'vTaskDelay(' + parseInt(1000 * parseFloat(block.getFieldValue('VALUE'))) + ' / portTICK_RATE_MS);\n';
};

Blockly.JavaScript['basic_forever'] = function(block) {
	return 'while(1) {\n' + Blockly.JavaScript.statementToCode(block, 'HANDLER') + '}\n';
};

Blockly.JavaScript['basic_string'] = function(block) {
	return [
		'(char *)"' + block.getFieldValue('VALUE') + '"',
		Blockly.JavaScript.ORDER_ATOMIC
	];
};

// =============================================================================
// math
// =============================================================================
Blockly.JavaScript['math_number'] = function(block) {
	return [
		'(double)' + block.getFieldValue('VALUE'),
		Blockly.JavaScript.ORDER_ATOMIC
	];
};

Blockly.JavaScript['math_arithmetic'] = function(block) {
	// Basic arithmetic operators, and power.
	var OPERATORS = {
		ADD: [' + ', Blockly.JavaScript.ORDER_ADDITION],
		MINUS: [' - ', Blockly.JavaScript.ORDER_SUBTRACTION],
		MULTIPLY: [' * ', Blockly.JavaScript.ORDER_MULTIPLICATION],
		DIVIDE: [' / ', Blockly.JavaScript.ORDER_DIVISION],
//		POWER: [' ^ ', Blockly.JavaScript.ORDER_EXPONENTIATION],
		MODULO: [' % ', Blockly.JavaScript.ORDER_DIVISION]
	};
	var tuple = OPERATORS[block.getFieldValue('OP')];
	var operator = tuple[0];
	var order = tuple[1];
	var argument0 = Blockly.JavaScript.valueToCode(block, 'A', order) || '0';
	var argument1 = Blockly.JavaScript.valueToCode(block, 'B', order) || '0';
	var code;
	/*// Power in JavaScript requires a special case since it has no operator.
	if (!operator) {
		code = 'Math.pow(' + argument0 + ', ' + argument1 + ')';
		return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
	}*/
	// modulo allow only integer
	if (block.getFieldValue('OP') == 'MODULO') {
		argument0 = '(int)(' + argument0 + ')';
		argument1 = '(int)(' + argument1 + ')';
	}
	code = argument0 + operator + argument1;

	return [code, order];
};

Blockly.JavaScript['math_variables_set'] = function(block) {
	var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
	var varName = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);

	return varName + ' = ' + argument0 + ';\n';
};

Blockly.JavaScript['math_variables_get'] = function(block) {
	var code = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);

	return [
		code,
		Blockly.JavaScript.ORDER_ATOMIC
	];
};

// =============================================================================
// logic
// =============================================================================
Blockly.JavaScript['controls_if'] = function(block) {
	var n = 0;
	var argument = Blockly.JavaScript.valueToCode(block, 'IF' + n, Blockly.JavaScript.ORDER_NONE) || '0';
	var branch = Blockly.JavaScript.statementToCode(block, 'DO' + n);
	var code = 'if (' + argument + ') {\n' + branch + '}';

	for (n = 1; n <= block.elseifCount_; n++) {
		argument = Blockly.JavaScript.valueToCode(block, 'IF' + n, Blockly.JavaScript.ORDER_NONE) || '0';
		branch = Blockly.JavaScript.statementToCode(block, 'DO' + n);
		code += ' else if (' + argument + ') {\n' + branch + '}';
	}

	if (block.elseCount_) {
		branch = Blockly.JavaScript.statementToCode(block, 'ELSE');
		code += ' else {\n' + branch + '}';
	}

	return code + '\n';
};

Blockly.JavaScript['logic_compare'] = function(block) {
	// Comparison operator.
	var OPERATORS = {
		'EQ': '==',
		'NEQ': '!=',
		'LT': '<',
		'LTE': '<=',
		'GT': '>',
		'GTE': '>='
	};

	var operator = OPERATORS[block.getFieldValue('OP')];
	var order = (operator == '==' || operator == '!=') ?
		Blockly.JavaScript.ORDER_EQUALITY : Blockly.JavaScript.ORDER_RELATIONAL;
	var argument0 = Blockly.JavaScript.valueToCode(block, 'A', order) || '0';
	var argument1 = Blockly.JavaScript.valueToCode(block, 'B', order) || '0';

	var code = '';
	// check string compare
	if (block.childBlocks_[0].outputConnection.check_[0] == 'String') {
		code = 'strcmp(' + argument0 + ', ' + argument1 + ') ' + OPERATORS[block.getFieldValue('OP')] + ' 0';
	}
	else {
		// default is numeric
		code = argument0 + ' ' + operator + ' ' + argument1;
	}

	return [code, order];
};

Blockly.JavaScript['logic_operation'] = function(block) {
	// Operations 'and', 'or'.
	var operator = (block.getFieldValue('OP') == 'AND') ? '&&' : '||';
	var order = (operator == '&&') ? Blockly.JavaScript.ORDER_LOGICAL_AND :	Blockly.JavaScript.ORDER_LOGICAL_OR;
	var argument0 = Blockly.JavaScript.valueToCode(block, 'A', order);
	var argument1 = Blockly.JavaScript.valueToCode(block, 'B', order);

	if (!argument0 && !argument1) {
		// If there are no arguments, then the return value is false.
		argument0 = 'false';
		argument1 = 'false';
	} else {
		// Single missing arguments have no effect on the return value.
		var defaultArgument = (operator == '&&') ? 'true' : 'false';
		if (!argument0) {
			argument0 = defaultArgument;
		}
		if (!argument1) {
			argument1 = defaultArgument;
		}
	}
	var code = '(' + argument0 + ') ' + operator + ' (' + argument1 + ')';

	return [code, order];
};

Blockly.JavaScript['logic_negate'] = function(block) {
	// Negation.
	var order = Blockly.JavaScript.ORDER_LOGICAL_NOT;
	var argument0 = Blockly.JavaScript.valueToCode(block, 'BOOL', order) || 'true';
	var code = '!' + argument0;

	return [code, order];
};

Blockly.JavaScript['logic_boolean'] = function(block) {
	// Boolean values true and false.
	var code = (block.getFieldValue('BOOL') == 'TRUE') ? 'true' : 'false';

	return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['logic_led16x8_scroll_ready'] = function(block) {
	//return ['ht16k33.idle()', Blockly.JavaScript.ORDER_ATOMIC];
	return;
}

Blockly.JavaScript['logic_sw1_pressed'] = function(block) {
	var code = ['digitalRead(KB_BUTTON1) == 0', Blockly.JavaScript.ORDER_ATOMIC];
	return code;
	//return ['get_B1stateClicked() || button12.is_sw1_pressed()', Blockly.JavaScript.ORDER_ATOMIC];
}

Blockly.JavaScript['logic_sw1_released'] = function(block) {
	var code = ['digitalRead(KB_BUTTON1) == 1', Blockly.JavaScript.ORDER_ATOMIC];
	return code;
	//return ['(get_B1state() == 0 ) || button12.is_sw1_released()', Blockly.JavaScript.ORDER_ATOMIC];
}

Blockly.JavaScript['logic_sw2_pressed'] = function(block) {
	var code = ['digitalRead(KB_BUTTON2) == 0', Blockly.JavaScript.ORDER_ATOMIC];
	return code;
	// return ['get_B2stateClicked() || button12.is_sw2_pressed()', Blockly.JavaScript.ORDER_ATOMIC];
}

Blockly.JavaScript['logic_sw2_released'] = function(block) {
	var code = ['digitalRead(KB_BUTTON2) == 1', Blockly.JavaScript.ORDER_ATOMIC];
	return code;
	// return ['(get_B2state() == 0 ) || button12.is_sw2_released()', Blockly.JavaScript.ORDER_ATOMIC];
}


// =============================================================================
// loop
// =============================================================================
Blockly.JavaScript['controls_whileUntil'] = function(block) {
	// Do while/until loop.
	var until = block.getFieldValue('MODE') == 'UNTIL';
	var argument0 = Blockly.JavaScript.valueToCode(block, 'BOOL', until ? Blockly.JavaScript.ORDER_LOGICAL_NOT : Blockly.JavaScript.ORDER_NONE) || 'false';
	var branch = Blockly.JavaScript.statementToCode(block, 'DO');

//testbug
//console.log('controls_whileUntil');

	branch = Blockly.JavaScript.addLoopTrap(branch, block.id);

//testbug
//console.log('addLoopTrap');

	if (until) {
		argument0 = '!' + argument0;
	}

	return 'while (' + argument0 + ') {\n' + branch + '}\n';
};

Blockly.JavaScript['loop_break'] = function(block) {
	return 'break;\n';
};

Blockly.JavaScript['loop_continue'] = function(block) {
	return 'continue;\n';
};

// =============================================================================
// wait
// =============================================================================
Blockly.JavaScript['wait_led_matrix_ready'] = function(block) {
	return;
	//return 'ht16k33.wait_idle();\n';
};

Blockly.JavaScript['wait_sw1_pressed'] = function(block) {
	var code = 'while(digitalRead(KB_BUTTON1) == 1) { delay(1); }\n';
	//var code = 'while(1){if ((get_B1state() == 1 ) || (get_B1state() == 2 ) || button12.is_sw1_pressed()){if(get_B1state() == 2){set_B1release();} break;}}\n';
	// button12.wait_sw1_pressed();\n
	return code;
};

Blockly.JavaScript['wait_sw1_released'] = function(block) {
	var code = 'while(digitalRead(KB_BUTTON1) == 0) { delay(1); }\n';
	//var code = 'while(1){if ((get_B1state() == 0 ) || button12.is_sw1_released()){break;}}\n';
	// return 'button12.wait_sw1_released();\n';
	return code;
};

Blockly.JavaScript['wait_sw2_pressed'] = function(block) {
	var code = 'while(digitalRead(KB_BUTTON2) == 1) { delay(1); }\n';
	// var code = 'while(1){if ((get_B2state() == 1 ) || (get_B2state() == 2 ) || button12.is_sw2_pressed()){if(get_B2state() == 2){set_B2release();} break;}}\n';
	// return 'button12.wait_sw2_pressed();\n';
	return code;
};

Blockly.JavaScript['wait_sw2_released'] = function(block) {
	var code = 'while(digitalRead(KB_BUTTON2) == 0) { delay(1); }\n';
	// var code = 'while(1){if ((get_B2state() == 0 ) || button12.is_sw2_released()){break;}}\n';
	// return 'button12.wait_sw2_released();\n';
	return code;
};

// =============================================================================
// advance
// =============================================================================
Blockly.JavaScript['advance_task'] = function(block) {
	// generate unique function name
	Blockly.JavaScript.taskNumber++;
	var funcName = 'vTask' + Blockly.JavaScript.taskNumber;

	var branch = Blockly.JavaScript.statementToCode(block, 'STACK');
	if (Blockly.JavaScript.STATEMENT_PREFIX) {
		branch = Blockly.JavaScript.prefixLines(
			Blockly.JavaScript.STATEMENT_PREFIX.replace(/%1/g,
				'\'' + block.id + '\''), Blockly.JavaScript.INDENT) + branch;
	}
	if (Blockly.JavaScript.INFINITE_LOOP_TRAP) {
		branch = Blockly.JavaScript.INFINITE_LOOP_TRAP.replace(/%1/g,
			'\'' + block.id + '\'') + branch;
	}

	var code = 'void ' + funcName + '(void *pvParameters) {\n' +
		branch +
		'  // kill itself\n' +
		'  vTaskDelete(NULL);\n' +
		'}';
	code = Blockly.JavaScript.scrub_(block, code);
	// Add % so as not to collide with helper functions in definitions list.
	Blockly.JavaScript.definitions_['%' + funcName] = code;

	return null;
};

}