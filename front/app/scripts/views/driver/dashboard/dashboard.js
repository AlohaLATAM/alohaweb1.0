(function () {

    'use strict';

    angular.module('Driver')
        .controller('DashboardDriverCtrl', DashboardDriverCtrl);

    function DashboardDriverCtrl(Main) {
        var vm = this;

        init();

        function init() {
            listServices()
        }

        function listServices() {
            vm.loading = true;

            var p = Main.listQuotations();

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
