/**
 *
 * const __author__ = 'loualcala'
 * const __copyright__ = 'Copyright (c) 2018+ aloha. All Rights Reserved'
 *
 **/

(function () {

    'use strict';

    angular.module('Shared')
        .directive('appLead', appLead);

    function appLead() {
        return {
            replace: true,
            restrict: 'E',
            scope: {
                lead: '='
            },
            templateUrl: 'scripts/shared/lead/lead.html'
        };
    }

}());