import shell from "gulp-shell";

let config = require('./../helpers/getConfig');
let console = require('better-console');

let gulp = require('gulp');
let plugins = require('gulp-load-plugins');

let imagemin = require('gulp-imagemin');
let jpegoptim = require('imagemin-jpegoptim');
let pngquant = require('imagemin-pngquant');

const $ = plugins();

gulp.task('bowerfix', gulp.series(
     $.shell.task('npm run bower-installer'),
    (callback) => {

        let options = {
            "debug":false,
            "absolutePath": config.publicPath.root,
            "types":{
                "fonts":{
                    extensions: [".eot", ".woff", ".ttf", ".woff2"],
                    prefixPath: config.dirName.fonts + "/" + config.dirName.extends + "/"
                },
                "imgs":{
                    extensions: [".png", ".jpg", ".gif", ".jpeg", ".svg"],
                    prefixPath: config.dirName.images + "/" + config.dirName.extends + "/"
                }
            }
        };

        console.info('Bower fix path');

        let stream = gulp.src(config.basePath.temp + 'bower/**/*.css');

        stream
            .on('error', (e) => {
                throw new Error(e);
                stream.end();
            })
            .pipe($.bowerFixCssPath(options))
            .pipe(gulp.dest(function (file) {
                return file.base;
            }))
            .on('finish', ()=>{
                callback();
            });
    },
    (callback) => {
        console.info('Bower copy images');

        let stream = gulp.src(config.basePath.temp + 'bower/*/images/**/*.{png,jpg,gif,svg,ico}');

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
            .pipe($.rename({dirname: ''})) // remove a folder structure in stream
            .pipe(gulp.dest(config.dist.images.extends))
            .on('finish', callback);
    }
));