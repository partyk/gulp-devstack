let config = require('./../helpers/getConfig');
let console = require('better-console');

let gulp = require('gulp');
let imagemin = require('gulp-imagemin');
let jpegoptim = require('imagemin-jpegoptim');
let pngquant = require('imagemin-pngquant');

const streamImageMin = (src, dist, callback, name) => {
    console.info(`${name} > minifying of images`);

    let stream = gulp.src(src.globs, src.options);

    stream
        .on('error', (e) => {
            throw new Error(e);
        })
        .pipe(imagemin([
            jpegoptim({
                progressive: true,
            }),
            pngquant(),
            imagemin.gifsicle(),
            imagemin.svgo(),
        ]))
        .pipe(gulp.dest(dist))
        .on('finish', callback);
}

gulp.task('imagemin', (callback) => {
    const src = {
        globs: [
            '**/*.{png,jpg,gif,svg,ico}',
            //'!' + config.app.images.extends,
        ],
        options: {
            cwd: config.app.images.root,
            // since: gulp.lastRun('imagemin') // This option takes a timestamp, and gulp.src will filter files that are older than the given time.
        }
    };

    const dist = config.dist.images.root;

    streamImageMin(src, dist, callback, 'Imagemin');
});