const config = require('./../helpers/getConfig');
const console = require('better-console');

const fs = require('fs');
const gulp = require('gulp');
const plugins = require('gulp-load-plugins');

const $ = plugins();

gulp.task('fontello', (callback) => {
    console.info('Fontello > create icons font');

    const options = {};

    const src = config.app.fonts.root + 'fontello/config.json';

    const dist = config.dist.fonts.root + 'fontello/';

    if (!fs.existsSync(src)) {
        console.warn('Warn: missing config.json of Fontello');
        callback();
        return;
    }

    const stream = gulp.src(src);

    stream
        .on('error', (e) => {
            throw new Error(e);
            process.exit(1); // eslint-disable-line
        })
        .pipe($.fontello(options))
        .pipe(gulp.dest(dist))
        // .on('finish', () => {
        //     callback();
        // });
        .on('finish', callback);
});