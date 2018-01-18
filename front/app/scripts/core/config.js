/**
 *
 * const __author__ = 'loualcala'
 * const __copyright__ = 'Copyright (c) 2018+ aloha. All Rights Reserved'
 *
 **/

(function () {

    'use strict';

    var Config = {
        API_ROOT: __env__.API_ROOT || ''
    };

    angular.module('Core')
        .constant('Config', Config);

}());