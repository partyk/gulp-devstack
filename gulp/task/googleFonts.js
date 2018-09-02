import isProduction from "../helpers/isProduction";

let config = require('./../helpers/getConfig');
let console = require('better-console');

let gulp = require('gulp');
let plugins = require('gulp-load-plugins');

const $ = plugins();

let options = {
    // embed: false,
    fontsDir: config.publicPath.fonts.root + 'google/'
};

let src = config.app.fonts.root + 'googleFonts/fonts.list';
let dist = config.dist.fonts.root + 'google';

gulp.task('googleFonts', gulp.series(
    (callback) => {
        console.info('Google fonts');
        callback();
    },
    (callback) => {
        console.info('Google fonts format: WOFF');
        let stream = gulp.src(src);

        stream
            .on('error', (e) => {
                throw new Error(e);
                isProduction() ? process.exit(1) : stream.end();
            })
            .pipe($.googleWebfonts(Object.assign({}, options,
                {
                    cssFilename: 'fontsWoff.css',
                    format: 'woff'
                })
            ))
            .pipe(gulp.dest(dist))
            .on('finish', ()=>{
                callback();
            });
    },
    (callback) => {
        console.info('Google fonts format: WOFF2');
        let stream = gulp.src(src);

        stream
            .on('error', (e) => {
                throw new Error(e);
                isProduction() ? process.exit(1) : stream.end();
            })
            .pipe($.googleWebfonts(Object.assign({}, options,
                {
                    cssFilename: 'fontsWoff2.css',
                    format: 'woff2'
                })
            ))
            .pipe(gulp.dest(dist))
            .on('finish', ()=>{
                callback();
            });
    },
    (callback) => {
        console.info('Google fonts format: SVG');
        let stream = gulp.src(src);

        stream
            .on('error', (e) => {
                throw new Error(e);
                isProduction() ? process.exit(1) : stream.end();
            })
            .pipe($.googleWebfonts(Object.assign({}, options,
                {
                    cssFilename: 'fontsSvg.css',
                    format: 'svg'
                })
            ))
            .pipe(gulp.dest(dist))
            .on('finish', ()=>{
                callback();
            });
    },
    (callback) => {
        console.info('Google fonts format: EOT');
        let stream = gulp.src(src);

        stream
            .on('error', (e) => {
                throw new Error(e);
                isProduction() ? process.exit(1) : stream.end();
            })
            .pipe($.googleWebfonts(Object.assign({}, options,
                {
                    cssFilename: 'fontsEot.css',
                    format: 'eot'
                })
            ))
            .pipe(gulp.dest(dist))
            .on('finish', ()=>{
                callback();
            });
    },
    (callback) => {
        console.info('Google fonts format: TTF');
        let stream = gulp.src(src);

        stream
            .on('error', (e) => {
                throw new Error(e);
                isProduction() ? process.exit(1) : stream.end();
            })
            .pipe($.googleWebfonts(Object.assign({}, options,
                {
                    cssFilename: 'fontsTtf.css',
                    format: 'ttf'
                })
            ))
            .pipe(gulp.dest(dist))
            .on('finish', ()=>{
                callback();
            });
    }
));