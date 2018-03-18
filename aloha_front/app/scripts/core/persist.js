/**
 *
 * const __author__ = 'loualcala'
 * const __copyright__ = 'Copyright (c) 2018+ aloha. All Rights Reserved'
 *
 **/

(function () {

    'use strict';

    angular.module('Core')
        .factory('Persist', Persist);

    function Persist() {
        var __ls = window.localStorage;

        return {
            get: get,
            set: set,
            clear: clear
        };

        function get(key) {
            return __ls.getItem(key);
        }

        function set(key, value) {
            __ls.setItem(key, value);
        }

        function clear(key) {
            return (key) ? __ls.removeItem(key) : __ls.clear();
        }
    }

}());