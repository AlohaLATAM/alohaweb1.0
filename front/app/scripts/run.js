/**
 *
 * const __author__ = 'loualcala'
 * const __copyright__ = 'Copyright (c) 2018+ aloha. All Rights Reserved'
 *
 **/

(function () {

    'use strict';

    window.__env__ = (window.__env__) ? window.__env__ : {};

    angular.module('frontApp')
        .run(appRun);

    function appRun($transitions) {
        $transitions.onBefore({}, function() {
            angular.element("html, body").animate({ scrollTop: 0 }, 200);
        });
    }

}());
