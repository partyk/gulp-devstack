import isProduction from "../helpers/isProduction";

let config = require('./../helpers/getConfig');
let console = require('better-console');

let gulp = require('gulp');
let plugins = require('gulp-load-plugins');

const $ = plugins();

let optionsFonts = {
    // embed: false,
    fontsDir: 'google',
    cssDir: 'google'
};

let src = config.app.fonts.root + 'googleFonts/fonts.list';
let dist = config.dist.fonts.root;

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
            .pipe($.googleWebfonts(Object.assign({}, optionsFonts,
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
            .pipe($.googleWebfonts(Object.assign({}, optionsFonts,
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
            .pipe($.googleWebfonts(Object.assign({}, optionsFonts,
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
            .pipe($.googleWebfonts(Object.assign({}, optionsFonts,
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
            .pipe($.googleWebfonts(Object.assign({}, optionsFonts,
                {
                    cssFilename: 'fontsTtf.css',
                    format: 'ttf'
                })
            ))
            .pipe(gulp.dest(dist))
            .on('finish', ()=>{
                callback();
            });
    },
    (callback) => {
        let stram = gulp.src(dist + '/google/*.css');

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
            .pipe(gulp.dest(dist + '/google'))
            .on('finish', ()=>{
                callback();
            });
    }
));