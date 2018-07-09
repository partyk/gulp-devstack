let config = require('./../helpers/getConfig');
let isProduction = require('./../helpers/isProduction');
let console = require('better-console');

let path = require('path');
let webpack = require('webpack');
let gulp = require('gulp');
let plugins = require('gulp-load-plugins');
let UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const $ = plugins();

let isMinwatch = function () {
    return $.util.env._[0] === 'minwatch';
};


gulp.task('webpack', function (callback) {

    console.info('Webpack compile');

    let isReady = false;
    let settings = {
        mode: isProduction() ? 'production' : 'development',
        performance: {
            //hints: false //pokud se bude buildovat vetsi soubor nez 250kB, tak lze potlacit hlasku false
        },
        resolve: {
            alias: {
                'jquery' : require.resolve('jquery') //kvuli pouzivani jQuery v modulech aby se nemusel vsude importovat
            },
            extensions: ['.js', '.json'],
            modules: [
                config.basePath.nodeModule,
                config.basePath.bowerComponents
            ],
        },
        entry: {
            front: path.resolve(config.app.scripts.src, 'front.js'),
        },
        output: {
            path: path.resolve(config.dist.scripts.root),
            filename: '[name].js',
            publicPath: '../js/', //nastaveni cesty k chunkum
            chunkFilename: 'chunks/[name].chunk.js',
        },
        module: {
            rules: [
                {
                    test: /\.js(x)?$/,
                    exclude: /node_modules|bower_components/,
                    loader: 'babel-loader',
                },
            ],
        },
        plugins: [
            
        ],
        profile: true,
        watch: !isProduction() || isMinwatch(),
        watchOptions: {
            ignored: /node_modules|bower_components/,
        },
        devtool: isProduction() ? false : 'source-map',
        externals: {
            // 'jquery': 'jQuery',
        },
    };

	// automaticke nacitani modulu
	settings.plugins.push(new webpack.ProvidePlugin({
		$: 'jquery',
		jQuery: 'jquery'
	}));

    if (isProduction()) {
        settings.plugins.push(new UglifyJsPlugin({
            uglifyOptions: {
                /*
                compress: {

                },
                output: {
                    // output options
                },
                sourceMap: {
                    // source map options
                },
                parse: {
                    // parse options
                },*/
                
                /* mangle: true,
                ecma: 5, // specify one of: 5, 6, 7 or 8
                keep_classnames: false,
                keep_fnames: false,
                ie8: false,
                nameCache: null, // or specify a name cache object
                safari10: false,
                toplevel: false,
                warnings: false,
                unsafe: false, */
            }
        }));

        settings.plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
    }

    let onError = $.notify.onError(function (error) {
        return {
            title: 'JS error!',
            message: error,
            sound: 'Beep',
        };
    });

    let bundle = webpack(settings, function (error, stats) {
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
            $.util.log('[webpack]', stats.toString(config.webpack.stats));
        }

        if (!isReady) {
            callback();
        }

        return isReady = true;
    });

    //callback();
});