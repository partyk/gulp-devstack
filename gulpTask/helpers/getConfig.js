let config = require('../../gulp.config.global.js');
let merge = require('deepmerge');
let gutil = require('gulp-util');

try {
	let localConfig = require('../../gulp.config.local.js');
	config = merge(config, localConfig);
	gutil.log(gutil.colors.magenta('Using local configuration.'));
} catch (exception) {
	gutil.log(gutil.colors.magenta('Using global configuration only. For local configuration create gulp.config.local.js from gulp.config.example.js.'));
}

module.exports = config;