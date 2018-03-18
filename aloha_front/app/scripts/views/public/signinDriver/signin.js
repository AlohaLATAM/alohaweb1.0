/**
 *
 * const __author__ = 'loualcala'
 * const __copyright__ = 'Copyright (c) 2018+ aloha. All Rights Reserved'
 *
 **/

(function () {

    'use strict';

    angular.module('Public')
        .controller('SigninDriverCtrl', SigninDriverCtrl);

    function SigninDriverCtrl($state, Main) {
        var vm = this;
        vm.driver = {};

        vm.signIn = signIn;

        function signIn() {
            vm.error = false;

            var p = Main.driverSignIn(vm.driver.username, vm.driver.password);

            p.then(
                function () {
                    $state.go('driver.Dashboard');
                },
                function (error) {
                    vm.error = error;
                }
            );
        }
    }

}());
