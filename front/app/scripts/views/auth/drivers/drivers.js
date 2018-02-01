/**
 *
 * const __author__ = 'loualcala'
 * const __copyright__ = 'Copyright (c) 2018+ aloha. All Rights Reserved'
 *
 **/

(function () {

    'use strict';

    angular.module('Auth')
        .controller('DriversCtrl', DriversCtrl);

    function DriversCtrl(Main) {
        var vm = this;
        vm.loading = false;

        init();

        function init() {
            getDrivers();
        }

        function getDrivers() {
            vm.loading = true;
            vm.empty_list = false;

            var p = Main.listDrivers();

            p.then(
                function (response) {
                    vm.list = response;

                    if (!vm.list.length) {
                        vm.empty_list = true;
                    }
                }
            ).finally(
                function () {
                    vm.loading = false;
                }
            );
        }
    }

}());