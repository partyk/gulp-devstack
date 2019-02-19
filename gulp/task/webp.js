const config = require('./../helpers/getConfig');
const console = require('better-console');

const gulp = require('gulp');
const plugins = require('gulp-load-plugins');

const $ = plugins();

gulp.task('webp', (callback) => {
    console.info('WEBP > convert image to webp');

    // source
    const src = config.app.images.root + '**/*.{jpg,png,tiff}';
    const dist = config.dist.images.root;

    // stream
    const stream = gulp.src(src);
    stream
        .pipe($.webp({quality: 50}))
        .pipe(gulp.dest(dist))
        .on('finish', callback);
});