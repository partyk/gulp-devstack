const config = require('./../helpers/getConfig');
const console = require('better-console');
const pngquant = require('imagemin-pngquant');
const imagemin = require('gulp-imagemin');

const gulp = require('gulp');
const plugins = require('gulp-load-plugins');

const $ = plugins();

gulp.task('svg2png', (callback) => {
    console.info('SVG2PNG > convert image svg to png');

    // source
    const src = config.app.images.root + '**/*.svg';
    const dist = config.dist.images.root;

    // stream
    const stream = gulp.src(src);
    stream
        .pipe($.svg2png())
        .pipe(imagemin([
            pngquant()
        ]))
        .pipe(gulp.dest(dist))
        .pipe($.webp())
        .pipe(gulp.dest(dist))
        .on('finish', callback);
});