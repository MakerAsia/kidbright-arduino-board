module.exports = function(Blockly){
'use strict';

Blockly.JavaScript['display_led16x8'] = function(block) {
	var buf = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00];
	for (var x = 0; x < 16; x++) {
		var byte = 0;
		for (var y = 0; y < 8; y++) {
			var val = block.getFieldValue('POS_X' + x + '_Y' + y);
			if (val == 'TRUE') {
				byte |= (0x01 << y);
			};
		}
		buf[15-x] = byte;
	}

	var str = '';
	for (var i = 0; i < 16; i++) {
		str += '\\x' + buf[i].toString(16);
	}

	//return 'ht16k33.show((uint8_t *)"' + str + '");\n';
	return 'matrix.drawBitmap(0, 0, (uint8_t *)"' + str + '");\n';
};

Blockly.JavaScript['display_led16x8_clr'] = function(block) {
	var code = 'matrix.printText(0, 0, " ");\n';
	return code;
	//return 'ht16k33.show((uint8_t *)"\\x0\\x0\\x0\\x0\\x0\\x0\\x0\\x0\\x0\\x0\\x0\\x0\\x0\\x0\\x0\\x0");\n';
};

Blockly.JavaScript['display_led16x8_print'] = function(block) {
	var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
    //var argument0 = Blockly.JavaScript.valueToCode(block);
	var code = 'matrix.printText(0, 0, String(' + argument0 + '));\n';
	return code;
};

Blockly.JavaScript['display_led16x8_scroll'] = function(block) {
	var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
	//return 'ht16k33.scroll(' + argument0 + ', true);\n';
	var code = 'matrix.scrollText(String(' + argument0 + '));\n';
	return code;
};


}