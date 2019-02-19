// auto load polyfill for babel
import '@babel/polyfill';
import Vue from 'vue'; // vue

import '../module/test';
import '../module/testTypeScript';
import App from '../module/Hello';

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

global.app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!'
    },
    render: h => h(App)
});