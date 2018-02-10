/**
 *
 * const __author__ = 'loualcala'
 * const __copyright__ = 'Copyright (c) 2018+ aloha. All Rights Reserved'
 *
 **/

(function () {

    'use strict';

    angular.module('Shared')
        .directive('appDriver', appDriver);

    function appDriver() {
        return {
            replace: true,
            restrict: 'E',
            scope: {
                driver: '=',
                price: '='
            },
            templateUrl: 'scripts/shared/driver/driver.html'
        };
    }

}());