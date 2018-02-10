/**
 *
 * const __author__ = 'loualcala'
 * const __copyright__ = 'Copyright (c) 2018+ aloha. All Rights Reserved'
 *
 **/

(function () {

    'use strict';

    angular.module('Auth')
        .controller('QuotingCtrl', QuotingCtrl);

    function QuotingCtrl($scope, $state, $stateParams, Main) {
        var vm = this;
        vm.quoting = {
            lead_id: null,
            address_from: '',
            home_type_from_id: '',
            floor_from: 1,
            address_to: '',
            home_type_to_id: '',
            floor_to: 1,
            travel_distance_aprox: 0,
            travel_time_aprox: 0,
            truck_size_type_id: '',
            packaging_time_aprox: 0,
            packaging_price: 0,
            travel_price: 0,
            total_price: 0,
            final_price: 0,
            profit: 0,
            datetime_of_service: new Date()
        };
        vm.search = {};
        vm.loading = false;
        vm.saving = false;

        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var map;
        var lima = new google.maps.LatLng(-12.0266032,-77.1282069);

        init();

        vm.showServiceDate = showServiceDate;
        vm.calculateRoute = calculateRoute;
        vm.calculateTruckPrice = calculateTruckPrice;
        vm.registerQuotation = registerQuotation;
        vm.changeServiceTime = changeServiceTime;

        function showServiceDate() {
            return window.moment(vm.quoting.datetime_of_service).format('LLLL')
        }

        function init() {
            var leadId = $stateParams.leadId;

            if (!leadId) {
                return $state.go('auth.Leads');
            }

            vm.quoting.lead_id = leadId;

            getLead(leadId);
            generateMap();
            getTruckTypes();
            getHomeTypes();
        }

        function getLead(leadId) {
            vm.loading = true;

            var p = Main.getLead(leadId);

            p.then(
                function (response) {
                    vm.lead = response;
                }
            ).finally(
                function () {
                    vm.loading = false;
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
            if (!vm.quoting.address_from || !vm.quoting.address_to) {
                return;
            }

            var request = {
                origin: vm.quoting.address_from,
                destination: vm.quoting.address_to,
                travelMode: google.maps.TravelMode.DRIVING,
                language: 'es'
            };

            directionsService.route(request, function(response, status) {
                if (status === google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);

                    vm.quoting.travel_distance_aprox_label = vm.distance_aprox = response.routes[0].legs[0].distance.text;
                    vm.quoting.travel_distance_aprox = response.routes[0].legs[0].distance.value;
                    vm.quoting.travel_time_aprox_label = vm.time_travel_aprox = response.routes[0].legs[0].duration.text;
                    vm.quoting.travel_time_aprox = 2 * response.routes[0].legs[0].duration.value;

                    calculateTruckPrice();

                    $scope.$apply();
                }
            });
        }

        function calculateTruckPrice() {
            if (vm.quoting.travel_time_aprox && vm.quoting.truck_size_type_id) {
                var timeAprox = vm.quoting.travel_time_aprox / 60;
                var truckPrice = vm.truckSizeTypes[vm.quoting.truck_size_type_id - 1].hour_price;

                vm.quoting.packaging_price = ((vm.quoting.packaging_time_aprox * truckPrice) / 60).toFixed(2);
                vm.quoting.travel_price = ((timeAprox * truckPrice) / 60).toFixed(2);
                vm.quoting.total_price = parseFloat(vm.quoting.packaging_price) + parseFloat(vm.quoting.travel_price);

                vm.quoting.final_price = (vm.quoting.total_price + 50).toFixed(2);
            }
        }

        function registerQuotation() {
            vm.saving = true;
            vm.quoting.profit = (vm.quoting.final_price - vm.quoting.total_price).toFixed(2);

            var p = Main.createQuotation(vm.quoting);

            p.then(
                function (response) {
                    $state.go('auth.QuotationDetails', {quotationId: response.id});
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

        function changeServiceTime() {
            vm.quoting.packaging_time_aprox = vm.truckSizeTypes[vm.quoting.truck_size_type_id - 1].time_per_service;
            calculateTruckPrice();
        }
    }

}());