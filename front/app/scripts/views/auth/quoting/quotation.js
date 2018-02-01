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

    function QuotationCtrl($state, $stateParams, Main) {
        var vm = this;
        vm.quotationId = $stateParams.quotationId;
        vm.quotation = {};

        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var map;
        var lima = new google.maps.LatLng(-12.0266032,-77.1282069);

        init();

        function init() {
            if (!vm.quotationId) {
                return $state.go('auth.Leads');
            }

            getQuotation();
        }

        function getQuotation() {
            var p = Main.getQuotation(vm.quotationId);

            p.then(
                function (response) {
                    vm.quotation = response;
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
    }

}());