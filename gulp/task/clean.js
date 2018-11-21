const config = require('./../helpers/getConfig');

const console = require('better-console');
const fs = require('fs');
const gulp = require('gulp');

const plugins = require('gulp-load-plugins');

const $ = plugins();

gulp.task('clean', (callback) => {
    // create directory temp
    if (!fs.existsSync(config.dirName.temp)) {
        console.warn('Directory "' + config.dirName.temp + '" not exist!');
        console.info('Create > ' + config.dirName.temp);
        fs.mkdirSync(config.dirName.temp);
    }

    // create directory temp/gulp
    if (!fs.existsSync(config.basePath.temp)) {
        console.warn('Clean warn -> directory "' + config.basePath.temp + '" not exist!');
        console.info('Create > ' + config.basePath.temp);
        fs.mkdirSync(config.basePath.temp);
    }

    // create directory dist
    if (!fs.existsSync(config.basePath.dist)) {
        console.warn('Clean warn -> directory "' + config.basePath.dist + '" not exist!');
        console.info('Create > ' + config.basePath.dist);
        fs.mkdirSync(config.basePath.dist);
    }

    console.info('Deconste directory.');

    const stream = gulp.src([config.basePath.dist, config.basePath.temp], {read: false});

    stream
        .on('error', (e) => {
            throw new Error(e);
            process.exit(1); // eslint-disable-line
        })
        .pipe($.clean())
        .on('finish', () => {
            if (!fs.existsSync(config.basePath.dist)) {
                console.info('Create > ' + config.basePath.dist);
                fs.mkdirSync(config.basePath.dist);
            }
            if (!fs.existsSync(config.basePath.temp)) {
                console.info('Create > ' + config.basePath.temp);
                fs.mkdirSync(config.basePath.temp);
            }
            callback();
        });
});