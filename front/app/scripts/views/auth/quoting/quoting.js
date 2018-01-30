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

    function QuotingCtrl($scope, $stateParams, Main) {
        var vm = this;
        vm.quoting = {
            from_apartment_floor: 1,
            to_apartment_floor: 1,
            price: 0,
            truck_price: 0,
            moving_stuff_time: 0,
            packaging_price: 0,
            travel_price: 0,
            final_price: 0
        };
        vm.search = {};

        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var map;
        var lima = new google.maps.LatLng(-12.0266032,-77.1282069);

        init();

        vm.calculateRoute = calculateRoute;
        vm.calculateTruckPrice = calculateTruckPrice;

        function init() {
            getLead();
            generateMap();
            getTruckTypes();
            getHomeTypes();
        }

        function getLead() {
            var leadId = $stateParams.leadId;

            var p = Main.getLead(leadId);

            p.then(
                function (response) {
                    vm.lead = response;
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

                    vm.quoting.distance_aprox = response.routes[0].legs[0].distance.text;
                    vm.quoting.time_travel_aprox = response.routes[0].legs[0].duration.text;
                    vm.time_travel_seconds = response.routes[0].legs[0].duration.value;

                    calculateTruckPrice();

                    $scope.$apply();
                }
            });
        }

        function calculateTruckPrice() {
            if (vm.time_travel_seconds && vm.quoting.truck_size_type) {
                var timeAprox = vm.time_travel_seconds / 60;
                var truckPrice = vm.truckSizeTypes[vm.quoting.truck_size_type - 1].hour_price;

                vm.quoting.packaging_price = (vm.quoting.moving_stuff_time * truckPrice) / 60;
                vm.quoting.travel_price = (timeAprox * truckPrice) / 60;
                vm.quoting.price = vm.quoting.packaging_price + vm.quoting.travel_price;

                vm.quoting.final_price = vm.quoting.price + 50;
            } else {
                vm.quoting.truck_price = 0;
            }
        }
    }

}());