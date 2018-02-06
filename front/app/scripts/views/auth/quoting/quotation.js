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
        var vm = this;
        vm.quotationId = $stateParams.quotationId;
        vm.quotation = {};

        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var map;
        var lima = new google.maps.LatLng(-12.0266032,-77.1282069);

        init();

        vm.calculateRoute = calculateRoute;
        vm.init = init;
        vm.openInventory = openInventory;

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

                    generateMap();
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
            var modalInstance = $uibModal.open({
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
    }

}());