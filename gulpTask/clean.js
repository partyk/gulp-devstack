let config = require('./helpers/getConfig');
let consoleLog = require('./helpers/consoleLog');

let path = require('path');
let gulp = require('gulp');
let gutil = require('gulp-util');
let clean = require('gulp-clean');

gulp.task('cleanDist', ()=>{
    consoleLog.info('Delete > ' + config.basePath.dist);
    return gulp.src(config.basePath.dist, {read: false})
        .pipe(clean());
});