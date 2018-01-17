let gutil = require('gulp-util');
let consoleLog;

consoleLog = {
    info: (text, reverse = false) => {
        if (reverse) {
            gutil.log(gutil.colors.bgMagenta(gutil.colors.white('= ' + text + ' =')));
        } else {
            gutil.log(gutil.colors.magenta(text));
        }
    },

    warn : (text, reverse = false) => {
        if (reverse) {
            gutil.log(guttil.colors.bgYellow(gutil.colors.black('= ' + text + ' =')));
        } else {
            gutil.log(gutil.colors.yellow(text));
        }
    }  
};

module.exports = consoleLog;