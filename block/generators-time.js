module.exports = function(Blockly){
'use strict';

Blockly.JavaScript['mcp7941_rtc_set_datetime'] = function (block) {
	var dropdown_dayofweek= block.getFieldValue('DOW');
	var dropdown_year = block.getFieldValue('YEAR');
	var dropdown_month = block.getFieldValue('MONTH');
	var dropdown_day = block.getFieldValue('DAY');
	var dropdown_hour = block.getFieldValue('HOUR');
	var dropdown_minute = block.getFieldValue('MINUTE');
	var dropdown_secound = block.getFieldValue('SECOND');
	var code = `rtc.setDateTime(${dropdown_secound}, ${dropdown_minute}, ${dropdown_hour}, ${dropdown_dayofweek}, ${dropdown_day}, ${dropdown_month}, ${dropdown_year});\n`;
	return code;
};

Blockly.JavaScript['mcp7941_rtc_get_dayOfWeek'] = function (block) {
	var code = `rtc.getDayofWeek()`;
	return [code, Blockly.JavaScript.ORDER_NONE];
};


Blockly.JavaScript['mcp7941_rtc_get_hour'] = function (block) {
	var code = `rtc.getHour()`;
	return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['mcp7941_rtc_get_minute'] = function (block) {
	var code = `rtc.getMinute()`;
	return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['mcp7941_rtc_get_second'] = function (block) {
	var code = `rtc.getSecond()`;
	return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['mcp7941_rtc_get_day'] = function (block) {
	var code = `rtc.getDay()`;
	return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['mcp7941_rtc_get_month'] = function (block) {
	var code = `rtc.getMonth()`;		
	return [code, Blockly.JavaScript.ORDER_NONE];
};
Blockly.JavaScript['mcp7941_rtc_get_year'] = function (block) {
	var code = `rtc.getYear()`;	
	return [code, Blockly.JavaScript.ORDER_NONE];
};

// =============================================================================
// not support rtc yet
// =============================================================================
/*Blockly.JavaScript['rtc_get'] = function(block) {
	return [
		'mcp7940n.get_datetime()',
		Blockly.JavaScript.ORDER_ATOMIC
	];
};
Blockly.JavaScript['rtc_get_date'] = function(block) {
	return [
		'mcp7940n.get_date()',
		Blockly.JavaScript.ORDER_ATOMIC
	];
};
Blockly.JavaScript['rtc_get_time'] = function(block) {
	return [
		'mcp7940n.get_time()',
		Blockly.JavaScript.ORDER_ATOMIC
	];
};
Blockly.JavaScript['rtc_get_day'] = function(block) {
	return [
		'mcp7940n.get(0)',
		Blockly.JavaScript.ORDER_ATOMIC
	];
};
Blockly.JavaScript['rtc_get_month'] = function(block) {
	return [
		'mcp7940n.get(1)',
		Blockly.JavaScript.ORDER_ATOMIC
	];
};
Blockly.JavaScript['rtc_get_year'] = function(block) {
	return [
		'mcp7940n.get(2)',
		Blockly.JavaScript.ORDER_ATOMIC
	];
};
Blockly.JavaScript['rtc_get_hour'] = function(block) {
	return [
		'mcp7940n.get(3)',
		Blockly.JavaScript.ORDER_ATOMIC
	];
};
Blockly.JavaScript['rtc_get_minute'] = function(block) {
	return [
		'mcp7940n.get(4)',
		Blockly.JavaScript.ORDER_ATOMIC
	];
};
Blockly.JavaScript['rtc_get_second'] = function(block) {
	return [
		'mcp7940n.get(5)',
		Blockly.JavaScript.ORDER_ATOMIC
	];
};
Blockly.JavaScript['rtc_cal'] = function(block) {
	return 'mcp7940n.cal(' + block.getFieldValue('VALUE') + ');\n';
};
Blockly.JavaScript['rtc_cal_coarse'] = function(block) {
	return 'mcp7940n.cal_coarse(' + block.getFieldValue('VALUE') + ');\n';
};
*/
};