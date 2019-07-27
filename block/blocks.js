module.exports = function(Blockly){
'use strict';

// =============================================================================
// basic
// =============================================================================
var basic_colour = Blockly.Msg.BASIC_HUE;
// var basic_colour = "#32D496";

Blockly.Blocks["basic_delay"] = {
	init: function() {
		// max 1 day delay = 86400 sec.
		this.appendDummyInput()
			.appendField(Blockly.Msg.BASIC_DELAY_TITLE)
			.appendField(new Blockly.FieldNumber(0.5, 0.1, 86400, 0.1), 'VALUE');
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(basic_colour);
		this.setTooltip(Blockly.Msg.BASIC_DELAY_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.BASIC_DELAY_HELPURL);
	}
};

Blockly.Blocks["basic_forever"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(Blockly.Msg.BASIC_FOREVER_TITLE);
		this.appendStatementInput('HANDLER');
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(basic_colour);
		this.setTooltip(Blockly.Msg.BASIC_FOREVER_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.BASIC_FOREVER_HELPURL);
	}
};

Blockly.Blocks["basic_string"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldImage('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAn0lEQVQI1z3OMa5BURSF4f/cQhAKjUQhuQmFNwGJEUi0RKN5rU7FHKhpjEH3TEMtkdBSCY1EIv8r7nFX9e29V7EBAOvu7RPjwmWGH/VuF8CyN9/OAdvqIXYLvtRaNjx9mMTDyo+NjAN1HNcl9ZQ5oQMM3dgDUqDo1l8DzvwmtZN7mnD+PkmLa+4mhrxVA9fRowBWmVBhFy5gYEjKMfz9AylsaRRgGzvZAAAAAElFTkSuQmCC', 12, 12, '*'))
			.appendField(new Blockly.FieldTextInput('Hello World!'), 'VALUE')
			.appendField(new Blockly.FieldImage('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAqUlEQVQI1z3KvUpCcRiA8ef9E4JNHhI0aFEacm1o0BsI0Slx8wa8gLauoDnoBhq7DcfWhggONDmJJgqCPA7neJ7p934EOOKOnM8Q7PDElo/4x4lFb2DmuUjcUzS3URnGib9qaPNbuXvBO3sGPHJDRG6fGVdMSeWDP2q99FQdFrz26Gu5Tq7dFMzUvbXy8KXeAj57cOklgA+u1B5AoslLtGIHQMaCVnwDnADZIFIrXsoXrgAAAABJRU5ErkJggg==', 12, 12, '*'));
		this.setOutput(true, 'String');
		this.setPreviousStatement(false);
		this.setNextStatement(false);
		this.setColour(basic_colour);
		this.setTooltip(Blockly.Msg.BASIC_STRING_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.BASIC_STRING_HELPURL);
	}
};

// =============================================================================
// math
// =============================================================================
var math_colour = Blockly.Msg.MATH_HUE;
// var math_colour = "#7F94F8";

Blockly.Blocks['logic_sw1_pressed'] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldImage("/static/block_icons/sw12x12.png", 20, 20, "*"))
			.appendField(Blockly.Msg.LOGIC_SW1_PRESSED_TITLE);
		this.setOutput(true, 'Boolean');
		this.setPreviousStatement(false);
		this.setNextStatement(false);
		this.setColour(logic_colour);
		this.setTooltip(Blockly.Msg.LOGIC_SW1_PRESSED_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.LOGIC_SW1_PRESSED_HELPURL);
	}
};

Blockly.Blocks['logic_sw1_released'] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldImage("/static/block_icons/sw12x12.png", 20, 20, "*"))
			.appendField(Blockly.Msg.LOGIC_SW1_RELEASED_TITLE);
		this.setOutput(true, 'Boolean');
		this.setPreviousStatement(false);
		this.setNextStatement(false);
		this.setColour(logic_colour);
		this.setTooltip(Blockly.Msg.LOGIC_SW1_RELEASED_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.LOGIC_SW1_RELEASED_HELPURL);
	}
};

// =============================================================================
// comm
// =============================================================================
/*Blockly.Blocks["comm_uart_write"] = {
	init: function() {
		this.jsonInit({
			"type": "comm_uart_write",
			"message0": Blockly.Msg.COMM_UART_WRITE_TITLE + "%1",
			"args0": [{
				"type": "input_value",
				"name": "VALUE"
			}],
			"previousStatement": null,
			"nextStatement": null,
			"colour": 19,
			"tooltip": Blockly.Msg.COMM_UART_WRITE_TOOLTIP,
			"helpUrl": Blockly.Msg.COMM_UART_WRITE_HELPURL
		});
	}
};

Blockly.Blocks["comm_uart_writeln"] = {
	init: function() {
		this.jsonInit({
			"type": "comm_uart_writeln",
			"message0": Blockly.Msg.COMM_UART_WRITELN_TITLE + "%1",
			"args0": [{
				"type": "input_value",
				"name": "VALUE"
			}],
			"previousStatement": null,
			"nextStatement": null,
			"colour": 19,
			"tooltip": Blockly.Msg.COMM_UART_WRITELN_TOOLTIP,
			"helpUrl": Blockly.Msg.COMM_UART_WRITELN_HELPURL
		});
	}
};*/



