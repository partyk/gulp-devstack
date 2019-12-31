const config = require('./../helpers/getConfig');
const isProduction = require('./../helpers/isProduction');
const console = require('better-console');
const argv = require('minimist')(process.argv.slice(2));

const path = require('path');
const webpack = require('webpack');
const gulp = require('gulp');
const plugins = require('gulp-load-plugins');

/* webpack plugins */
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const {VueLoaderPlugin} = require('vue-loader');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const WebpackMonitor = require('webpack-monitor');

const $ = plugins();

gulp.task('webpack', function (callback) {
    console.info('Webpack compile');

    let isReady = false;
    const settings = {
        mode: isProduction() ? 'production' : 'development',
        performance: {
            // hints: false // pokud se bude buildovat vetsi soubor nez 250kB, tak lze potlacit hlasku false
        },
        devServer: {
            quiet: true
        },
        resolve: {
            alias: {
                'jquery': require.resolve('jquery'), // kvuli pouzivani jQuery v modulech aby se nemusel vsude importovat
                'vue$': 'vue/dist/vue.esm' // alias for vuejs
            },
            extensions: ['.vue', '.tsx', '.ts', '.js', '.json'],
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
                    enforce: 'pre',
                    test: /\.(js(x)?|ts|tsx|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /node_modules|bower_components/
                },
                {
                    enforce: 'pre',
                    test: /\.js$/,
                    use: ['source-map-loader'],
                    exclude: [
                        // instead of /\/node_modules\//
                        path.join(process.cwd(), 'node_modules')
                    ]
                },
                {
                    test: /\.ts(x)?$/,
                    exclude: /node_modules|bower_components/,
                    loader: 'ts-loader',
                    options: {
                        appendTsSuffixTo: [/\.vue$/]
                    }
                },
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    options: {
                        loaders: {
                            'js': 'babel-loader' /*,
                            'scss': 'vue-style-loader!css-loader!sass-loader',
                            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax' */
                        }
                    }
                },
                {
                    test: /\.js(x)?$/,
                    exclude: /node_modules|bower_components/,
                    use: ['babel-loader']
                }
            ]
        },
        plugins: [
            new FriendlyErrorsWebpackPlugin({
                clearConsole: true
            }),
            new VueLoaderPlugin(),
            new DuplicatePackageCheckerPlugin()
        ],
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
    // plugin are run when is switch
    if (argv.analyzer) {
        settings.plugins.push(new BundleAnalyzerPlugin());
    }
    if (argv.monitor) {
        settings.plugins.push(new WebpackMonitor({
            capture: true, // -> default 'true'
            target: '../monitor/stats.json', // default -> '../monitor/stats.json'
            launch: true, // -> default 'false'
            port: 3030, // default -> 8081
            excludeSourceMaps: true // default 'true'
        }));
    }
    // for peoduction
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
            // this directive was disabled because webpack used FriendlyErrorsWebpackPlugin for the error message
            // onError(errors.toString());
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