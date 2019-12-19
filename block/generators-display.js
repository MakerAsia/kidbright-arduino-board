module.exports = function (Blockly) {
	'use strict';

	Blockly.JavaScript['display_led16x8'] = function (block) {
		var buf = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00];
		for (var x = 0; x < 16; x++) {
			var byte = 0;
			for (var y = 0; y < 8; y++) {
				var val = block.getFieldValue('POS_X' + x + '_Y' + y);
				if (val == 'TRUE') {
					byte |= (0x01 << y);
				};
			}
			buf[15 - x] = byte;
		}

		var str = '';
		for (var i = 0; i < 16; i++) {
			str += '\\x' + buf[i].toString(16);
		}

		//return 'ht16k33.show((uint8_t *)"' + str + '");\n';
		return 'matrix.drawBitmap(0, 0, (uint8_t *)"' + str + '");\n';
	};

	Blockly.JavaScript['display_led16x8_clr'] = function (block) {
		var code = 'matrix.printText(0, 0, " ");\n';
		return code;
		//return 'ht16k33.show((uint8_t *)"\\x0\\x0\\x0\\x0\\x0\\x0\\x0\\x0\\x0\\x0\\x0\\x0\\x0\\x0\\x0\\x0");\n';
	};

	Blockly.JavaScript['display_led16x8_print'] = function (block) {
		var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
		//var argument0 = Blockly.JavaScript.valueToCode(block);
		var code = 'matrix.printText(0, 0, String(' + argument0 + '));\n';
		return code;
	};

	Blockly.JavaScript['display_led16x8_scroll'] = function (block) {
		var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
		//return 'ht16k33.scroll(' + argument0 + ', true);\n';
		var code = 'matrix.scrollText(String(' + argument0 + '));\n';
		return code;
	};

	Blockly.JavaScript['display_led16x8_drawPixel'] = function (block) {
		var value_x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC);
		var value_y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC);
		var dropdown_state = block.getFieldValue('STATE');

		var code = `matrix.drawPixel(${value_x}, ${value_y}, ${dropdown_state});\n`;
		return code;
	};

	Blockly.JavaScript['display_led16x8_drawline'] = function (block) {
		var value_x0 = Blockly.JavaScript.valueToCode(block, 'X0', Blockly.JavaScript.ORDER_ATOMIC);
		var value_y0 = Blockly.JavaScript.valueToCode(block, 'Y0', Blockly.JavaScript.ORDER_ATOMIC);
		var value_x1 = Blockly.JavaScript.valueToCode(block, 'X1', Blockly.JavaScript.ORDER_ATOMIC);
		var value_y1 = Blockly.JavaScript.valueToCode(block, 'Y1', Blockly.JavaScript.ORDER_ATOMIC);
		var dropdown_state = block.getFieldValue('STATE');

		var code = `matrix.drawLine(${value_x0}, ${value_y0}, ${value_x1}, ${value_y1}, ${dropdown_state});\n`;
		return code;
	};

	Blockly.JavaScript['display_led16x8_drawRect'] = function (block) {
		var value_x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC);
		var value_y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC);
		var value_w = Blockly.JavaScript.valueToCode(block, 'W', Blockly.JavaScript.ORDER_ATOMIC);
		var value_h = Blockly.JavaScript.valueToCode(block, 'H', Blockly.JavaScript.ORDER_ATOMIC);
		var dropdown_status = block.getFieldValue('STATUS');

		var code = `matrix.drawRect(${value_x}, ${value_y}, ${value_w}, ${value_h}, ${dropdown_status});\n`;
		return code;
	};


	Blockly.JavaScript['display_led16x8_drawcircle'] = function (block) {
		var value_x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC);
		var value_y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC);
		var value_r = Blockly.JavaScript.valueToCode(block, 'R', Blockly.JavaScript.ORDER_ATOMIC);
		var dropdown_status = block.getFieldValue('STATUS');
		var checkbox_fill = block.getFieldValue('Fill') == 'TRUE';

		if(checkbox_fill) {
			var code = `matrix.fillCircle(${value_x}, ${value_y}, ${value_r}, ${dropdown_status});\n`;
		} else {
			var code = `matrix.drawCircle(${value_x}, ${value_y}, ${value_r}, ${dropdown_status});\n`;
		}
		
		return code;
	};

	Blockly.JavaScript['display_led16x8_drawTriangle'] = function(block) {
		var value_x0 = Blockly.JavaScript.valueToCode(block, 'X0', Blockly.JavaScript.ORDER_ATOMIC);
		var value_y0 = Blockly.JavaScript.valueToCode(block, 'Y0', Blockly.JavaScript.ORDER_ATOMIC);
		var value_x1 = Blockly.JavaScript.valueToCode(block, 'X1', Blockly.JavaScript.ORDER_ATOMIC);
		var value_y1 = Blockly.JavaScript.valueToCode(block, 'Y1', Blockly.JavaScript.ORDER_ATOMIC);
		var value_x2 = Blockly.JavaScript.valueToCode(block, 'X2', Blockly.JavaScript.ORDER_ATOMIC);
		var value_y2 = Blockly.JavaScript.valueToCode(block, 'Y2', Blockly.JavaScript.ORDER_ATOMIC);
		var dropdown_status = block.getFieldValue('STATUS');
		var checkbox_fill = block.getFieldValue('Fill') == 'TRUE';
		
		if(checkbox_fill) {
			var code = `matrix.fillTriangle(${value_x0}, ${value_y0}, ${value_x1}, ${value_y1}, ${value_x2}, ${value_y2}, ${dropdown_status});\n`;
		} else {
			var code = `matrix.drawTriangle(${value_x0}, ${value_y0}, ${value_x1}, ${value_y1}, ${value_x2}, ${value_y2}, ${dropdown_status});\n`;
		}

		return code;
	  };
}