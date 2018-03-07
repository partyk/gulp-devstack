let config = require('./../helpers/getConfig');
let isProduction = require('./../helpers/isProduction');
let console = require('better-console');

let fs = require('fs');
let async = require('async');
let path = require('path');
let gulp = require('gulp');
let plugins = require('gulp-load-plugins');
let iconfontCss = require('gulp-iconfont-css');

const $ = plugins();

gulp.task('iconfont', (callback) => {
    let runTimestamp = Math.round(Date.now() / 1000);

    console.info('Iconfont > create icons font from svg to font');

    let fontName = 'iconfont';
    let options = {
        fontName: fontName, // required
        prependUnicode: true, // recommended option
        formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'], // default, 'woff2' and 'svg' are available
        timestamp: runTimestamp, // recommended to get consistent builds when watching files
    }

    let optionsCss = {
        fontName: fontName,
        path: config.app.fonts.root + 'iconsvg/less/_templateFont.less',
        targetPath: 'fontIcons.less',
        fontPath: config.publicPath.fonts.root + 'icon/'
    }

    let src = config.app.fonts.root + 'iconsvg/*.svg';

    let dist = config.dist.fonts.root + 'icon/';

    let stream = gulp.src([src]);
    stream
        .on('error', (e) => {
            throw new Error(e);
            stream.end();
        })
        .pipe(iconfontCss(optionsCss))
        .pipe($.iconfont(options))
        .pipe(gulp.dest(dist))
        .on('finish', callback);
    return;
});