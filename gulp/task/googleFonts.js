const config = require('./../helpers/getConfig');
const console = require('better-console');

const gulp = require('gulp');
const plugins = require('gulp-load-plugins');

const $ = plugins();

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const streamGoogleFont = (src, dist, options, callback) => {
    options = {
        ...{
            // embed: false,
            fontsDir: 'google',
            cssDir: 'google'
        },
        ...options
    };

    console.info(`Google fonts format: ${options.format.toUpperCase()}`);

    const stream = gulp.src(src);

    stream
        .on('error', (e) => {
            throw new Error(e);
            process.exit(1);  // eslint-disable-line
        })
        .pipe($.googleWebfonts(options))
        .pipe(gulp.dest(dist))
        .on('finish', () => {
            callback();
        });
};

const typeFonts = ['woff', 'woff2', 'svg', 'eot', 'ttf'];
const srcPath = config.app.fonts.root + 'googleFonts/';
const srcName = [
    'fonts'
];
const dist = config.dist.fonts.root;

const callFunctions = [];

srcName.forEach((name) => {
    typeFonts.forEach((format) => {
        callFunctions.push((callback) => {
            streamGoogleFont(srcPath + srcName + '.list', dist, {
                cssFilename: name + capitalizeFirstLetter(format) + '.css',
                format: format
            }, callback);
        });
    });
});

gulp.task('googleFonts', gulp.series(
    (callback) => {
        console.info('Google fonts');
        callback();
    },
    gulp.parallel(
        ...callFunctions
    ),
    (callback) => {
        console.info(`Google fonts modify urls`);

        let stram = gulp.src(dist + '/**/*.css');

        stram
            .on('error', (e) => {
                throw new Error(e);
                process.exit(1); // eslint-disable-line
            })
            .pipe($.modifyCssUrls({
                modify(url, filePath) {
                    return url;
                },
                prepend: config.publicPath.fonts.root,
                append: '?ver=' + Math.random().toString(36).substring(7) // pridam klic
            }))
            .pipe(gulp.dest(dist))
            .on('finish', () => {
                callback();
            });
    }
));