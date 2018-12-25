'use strict';
import config from '../helpers/getConfig';
import isProduction from '../helpers/isProduction';
import gulp from 'gulp';
import console from 'better-console';
import HubRegistry from 'gulp-hub';

const hub = new HubRegistry(['./*.js']);

gulp.registry(hub);

// default task
gulp.task('default',
    gulp.series('clean', 'download',
        gulp.parallel(
            gulp.series('svg2png', 'imagemin', 'webp'),
            gulp.series('bowerfix', 'iconfont', 'less', 'sass'),
            gulp.series('extendsjs'),
            gulp.series('webpack')
        ),
        'watch',
        (callback) => {
            callback();
            if (isProduction()) {
                process.exit(0); // eslint-disable-line
            }
        }
    )
);

// watch
gulp.task('watch', (callback) => {
    if (isProduction()) {
        callback();
        return;
    }

    console.info('Watch > start');

    // sass
    gulp.watch(config.app.sass.root + '**/*.+(scss|sass)', gulp.parallel('sass'));

    // less
    gulp.watch(config.app.less.root + '**/*.less', gulp.parallel('less'));

    // extends
    gulp.watch([...config.optionsJs.extends], gulp.parallel('extendsjs'));

    // images
    gulp.watch(config.app.images.root + '**/*.{png,jpg,gif,svg,ico}', gulp.series(/*'svg2png',*/ 'imagemin'/*, 'webp'*/));
});