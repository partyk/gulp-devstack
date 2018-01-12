let notify = require('gulp-notify');

let staticMethods = {
    onError : function (title = "Error!", error) {
        notify.onError({
            title: title,
            message: '<%= error.message %>',
            sound: 'Beep',
        })(error);

        return this.emit('end');
    }
};

module.exports = staticMethods;