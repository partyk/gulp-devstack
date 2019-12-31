// auto load polyfill for babel
// import '@babel/polyfill';
/*
As of Babel 7.4.0, this '@babel/polyfill' package has been deprecated in favor of directly including core-js/stable (to polyfill ECMAScript features) and regenerator-runtime/runtime (needed to use transpiled generator functions):
*/
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Vue from 'vue'; // vue

import '../module/test';
import '../module/testTypeScript';
import App from '../module/Hello';

// global.jQuery = jQuery;

const aaa = Object.assign({}, {
    aaa: 'aaa',
    bbb: 'aaaa'
});

const bbb = {
    ...{
        aaa: 'aaa'
    },
    ...{
        bbb: 'aaaa'
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