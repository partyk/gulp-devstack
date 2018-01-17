'use strict';

import gulp from 'gulp';
import HubRegistry from 'gulp-hub';

let hub = new HubRegistry(['./*.js']);

gulp.registry(hub);

gulp.task('default', 
    gulp.series('clean', 
        gulp.parallel(
            'imagemin', 
            gulp.series('less','sass'),
            gulp.series('dependency','webpack')
        )
    )
);