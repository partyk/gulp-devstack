let plugins = require('gulp-load-plugins');

const $ = plugins();

let handler = {
    error: (error) => {
        var report = '\n';
        var chalk = $.util.colors.white.bgRed;

        if (error.plugin) {
            report += chalk('PLUGIN:') + ' [' + error.plugin + ']\n';
        }

        if (error.message) {
            report += chalk('ERROR:') + ' ' + error.message + '\n';
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

        $.util.beep();

        //this.emit('end');
    }
}

module.exports = handler;