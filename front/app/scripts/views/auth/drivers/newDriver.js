/**
 *
 * const __author__ = 'loualcala'
 * const __copyright__ = 'Copyright (c) 2018+ aloha. All Rights Reserved'
 *
 **/

(function () {

    'use strict';

    angular.module('Auth')
        .controller('NewDriverCtrl', NewDriverCtrl);

    function NewDriverCtrl($state, Main) {
        var vm = this;
        vm.driver = {
            first_name: '',
            last_name: '',
            phone_number: '',
            dni: '',
            license_number: '',
            district_id: null
        };

        init();

        vm.createDriver = createDriver;

        function init() {
            listDistricts();
        }

        function listDistricts() {
            var p = Main.listDistricts();

            p.then(
                function (response) {
                    vm.districts = response;
                }
            );
        }

        function createDriver() {
            vm.saving = true;
            vm.error = false;

            var p = Main.createDriver(vm.driver);

            p.then(
                function () {
                    $state.go('auth.Drivers');
                },
                function (error) {
                    vm.error = error;
                }
            ).finally(
                function () {
                    vm.saving = false;
                }
            );
        }
    }

}());