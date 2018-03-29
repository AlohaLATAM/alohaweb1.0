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

    function signinCtrl($state, Main) {
        var vm = this;
        vm.user = {};

        vm.signIn = signIn;

        function signIn() {
            vm.error = false;

            var p = Main.signIn(vm.user.username, vm.user.password);

            p.then(
                function () {
                    $state.go('auth.Leads');
                },
                function (error) {
                    vm.error = error;
                }
            );
        }
    }

}());