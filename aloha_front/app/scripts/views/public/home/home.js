(function () {

    'use strict';

    angular.module('Public')
        .controller('HomeCtrl', HomeCtrl);

    function HomeCtrl(Main) {
        var vm = this;
        vm.quoting = {};

        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var map;
        var lima = new google.maps.LatLng(-12.0266032,-77.1282069);

        init();

        vm.makeSelection = makeSelection;
        vm.calculateRoute = calculateRoute;

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

            calculateRoute();
        }

        function listTrucks() {
            var p = Main.listTruckTypes();

            p.then(
                function (response) {
                    vm.typeTrucks = response;
                    vm.typeTrucks[0].active = true;
                }
            );
        }

        function listHomeTypes() {
            var p = Main.listHomeTypes();

            p.then(
                function (response) {
                    vm.homeTypesFrom = angular.copy(response);
                    vm.homeTypesTo = angular.copy(response);

                    vm.homeTypesFrom[0].active = true;
                    vm.homeTypesTo[0].active = true;
                }
            );
        }

        function makeSelection(type, value) {
            switch (type) {
                case 'home_type_from':
                    vm.homeTypesFrom = vm.homeTypesFrom.map(
                        function (item) {
                            if (item.active) {
                                item.active = !item.active;
                            }

                            return item;
                        }
                    );
                    break;
                case 'home_type_to':
                    vm.homeTypesTo = vm.homeTypesTo.map(
                        function (item) {
                            if (item.active) {
                                item.active = !item.active;
                            }

                            return item;
                        }
                    );
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
                    break;
            }

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

            console.log(vm.quoting);
        }
    }

}());