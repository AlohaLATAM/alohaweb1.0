/**
 *
 * const __author__ = 'loualcala'
 * const __copyright__ = 'Copyright (c) 2018+ aloha. All Rights Reserved'
 *
 **/

(function () {

    'use strict';

    angular.module('Shared')
        .directive('appLoader', appLoader);

    function appLoader() {
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'scripts/shared/loader/loader.html',
            scope: {}
        };
    }

}());