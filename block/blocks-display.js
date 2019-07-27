module.exports = function(Blockly){
'use strict';

	var basic_colour = Blockly.Msg.BASIC_HUE;
	// var basic_colour = "#32D496";
	Blockly.Blocks["display_led16x8"] = {
		init: function() {
			this.appendDummyInput()
				.appendField(Blockly.Msg.BASIC_LED16X8_TITLE)
				.appendField("                                ")
				.appendField(new Blockly.FieldImage("/static/block_icons/shift_left_24px.svg", 24, 24, "*", function(e) {
					for (var y = 0; y < 8; y++) {
						for (var x = 0; x < 16; x++) {
							if (x != 15) {
								var val = e.sourceBlock_.getFieldValue('POS_X' + (x + 1) + '_Y' + y);
								e.sourceBlock_.setFieldValue(val, 'POS_X' + x + '_Y' + y);
							} else {
								e.sourceBlock_.setFieldValue('false', 'POS_X' + x + '_Y' + y);
							}
						}
					}
				}, true))
				.appendField(new Blockly.FieldImage("/static/block_icons/shift_right_24px.svg", 24, 24, "*", function(e) {
					for (var y = 0; y < 8; y++) {
						for (var x = 15; x >= 0; x--) {
							if (x != 0) {
								var val = e.sourceBlock_.getFieldValue('POS_X' + (x - 1) + '_Y' + y);
								e.sourceBlock_.setFieldValue(val, 'POS_X' + x + '_Y' + y);
							} else {
								e.sourceBlock_.setFieldValue('false', 'POS_X' + x + '_Y' + y);
							}
						}
					}
				}, true))
				.appendField(new Blockly.FieldImage("/static/block_icons/shift_up_24px.svg", 24, 24, "*", function(e) {
					for (var y = 7; y >= 0; y--) {
						for (var x = 0; x < 16; x++) {
							if (y != 0) {
								var val = e.sourceBlock_.getFieldValue('POS_X' + x + '_Y' + (y - 1));
								e.sourceBlock_.setFieldValue(val, 'POS_X' + x + '_Y' + y);
							} else {
								e.sourceBlock_.setFieldValue('false', 'POS_X' + x + '_Y' + y);
							}
						}
					}
				}, true))
				.appendField(new Blockly.FieldImage("/static/block_icons/shift_down_24px.svg", 24, 24, "*", function(e) {
					for (var y = 0; y < 8; y++) {
						for (var x = 0; x < 16; x++) {
							if (y != 7) {
								var val = e.sourceBlock_.getFieldValue('POS_X' + x + '_Y' + (y + 1));
								e.sourceBlock_.setFieldValue(val, 'POS_X' + x + '_Y' + y);
							} else {
								e.sourceBlock_.setFieldValue('false', 'POS_X' + x + '_Y' + y);
							}
						}
					}
				}, true));

			for (var y = 7; y >= 0; y--) {
				var line = this.appendDummyInput();
				for (var x = 0; x < 16; x++) {
					line.appendField(new Blockly.FieldCheckbox('false', null, true), 'POS_X' + x + '_Y' + y);
				}
			}
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setColour(basic_colour);
			this.setTooltip(Blockly.Msg.BASIC_LED16X8_TOOLTIP);
			this.setHelpUrl(Blockly.Msg.BASIC_LED16X8_HELPURL);
		}
	};

	Blockly.Blocks["display_led16x8_clr"] = {
		init: function() {
			this.appendDummyInput()
				.appendField(Blockly.Msg.BASIC_LED16X8_CLR_TITLE);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setColour(basic_colour);
			this.setTooltip(Blockly.Msg.BASIC_LED16X8_CLR_TOOLTIP);
			this.setHelpUrl(Blockly.Msg.BASIC_LED16X8_CLR_HELPURL);
		}
	};

	Blockly.Blocks["display_led16x8_print"] = {
		init: function() {
			/*this.jsonInit({
				"type": "basic_led16x8_2chars",
				"message0": Blockly.Msg.BASIC_LED16X8_2CHARS_TITLE + "%1",
				"args0": [{
					"type": "input_value",
					"name": "VALUE"
				}],
				"previousStatement": null,
				"nextStatement": null,
				"colour": 160,
				"tooltip": Blockly.Msg.BASIC_LED16X8_2CHARS_TOOLTIP,
				"helpUrl": Blockly.Msg.BASIC_LED16X8_2CHARS_HELPURL
			});*/

			this.appendValueInput('VALUE')
				.appendField("LED 16x8 print");
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setColour(basic_colour);
			this.setTooltip(Blockly.Msg.BASIC_LED16X8_2CHARS_TOOLTIP);
			this.setHelpUrl(Blockly.Msg.BASIC_LED16X8_2CHARS_HELPURL);
		}
	};

	Blockly.Blocks["display_led16x8_scroll"] = {
		init: function() {
			this.appendValueInput('VALUE')
				.appendField(Blockly.Msg.BASIC_LED16X8_SCROLL_TITLE);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setColour(basic_colour);
			this.setTooltip(Blockly.Msg.BASIC_LED16X8_SCROLL_TOOLTIP);
			this.setHelpUrl(Blockly.Msg.BASIC_LED16X8_SCROLL_HELPURL);
		}
	};

	Blockly.Blocks["display_led16x8_scroll_when_ready"] = {
		init: function() {
			this.appendValueInput('VALUE')
				.appendField(Blockly.Msg.BASIC_LED16X8_SCROLL_WHEN_READY_TITLE);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setColour(basic_colour);
			this.setTooltip(Blockly.Msg.BASIC_LED16X8_SCROLL_WHEN_READY_TOOLTIP);
			this.setHelpUrl(Blockly.Msg.BASIC_LED16X8_SCROLL_WHEN_READY_HELPURL);
		}
	};
}