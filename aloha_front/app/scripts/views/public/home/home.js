(function () {

    'use strict';

    angular.module('Public')
        .controller('HomeCtrl', HomeCtrl);

    function HomeCtrl($timeout, $scope, $uibModal, Main) {
        var vm = this;
        vm.quoting = {
            floor_from: 1,
            floor_to: 1
        };
        vm.steps = 1;

        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var map;
        var lima = new google.maps.LatLng(-12.0266032,-77.1282069);

        init();

        vm.makeSelection = makeSelection;
        vm.calculateRoute = calculateRoute;
        vm.calculateAmount = calculateAmount;
        vm.nextStep = function () { vm.steps ++; };
        vm.scrollUp = function () {
            angular.element('html, body').animate({ scrollTop: 0 }, 300);
        };

        function init() {
            generateMap();
            listTrucks();
            listHomeTypes();
        }

        function generateMap() {
            var mapOptions = {
                zoom: 7,
                center: lima
            };

            map = new google.maps.Map(document.getElementById('map'), mapOptions);
            directionsDisplay.setMap(map);
        }

        function listTrucks() {
            var p = Main.listTruckTypes();

            p.then(
                function (response) {
                    vm.typeTrucks = response;
                    // makeSelection('truck_type', vm.typeTrucks[0], true);
                }
            );
        }

        function listHomeTypes() {
            var p = Main.listHomeTypes();

            p.then(
                function (response) {
                    vm.homeTypesFrom = angular.copy(response);
                    vm.homeTypesTo = angular.copy(response);

                    // makeSelection('home_type_from', vm.homeTypesFrom[0]);
                    // makeSelection('home_type_to', vm.homeTypesTo[0]);
                }
            );
        }

        function makeSelection(type, value) {
            switch (type) {
                case 'home_type_from':
                    vm.steps = (vm.steps === 1) ? vm.steps + 1 : vm.steps;
                    vm.homeTypesFrom = vm.homeTypesFrom.map(
                        function (item) {
                            if (item.active) {
                                item.active = !item.active;
                            }

                            return item;
                        }
                    );
                    vm.homeTypesFromSelected = value;
                    vm.quoting.home_type_from_id = vm.homeTypesFromSelected.id;
                    break;

                case 'home_type_to':
                    vm.steps = (vm.steps === 2) ? vm.steps + 1 : vm.steps;
                    vm.homeTypesTo = vm.homeTypesTo.map(
                        function (item) {
                            if (item.active) {
                                item.active = !item.active;
                            }

                            return item;
                        }
                    );
                    vm.homeTypesToSelected = value;
                    vm.quoting.home_type_to_id = vm.homeTypesToSelected.id;
                    break;

                case 'truck_type':
                    vm.typeTrucks = vm.typeTrucks.map(
                        function (item) {
                            if (item.active) {
                                item.active = !item.active;
                            }

                            return item;
                        }
                    );
                    vm.typeTrucksSelected = value;
                    vm.quoting.truck_size_type_id = vm.typeTrucksSelected.id;
                    vm.quoting.packaging_time_aprox = vm.typeTrucksSelected.time_per_service;
                    calculateTruckPrice();
                    break;
            }

            vm.steps ++;
            value.active = true;
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

            $timeout(
                function () {
                    getRoute(request);
                }, 500
            );
        }

        function calculateAmount() {
            if (!vm.quoting.final_price) {
                calculateRoute();
            }

            $uibModal.open({
                templateUrl: 'scripts/views/public/calculating/calculating.html',
                controller: 'CalculatingCtrl',
                controllerAs: 'vm',
                resolve: {
                    Quoting: function () {
                        return vm.quoting;
                    }
                }
            });
        }

        function getRoute(request) {
            directionsService.route(request, function(response, status) {
                if (status === google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);

                    vm.quoting.travel_distance_aprox_label = response.routes[0].legs[0].distance.text;
                    vm.quoting.travel_distance_aprox = response.routes[0].legs[0].distance.value;
                    vm.quoting.travel_time_aprox_label = response.routes[0].legs[0].duration.text;
                    vm.quoting.travel_time_aprox = 2 * response.routes[0].legs[0].duration.value;

                    calculateTruckPrice();

                    $scope.$apply();
                }
            });
        }

        function calculateTruckPrice() {
            if (vm.quoting.travel_time_aprox && vm.typeTrucksSelected) {
                var timeAprox = vm.quoting.travel_time_aprox / 60;
                var truckPrice = vm.typeTrucksSelected.hour_price;

                vm.quoting.packaging_price = ((vm.quoting.packaging_time_aprox * truckPrice) / 60).toFixed(2);
                vm.quoting.travel_price = ((timeAprox * truckPrice) / 60).toFixed(2);
                vm.quoting.total_price = parseFloat(vm.quoting.packaging_price) + parseFloat(vm.quoting.travel_price);

                vm.quoting.final_price = roundToEndZero(Math.round(vm.quoting.total_price + 50));
            }
        }

        function roundToEndZero(price) {
            while (price % 10 !== 0) {
                price ++;
            }

            return price;
        }
    }

}());
