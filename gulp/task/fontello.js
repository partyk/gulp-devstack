let config = require('./../helpers/getConfig');
let isProduction = require('./../helpers/isProduction');
let fs = require('fs');
let console = require('better-console');

let path = require('path');
let gulp = require('gulp');
let plugins = require('gulp-load-plugins');

const $ = plugins();

gulp.task('fontello', (callback) => {
    console.info('Fontello > create icons font');

    let options = {
    }

    
    let src = config.app.fonts.root + 'fontello/config.json';
    
    let dist = config.dist.fonts.root + 'fontello/';
    console.debug(dist );

    if (!fs.existsSync(src)) {
        console.warn('Warn: missing config.json of Fontello');
        return;
        callback();
    }

    let failed = false;

    let stream = gulp.src(src);

    stream
        .on('error', (e) => {
            throw new Error(e);
            stream.end();
        })
        .pipe($.fontello(options))
        .pipe(gulp.dest(dist))
        .on('finish', () => {
            callback();
        });
});