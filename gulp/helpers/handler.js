let plugins = require('gulp-load-plugins');
let beeper = require('beeper');
let console = require('better-console');

const $ = plugins();

let handler = {
    error: (error) => {
        let report = '\n',
            notifyMessage;

        if (error.plugin) {
            report += 'PLUGIN:' + ' [' + error.plugin + ']\n';
        }

        if (error.message) {
            report += 'ERROR:' + ' ' + error.message + '\n';
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
    }
};

module.exports = handler;