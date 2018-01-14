let gulp = require('gulp');

// gulp.task('default', () => {
//     console.log('jedu');
// });
gulp.task('default', ['clean', 'imagemin', 'sass', 'webpack']);