// =============================================================================
// advance
// =============================================================================
var advance_colour = Blockly.Msg.ADVANCE_HUE;
Blockly.Blocks["advance_task"] = {
	init: function() {
		this.jsonInit({
			"type": "advance_task",
			"message0": "%1 %2 %3",
			"args0": [{
				"type": "field_input",
				"name": "NAME",
				"text": Blockly.Msg.ADVANCE_TASK_TITLE
			}, {
				"type": "input_dummy"
			}, {
				"type": "input_statement",
				"name": "STACK"
			}],
			"inputsInline": false,
			// "colour": Blockly.Msg.ADVANCE_HUE,
			"colour": advance_colour,
			"tooltip": Blockly.Msg.ADVANCE_TASK_TOOLTIP,
			"helpUrl": Blockly.Msg.ADVANCE_TASK_HELPURL
		});
	}
};

/*Blockly.Blocks["advance_current_drain_write"] = {
	init: function() {
		this.jsonInit({
			"type": "advance_current_drain_write",
			"message0": Blockly.Msg.ADVANCE_CURRENT_DRAIN_WRITE_TITLE + "%1",
			"args0": [{
				"type": "field_dropdown",
				"name": "STATUS",
				"options": [
					[Blockly.Msg.STATUS_OFF, "0"],
					[Blockly.Msg.STATUS_ON, "1"]
				]
			}],
			"previousStatement": null,
			"nextStatement": null,
			"colour": 290,
			"tooltip": Blockly.Msg.ADVANCE_CURRENT_DRAIN_WRITE_TOOLTIP,
			"helpUrl": Blockly.Msg.ADVANCE_CURRENT_DRAIN_WRITE_HELPURL
		});
	}
};*/

Blockly.Blocks["rtc_cal"] = {
	init: function() {
		this.jsonInit({
			"type": "rtc_cal",
			"message0": Blockly.Msg.RTC_CAL_TITLE + "%1",
			"args0": [{
				"type": "field_input",
				"name": "VALUE",
				"text": "0"
				/* for android
			"type": "field_number",
			"name": "VALUE",
			"value": 0,
			"min": 0.1,
			"max": 100,
			"precision": 0.1
			*/
			}],
			"previousStatement": null,
			"nextStatement": null,
			"colour": 290,
			"tooltip": Blockly.Msg.RTC_CAL_TOOLTIP,
			"helpUrl": Blockly.Msg.RTC_CAL_HELPURL
		});
	}
};

Blockly.Blocks["rtc_cal_coarse"] = {
	init: function() {
		this.jsonInit({
			"type": "rtc_cal_coarse",
			"message0": Blockly.Msg.RTC_CAL_COARSE_TITLE + "%1",
			"args0": [{
				"type": "field_input",
				"name": "VALUE",
				"text": "0"
				/* for android
			"type": "field_number",
			"name": "VALUE",
			"value": 0,
			"min": 0.1,
			"max": 100,
			"precision": 0.1
			*/
			}],
			"previousStatement": null,
			"nextStatement": null,
			"colour": 290,
			"tooltip": Blockly.Msg.RTC_CAL_COARSE_TOOLTIP,
			"helpUrl": Blockly.Msg.RTC_CAL_COARSE_HELPURL
		});
	}
};

// =============================================================================
// utilities
// =============================================================================
Blockly.mcp23s17_address_dropdown_menu = function(spi_channel) {
	if (parseInt(spi_channel) == 0) {
		// spi channel 0, available mcp23s17 address = 0x20 to 0x23
		return [
			["0x20", "32"],
			["0x21", "33"],
			["0x22", "34"],
			["0x23", "35"]
		];
	}
	else {
		// spi channel 1 to 64, available mcp23s17 address = 0x20 to 0x27
		return [
			["0x20", "32"],
			["0x21", "33"],
			["0x22", "34"],
			["0x23", "35"],
			["0x24", "36"],
			["0x25", "37"],
			["0x26", "38"],
			["0x27", "39"]
		];
	}
};

// get address item index
Blockly.mcp23s17_get_address_item_index = function(spi_channel, address_value) {
	var address_dropdown_menu = Blockly.mcp23s17_address_dropdown_menu(spi_channel);
	for (var i = 0; i < address_dropdown_menu.length; i++) {
		if (address_dropdown_menu[i][1] == address_value) {
			break;
		}
	}

	return i;
}

}