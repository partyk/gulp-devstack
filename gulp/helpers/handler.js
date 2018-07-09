let plugins = require('gulp-load-plugins');
let beeper = require('beeper');
let console = require('better-console');

const $ = plugins();

let handler = {
    error: (error) => {
        var report = '\n';

        if (error.plugin) {
            report += 'PLUGIN:' + ' [' + error.plugin + ']\n';
        }

        if (error.message) {
            report += 'ERROR:' + ' ' + error.message + '\n';
        }

        console.error(report);

        if (error.line && error.column) {
            var notifyMessage = 'LINE ' + error.line + ':' + error.column + ' -- ';
        } else {
            var notifyMessage = '';
        }

        $.notify({
            title: 'FAIL: ' + error.plugin,
            message: notifyMessage + 'See console.',
            sound: 'Sosumi'
        }).write(error);

        beeper();

        //this.emit('end');
    }
}

module.exports = handler;