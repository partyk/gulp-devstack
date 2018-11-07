import isProduction from "../helpers/isProduction";

let config = require('./../helpers/getConfig');
let console = require('better-console');

let gulp = require('gulp');
let plugins = require('gulp-load-plugins');

const $ = plugins();

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
            isProduction() ? process.exit(1) : stream.end();
        })
        .pipe($.googleWebfonts(options))
        .pipe(gulp.dest(dist))
        .on('finish', ()=>{
            callback();
        });
};

const src = config.app.fonts.root + 'googleFonts/fonts.list';
const dist = config.dist.fonts.root;

gulp.task('googleFonts', gulp.series(
    (callback) => {
        console.info('Google fonts');
        callback();
    },
    gulp.parallel(
        (callback) => {
            streamGoogleFont(src, dist, {
                cssFilename: 'fontsWoff.css',
                format: 'woff'
            }, callback)
        },
        (callback) => {
            streamGoogleFont(src, dist, {
                cssFilename: 'fontsWoff2.css',
                format: 'woff2'
            }, callback)
        },
        (callback) => {
            streamGoogleFont(src, dist, {
                cssFilename: 'fontsSvg.css',
                format: 'svg'
            }, callback)
        },
        (callback) => {
            streamGoogleFont(src, dist, {
                cssFilename: 'fontsEot.css',
                format: 'eot'
            }, callback)
        },
        (callback) => {
            streamGoogleFont(src, dist, {
                cssFilename: 'fontsTtf.css',
                format: 'ttf'
            }, callback)
        }
    ),
    (callback) => {
        console.info(`Google fonts modify urls`);

        let stram = gulp.src(dist + '/**/*.css');

        stram
            .on('error', (e) => {
                throw new Error(e);
                isProduction() ? process.exit(1) : stream.end();
            })
            .pipe($.modifyCssUrls({
                modify(url, filePath) {
                    return url;
                },
                prepend: config.publicPath.fonts.root,
                append: '?ver=' +  Math.random().toString(36).substring(7) // pridam klic
            }))
            .pipe(gulp.dest(dist))
            .on('finish', ()=>{
                callback();
            });
    }
));