// auto load polyfill for babel
// import '@babel/polyfill';

import '../module/test';
import '../module/testTypeScript';

// global.jQuery = jQuery;

let aaa = Object.assign({}, {
    'aaa': 'aaa',
    'bbb': 'aaaa'
});

let bbb = {
    ...{
        'aaa': 'aaa'
    },
    ...{
        'bbb': 'aaaa'
    }
};

console.log(aaa, bbb);