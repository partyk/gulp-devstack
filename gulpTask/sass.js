let config = require('./helpers/getConfig');
let isProduction = require('./helpers/isProduction');
let path = require('path');
let gulp = require('gulp');
let sass = require('gulp-sass');
let gutil = require('gulp-util');
let postcss = require('gulp-postcss');
let notify = require('gulp-notify');
let plumber = require('gulp-plumber');
let sourcemaps = require('gulp-sourcemaps');


gulp.task('sass', () => {
    
    //callBack error
    let onError = function(error) {
		notify.onError({
			title: 'Sass error!',
			message: '<%= error.message %>',
			sound: 'Beep',
		})(error);

		return this.emit('end');
	};

    //nastavim config pro sass stream
    let settings = {
		postCssPlugins: [
            require('postcss-discard-duplicates')(),
            require('pixrem')({ rootValue: config.fontSize }), // rem -> px fallback, defaultni hodnota pro vypocet je 10px
            require('autoprefixer')({ browsers: config.browser }), // pridani prefixu
            // require('postcss-will-change')(),
            // require('postcss-color-rgba-fallback')(),
            // require('postcss-opacity')(),
            // require('postcss-pseudoelements')(),
            // require('postcss-vmin')(),
        ],
		isProduction: isProduction()
	};

    //pridam do postCssPluginy pro produkci
    if (settings.isProduction) {
        settings.postCssPlugins = settings.postCssPlugins.concat([
            require('cssnano')()
        ]);
    }

    //vytvorim cestu + filtr na soubory
    let src = path.format({
        dir : config.src.sass.src,
        base: '**/*.+(scss|sass)'
    });

    let stream = gulp.src( src );
    
    stream
        //nastavim plumber a v pripade chyby volam callback onError
        .pipe(plumber({
            errorHandler: onError,
        }))
        //sourcemaps init
        .pipe(
            settings.isProduction
            ? gutil.noop()
            : sourcemaps.init()
        )
        //kompilace sass
        .pipe(sass())
        //postcss
        .pipe( postcss( settings.postCssPlugins ) )
        //vygeneruji sourcemaps
        .pipe(
            settings.isProduction
            ? gutil.noop()
            : sourcemaps.write('./'),
        )
        //zastavim plumber
        .pipe(plumber.stop())
        //vygeneruji CSS soubory
        .pipe(gulp.dest(config.dist.style));
    
    return stream;
});