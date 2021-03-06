/**
 *
 * const __author__ = 'loualcala'
 * const __copyright__ = 'Copyright (c) 2018+ aloha. All Rights Reserved'
 *
 **/

(function () {

    'use strict';

    angular.module('Auth')
        .controller('DriverCtrl', DriverCtrl);

    function DriverCtrl($state, $stateParams, Main) {
        var vm = this;
        vm.truck = {};
        vm.driverId = $stateParams.driverId;

        init();

        vm.registerTruck = registerTruck;

        function init() {
            if (!vm.driverId) {
                return $state.go('auth.Drivers');
            }

            getDriverTrucks();
            getDriver();
            getTruckTypes();
        }

        function getDriverTrucks() {
            vm.empty_list = false;

            var p = Main.listTrucks({driver_id: vm.driverId});

            p.then(
                function (response) {
                    vm.trucks = response;

                    if (!vm.trucks.length) {
                        vm.empty_list = true;
                    }
                }
            );
        }

        function getDriver() {
            var p = Main.getDriver(vm.driverId);

            p.then(
                function (driver) {
                    vm.driver = driver;

                    generateMap();
                }
            );
        }

        function getTruckTypes() {
            var p = Main.listTruckTypes();

            p.then(
                function (response) {
                    vm.truckSizeTypes = response;
                }
            );
        }

        function registerTruck() {
            vm.error = false;

            var p = Main.createTruck(vm.driverId, vm.truck);

            p.then(
                function () {
                    getDriverTrucks();
                    vm.truck = {};
                },
                function (error) {
                    vm.error = error;
                }
            );
        }

        function generateMap() {
            var map;
            var lima = new google.maps.LatLng(-12.0266032,-77.1282069);
            var mapOptions = {
                zoom: 15,
                center: lima
            };

            map = new google.maps.Map(document.getElementById('map'), mapOptions);

            var marker = new google.maps.Marker({
                position: lima,
                map: map
            });

            marker.setMap(map);
        }
    }

}());
