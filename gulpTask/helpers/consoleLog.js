let gutil = require('gulp-util');
let consoleLog;

consoleLog = {
    info: (text, reverse = false) => {
        if (reverse) {
            gutil.log(gutil.colors.black(gutil.colors.bgYellow('= ' + text + ' =')));
        } else {
            gutil.log(gutil.colors.yellow(text));
        }
    },

    alert : (text, reverse = false) => {
        if (reverse) {
            gutil.log(guttil.colors.bgRed(gutil.colors.white('= ' + text + ' =')));
        } else {
            gutil.log(gutil.colors.bgRed(text));
        }
    }  
};

module.exports = consoleLog;