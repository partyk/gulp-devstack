let config = require('../../gulp.config.global.js');
let merge = require('deepmerge');
let console = require('better-console');

try {
	let localConfig = require('../../gulp.config.local.js');
	config = merge(config, localConfig);
	console.info('Using local configuration.');
} catch (exception) {
	console.info('Using global configuration only. For local configuration create gulp.config.local.js from gulp.config.example.js.');
}

module.exports = config;