const config = require('./../helpers/getConfig');
const isProduction = require('./../helpers/isProduction');
const console = require('better-console');

const path = require('path');
const webpack = require('webpack');
const gulp = require('gulp');
const plugins = require('gulp-load-plugins');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const $ = plugins();

gulp.task('webpack', function (callback) {
    console.info('Webpack compile');

    let isReady = false;
    const settings = {
        mode: isProduction() ? 'production' : 'development',
        performance: {
            // hints: false // pokud se bude buildovat vetsi soubor nez 250kB, tak lze potlacit hlasku false
        },
        resolve: {
            alias: {
                'jquery': require.resolve('jquery') // kvuli pouzivani jQuery v modulech aby se nemusel vsude importovat
            },
            extensions: ['.js', '.json'],
            modules: [
                config.basePath.nodeModule,
                config.basePath.bowerComponents
            ]
        },
        entry: {
            front: path.resolve(config.app.scripts.src, 'front.js')
        },
        output: {
            path: path.resolve(config.dist.scripts.root),
            filename: '[name].js',
            publicPath: config.domain.assets + '/js/', // nastaveni cesty k chunkum
            chunkFilename: 'chunks/[name].[contenthash].chunk.js'
        },
        module: {
            rules: [
                {
                    test: /\.js(x)?$/,
                    exclude: /node_modules|bower_components/,
                    use: ['babel-loader', 'eslint-loader']
                }
            ]
        },
        plugins: [],
        profile: true,
        watch: !isProduction(),
        watchOptions: {
            ignored: /node_modules|bower_components/
        },
        devtool: isProduction() ? false : 'source-map',
        externals: {
            // 'jquery': 'jQuery',
        }
    };

    // automaticke nacitani modulu
    settings.plugins.push(new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
    }));

    if (isProduction()) {
        settings.plugins.push(new UglifyJsPlugin({
            uglifyOptions: config.optionsUglify
        }));

        settings.plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
    }

    const onError = $.notify.onError(function (error) {
        return {
            title: 'JS error!',
            message: error,
            sound: 'Beep'
        };
    });

    webpack(settings, function (error, stats) {
        var jsonStats = stats.toJson();
        var errors = jsonStats.errors;
        var warnings = jsonStats.warnings;

        if (error) {
            onError(error);
        } else if (errors.length > 0) {
            onError(errors.toString());
        } else if (warnings.length > 0) {
            onError(warnings.toString());
        } else {
            console.log('[webpack]', stats.toString(config.webpack.stats));
        }

        if (!isReady) {
            callback();
        }

        return (isReady = true);
    });

    // callback();
});