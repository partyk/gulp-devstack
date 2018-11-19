const plugins = require('gulp-load-plugins');
const beeper = require('beeper');
const console = require('better-console');
const isProduction = require('./isProduction');

const $ = plugins();

let handler = {
    error: (error, callback) => {
        let report = '\n';
        let notifyMessage;

        if (error.plugin) {
            report += 'PLUGIN:' + ' [' + error.plugin + ']\n';
        }

        if (error.message) {
            report += 'ERROR:' + ' ' + error.message + '\n';
        }

        if (error.line) {
            report += 'Line:' + ' ' + error.line + '\n';
        }

        if (error.extract) {
            report += 'Extract:' + '\n' + error.extract.join('\n') + '\n';
        }

        console.error(report);

        if (error.line && error.column) {
            notifyMessage = 'LINE ' + error.line + ':' + error.column + ' -- ';
        } else {
            notifyMessage = '';
        }

        $.notify({
            title: 'FAIL: ' + error.plugin,
            message: notifyMessage + 'See console.',
            sound: 'Sosumi'
        }).write(error);

        beeper();

        /**
         * in production mode is process stopped
         */
        if (isProduction()) {
            process.exit(1);
        } else if (typeof callback === 'function') {
            callback();
        }
    }
};

module.exports = handler;