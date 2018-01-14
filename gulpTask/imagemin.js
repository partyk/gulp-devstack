let config = require('./helpers/getConfig');
let consoleLog = require('./helpers/consoleLog');

let gulp = require('gulp');
let imagemin = require('gulp-imagemin');
let jpegoptim = require('imagemin-jpegoptim');
let pngquant = require('imagemin-pngquant');
let notify = require('gulp-notify');
let plumber = require('gulp-plumber');


gulp.task('imagemin', function() {

	consoleLog.info('Imagemin minify');

     //callBack error
     let onError = function (error) {
        notify.onError({
            title: 'Concat error!',
            message: '<%= error.message %>',
            sound: 'Beep',
        })(error);

        return this.emit('end');
    };
	
	
	let stream = gulp.src([
		'**/*.{png,jpg,gif,svg}',
		//'!' + config.app.images.extends,
	], {
		cwd: config.app.images.root,
	});

	stream
		//nastavim plumber a v pripade chyby volam callback onError
        .pipe(plumber({
            errorHandler: onError,
        }))
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