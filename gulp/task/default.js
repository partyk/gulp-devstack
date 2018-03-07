'use strict';
import config from '../helpers/getConfig'
import isProduction from '../helpers/isProduction'
import gulp from 'gulp';
import console from 'better-console';
import HubRegistry from 'gulp-hub';

let hub = new HubRegistry(['./*.js']);

gulp.registry(hub);

//default task
gulp.task('default', 
    gulp.series('clean',
        gulp.parallel( 
            'imagemin',
            gulp.series('iconfont', 'less', 'sass', 'watch'),
            gulp.series('webpack')
        ),
    )
);

//watch
gulp.task('watch', (callback) => {
    if (isProduction()) {
        callback();
        return;
    }

    console.info('Watch > start');

    //sass
    gulp.watch(config.app.sass.root + '**/*.+(scss|sass)', gulp.series('sass'));

    //less
    gulp.watch(config.app.less.root + '**/*.less', gulp.series('less'));

    //images
    gulp.watch(config.app.images.root + '**/*.{png,jpg,gif,svg,ico}', gulp.series('imagemin'));

});