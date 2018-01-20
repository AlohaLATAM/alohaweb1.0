/**
 *
 * const __author__ = 'loualcala'
 * const __copyright__ = 'Copyright (c) 2018+ aloha. All Rights Reserved'
 *
 **/

(function () {

    'use strict';

    angular.module('Public')
        .controller('SigninCtrl', signinCtrl);

    function signinCtrl(Main) {
        var vm = this;
        vm.user = {};

        vm.signIn = signIn;

        function signIn() {
            vm.error = false;

            var p = Main.signIn(vm.user.email, vm.user.password);

            p.then(
                function () {

                },
                function (error) {
                    vm.error = error;
                }
            );
        }
    }

}());