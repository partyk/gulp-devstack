const config = require('./../helpers/getConfig');
const console = require('better-console');

const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');

const streamImageMin = (name, src, dist, callback) => {
    console.info(`${name} > minifying of images`);

    const stream = gulp.src(...src);

    stream
        .on('error', (e) => {
            throw new Error(e);
            process.exit(1); // eslint-disable-line
        })
        .pipe(imagemin([
            // Lossless Plugin
            imagemin.gifsicle({
                interlaced: true
            }),
            /* imagemin.mozjpeg({
                progressive: true
            }),
            imagemin.optipng({
                optimizationLevel: 3
            }), */
            // Lossy Plugin
            imageminMozjpeg({
                progressive: true,
                quality: 85
            }),
            imageminPngquant({
                speed: 1,
                quality: [0.5, 0.9]
            }),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true} /*,
                    {cleanupIDs: false} */
                ]
            })
        ]))
        .pipe(gulp.dest(dist))
        .on('finish', callback);
};

gulp.task('imagemin', (callback) => {
    const options = [
        'Imagemin', [
            [
                '**/*.{png,jpg,gif,svg,ico}' // ,
                // '!' + config.app.images.extends,
            ],
            {
                cwd: config.app.images.root // ,
                // since: gulp.lastRun('imagemin') // This option takes a timestamp, and gulp.src will filter files that are older than the given time.
            }
        ],
        config.dist.images.root,
        callback
    ];

    streamImageMin(...options);
});