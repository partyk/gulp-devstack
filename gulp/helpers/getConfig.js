let config = require('../../gulp.config.global.js');
const console = require('better-console');

try {
	let localConfig = require('../../gulp.config.local.js');
	config = {
		...config,
		...localConfig
	};
	console.info('Using local configuration.');
} catch (exception) {
	console.info('Using global configuration only. For local configuration create gulp.config.local.js from gulp.config.example.js.');
}

module.exports = config;