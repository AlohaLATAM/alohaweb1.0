(function () {

    'use strict';

    angular.module('Driver')
        .controller('ServiceDriverCtrl', ServiceDriverCtrl);

    function ServiceDriverCtrl($stateParams, $state, Main, Persist) {
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var map;
        var lima = new google.maps.LatLng(-12.0266032,-77.1282069);
        var vm = this;
        vm.serviceId = $stateParams.serviceId;

        init();

        vm.assignService = assignService;

        function init() {
            if (!vm.serviceId) {
                return $state.go('driver.Dashboard');
            }

            getService();
            getServiceInventory();
        }

        function assignService() {
            if (confirm('¿Estás seguro de querer asignarte este servicio?')) {
                var params = {driver_id: Persist.get('driver')};
                var p = Main.updateQuotation(vm.serviceId, params);

                p.then(
                    function () {
                        $state.go('driver.Dashboard');
                    }
                );
            }
        }

        function getService() {
            vm.loading = true;

            var p = Main.getQuotation(vm.serviceId);

            p.then(
                function (response) {
                    vm.service = response;
                    generateMap();
                }
            ).finally(
                function () {
                    vm.loading = false;
                }
            );
        }

        function getServiceInventory() {
            vm.empty_list = false;

            var p = Main.getInventory(vm.serviceId);

            p.then(
                function (response) {
                    vm.inventory = response;

                    if (!vm.inventory.length) {
                        vm.empty_list = true;
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

        function calculateRoute() {
            var request = {
                origin: vm.service.address_from,
                destination: vm.service.address_to,
                travelMode: google.maps.TravelMode.DRIVING,
                language: 'es'
            };

            directionsService.route(request, function(response, status) {
                if (status === google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                }
            });
        }
    }
}());
