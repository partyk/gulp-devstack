let config = require('./../helpers/getConfig');
let isProduction = require('./../helpers/isProduction');

let console = require('better-console');
let fs = require('fs');
let gulp = require('gulp');

let plugins = require('gulp-load-plugins');

const $ = plugins();

gulp.task('clean', (callback) => {
    
    if (!fs.existsSync(config.basePath.dist)) {
        console.warn('Clean warn -> directory "' + config.basePath.dist + '" not exist!');
        console.info('Create > ' + config.basePath.dist);
        fs.mkdirSync(config.basePath.dist);
        callback();
        return;
    }
    
    console.info('Delete > ' + config.basePath.dist);

    let stream = gulp.src(config.basePath.dist, { read: false });

    stream
        .on('error', (e) => {
            throw new Error(e);
            stream.end();
        })
        .pipe($.clean())
        .on('finish', ()=>{
            if (!fs.existsSync(config.basePath.dist)){
                console.info('Create > ' + config.basePath.dist);
                fs.mkdirSync(config.basePath.dist);    
            }
            callback();
        });
});