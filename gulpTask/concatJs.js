let config = require('./helpers/getConfig');
let consoleLog = require('./helpers/consoleLog');

var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('dependency', () => {
    //vytvorim cestu + filtr na soubory
    let src = path.format({
        dir: config.dist.scripts.static,
        base: config.concatJs.dependencyJs.name
    });

    let stream = gulp.src(src);

});

gulp.task('javascript', function() {
    consoleLog.info('Delete > ' + config.basePath.dist);
  return gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
      .pipe(concat('all.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
});