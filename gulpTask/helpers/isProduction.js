let gutil = require('gulp-util');

module.exports = function() {
	return gutil.env.env === 'production';
};