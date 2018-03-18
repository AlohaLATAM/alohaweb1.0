/**
 *
 * const __author__ = 'loualcala'
 * const __copyright__ = 'Copyright (c) 2018+ aloha. All Rights Reserved'
 *
 **/

(function () {

    'use strict';

    angular.module('Core')
        .factory('Utils', Utils);

    function Utils() {
        return {
            validateEmail: validateEmail
        };

        function validateEmail(email) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

            return (email && email.match(regex));
        }
    }

}());