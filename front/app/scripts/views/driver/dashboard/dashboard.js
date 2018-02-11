(function () {

    'use strict';

    angular.module('Driver')
        .controller('DashboardDriverCtrl', DashboardDriverCtrl);

    function DashboardDriverCtrl($state, $interval, Main) {
        var vm = this;
        var initialInterval = $interval(
            init, 10000
        );

        init();

        vm.goToService = goToService;

        function init() {
            getDriverTrucks();
        }

        function goToService(serviceId) {
            $interval.cancel(initialInterval);
            $state.go('driver.Service', {serviceId: serviceId});
        }

        function getDriverTrucks() {
            vm.empty_list = false;

            var p = Main.listTrucks({driver_id: 3});

            p.then(
                function (response) {
                    vm.trucks = response;

                    if (vm.trucks.length) {
                        var trucks = [];

                        for (var i = 0; i < vm.trucks.length; i++) {
                            trucks.push(vm.trucks[i].truck_type.id);
                        }

                        var listIds = trucks.filter(function(item, pos) {
                            return trucks.indexOf(item) === pos;
                        });

                        listServices(listIds.join());
                    }
                }
            );
        }

        function listServices(listTrucksIds) {
            vm.loading = true;

            var p = Main.listQuotations({truck_size_type_ids: listTrucksIds});

            p.then(
                function (response) {
                    vm.services = response;
                }
            ).finally(
                function () {
                    vm.loading = false;
                }
            );
        }
    }

}());
