let config = require('./helpers/getConfig');

let gulp = require('gulp');
let imagemin = require('gulp-imagemin');
let jpegoptim = require('imagemin-jpegoptim');
let pngquant = require('imagemin-pngquant');


gulp.task('imagemin', function() {
	let stream = gulp.src([
		'**/*.{png,jpg,gif,svg}',
		//'!' + config.app.images.extends,
	], {
		cwd: config.app.images.root,
	});

	stream
		.pipe(imagemin([
			jpegoptim({
				progressive: true,
			}),
			pngquant(),
			imagemin.gifsicle(),
			imagemin.svgo(),
		]))
		.pipe(gulp.dest(config.dist.images.root));

	return stream;
});