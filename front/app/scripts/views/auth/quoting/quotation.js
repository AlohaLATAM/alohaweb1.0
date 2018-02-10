/**
 *
 * const __author__ = 'loualcala'
 * const __copyright__ = 'Copyright (c) 2018+ aloha. All Rights Reserved'
 *
 **/

(function () {

    'use strict';

    angular.module('Auth')
        .controller('QuotationCtrl', QuotationCtrl);

    function QuotationCtrl($timeout, $state, $stateParams, $uibModal, Main) {
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var map;
        var lima = new google.maps.LatLng(-12.0266032,-77.1282069);
        var vm = this;
        vm.quotationId = $stateParams.quotationId;
        vm.quotation = {};
        vm.assignedTruck = {};

        init();

        vm.showServiceDate = showServiceDate;
        vm.calculateRoute = calculateRoute;
        vm.init = init;
        vm.openInventory = openInventory;
        vm.assignTruck = assignTruck;

        function showServiceDate(datetime) {
            return window.moment(datetime).format('LLLL')
        }

        function init() {
            vm.editable = false;

            if (!vm.quotationId) {
                return $state.go('auth.Leads');
            }

            getTruckTypes();
            getHomeTypes();

            $timeout(
                getQuotation,
                1000
            );
        }

        function getQuotation() {
            var p = Main.getQuotation(vm.quotationId);

            p.then(
                function (response) {
                    vm.quotation = response;
                    vm.lead = vm.quotation.lead;
                    vm.quotation.home_type_to_id = vm.quotation.home_type_to.id.toString();
                    vm.quotation.home_type_from_id = vm.quotation.home_type_from.id.toString();
                    vm.quotation.truck_size_type_id = vm.quotation.truck_size_type.id.toString();
                    vm.distance_aprox = vm.quotation.travel_distance_aprox_label;
                    vm.time_travel_aprox = vm.quotation.travel_time_aprox_label;
                    vm.service_datetime = showServiceDate(vm.quotation.datetime_of_service);

                    generateMap();

                    if (!vm.quotation.assigned_truck) {
                        getTrucks();
                    }
                }
            );
        }

        function generateMap() {
            var mapOptions = {
                zoom: 7,
                center: lima
            };

            map = new google.maps.Map(document.getElementById('map'), mapOptions);
            directionsDisplay.setMap(map);

            calculateRoute();
        }

        function getTruckTypes() {
            var p = Main.listTruckTypes();

            p.then(
                function (response) {
                    vm.truckSizeTypes = response;
                }
            );
        }

        function getHomeTypes() {
            var p = Main.listHomeTypes();

            p.then(
                function (response) {
                    vm.homeTypes = response;
                }
            );
        }

        function calculateRoute() {
            var request = {
                origin: vm.quotation.address_from,
                destination: vm.quotation.address_to,
                travelMode: google.maps.TravelMode.DRIVING,
                language: 'es'
            };

            directionsService.route(request, function(response, status) {
                if (status === google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                }
            });
        }

        function openInventory() {
            $uibModal.open({
                templateUrl: 'scripts/views/auth/inventory/inventory.html',
                controller: 'InventoryCtrl',
                controllerAs: 'vm',
                resolve: {
                    QuotationId: function () {
                        return vm.quotationId;
                    },
                    Lead: function () {
                        return vm.lead;
                    }
                }
            });
        }

        function assignTruck() {
            vm.assignation_error = false;

            var p = Main.updateQuotation(vm.quotationId, vm.assignedTruck.truck_id, vm.assignedTruck.driver_price);

            p.then(
                function () {
                    getQuotation();
                },
                function (error) {
                    vm.assignation_error = error;
                }
            );
        }

        function getTrucks() {
            var p = Main.listTrucks({truck_size_type_id: vm.quotation.truck_size_type.id});

            p.then(
                function (response) {
                    vm.trucks = response;
                }
            );
        }
    }

}());
