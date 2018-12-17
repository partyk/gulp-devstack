const config = require('./../helpers/getConfig');
const console = require('better-console');

const gulp = require('gulp');
const plugins = require('gulp-load-plugins');
const iconfontCss = require('gulp-iconfont-css');

const $ = plugins();

gulp.task('iconfont', (callback) => {
    const runTimestamp = Math.round(Date.now() / 1000);

    console.info('Iconfont > create icons font from svg to font');

    const fontName = 'iconfont';
    const options = {
        fontName: fontName, // required
        prependUnicode: true, // recommended option
        formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'], // default, 'woff2' and 'svg' are available
        timestamp: runTimestamp // recommended to get consistent builds when watching files
    };

    const optionsCss = {
        fontName: fontName,
        path: config.app.fonts.root + 'iconsvg/less/_templateFont.less',
        targetPath: 'fontIcons.less',
        fontPath: config.publicPath.fonts.root + 'icon/',
        cacheBuster: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    };

    const src = config.app.fonts.root + 'iconsvg/*.svg';

    const dist = config.dist.fonts.root + 'icon/';

    const stream = gulp.src([src]);
    stream
        .on('error', (e) => {
            throw new Error(e);
            process.exit(1); // eslint-disable-line
        })
        .pipe(iconfontCss(optionsCss))
        .pipe($.iconfont(options))
        .pipe(gulp.dest(dist))
        .on('finish', callback);
});