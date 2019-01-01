const config = require('./../helpers/getConfig');
const console = require('better-console');

const gulp = require('gulp');
const plugins = require('gulp-load-plugins');

const $ = plugins();

const glob = require('glob');
const path = require('path');

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const streamGoogleFont = (src, dist, options, name, callback) => {
    options = {
        ...{
            // embed: false,
            fontsDir: 'google',
            cssDir: 'google'
        },
        ...options
    };

    console.info(`Google fonts format: ${name}`);

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

// options
const src = config.app.fonts.root + 'googleFonts/*.list';
const dist = config.dist.fonts.root;
const typeFonts = ['woff', 'woff2', 'svg', 'ttf'];
const args = [];

// array args with a function where is callback function for creating google fonts name and type
glob.sync(src).forEach(file => {
    typeFonts.forEach(typeFont => {
        args.push((callback) => {
            streamGoogleFont(file, dist, {
                cssFilename: path.basename(file, '.list') + capitalizeFirstLetter(typeFont) + '.css',
                format: typeFont
            }, path.basename(file, '.list') + typeFont + '.css', callback);
        });
    });
});

gulp.task('googleFonts', gulp.series(
    ...args,
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
    })
);