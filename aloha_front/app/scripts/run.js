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

    function appRun($transitions, Persist) {
        $transitions.onBefore({to: 'auth.**'}, function(trans) {
            if (!Persist.get('token')) {
                return trans.router.stateService.target('public.Signin');
            }

            return true;
        });

        $transitions.onSuccess({}, function() {
            angular.element('html, body').animate({ scrollTop: 0 }, 200);
        });
    }

}());
