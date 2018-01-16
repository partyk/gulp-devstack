let gulp = require('gulp');
var runSequence = require('run-sequence');

// gulp.task('default', () => {
//     console.log('jedu');
// });
gulp.task('default', (callback) => {
    var sequence = runSequence([
		'clean',
	], [
		'imagemin',
	], [
		'sass', 'webpack'
	],
		callback
	);

	return sequence;
});