/**
 *
 * const __author__ = 'loualcala'
 * const __copyright__ = 'Copyright (c) 2018+ aloha. All Rights Reserved'
 *
 **/

(function () {

    'use strict';
    
    angular.module('Auth')
        .controller('NewTruckCtrl', NewTruckCtrl);
    
    function NewTruckCtrl($state, $stateParams, Main) {
        var vm = this;

        vm.driverId = $stateParams.driverId;

        init();

        function init() {
            if (!vm.driverId) {
                return $state.go('auth.Drivers');
            }

            getDriver();
        }

        function getDriver() {
            var p = Main.getDriver(vm.driverId);

            p.then(
                function (response) {
                    vm.driver = response;
                }
            );
        }
    }

}());