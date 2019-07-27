module.exports = function(Blockly){
'use strict';


// =============================================================================
// music
// =============================================================================
Blockly.JavaScript['music_note'] = function(block) {
	var code = 'music.tone('+ block.getFieldValue('NOTE') + ',' + block.getFieldValue('DURATION') + ');\n';
	return code;
};
/*
Blockly.JavaScript['music_rest'] = function(block) {
	return 'music.rest(' + block.getFieldValue('DURATION') + ');\n';
};

Blockly.JavaScript['music_scale'] = function(block) {
	var ret =
		'sound.note(' + block.getFieldValue('NOTE') + ');\n' +
		'sound.rest(' + block.getFieldValue('DURATION') + ');\n' +
		'sound.off();\n';

	return ret;
};

Blockly.JavaScript['music_set_volume'] = function(block) {
	return 'sound.set_volume(' + block.getFieldValue('VALUE') + ');\n';
};

Blockly.JavaScript['music_get_volume'] = function(block) {
	return [
		'sound.get_volume()',
		Blockly.JavaScript.ORDER_ATOMIC
	];
};

Blockly.JavaScript['music_set_tempo'] = function(block) {
	return 'sound.set_bpm(' + block.getFieldValue('VALUE') + ');\n';
};
*/

};