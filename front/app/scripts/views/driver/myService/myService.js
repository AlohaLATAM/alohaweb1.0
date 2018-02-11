(function () {

    'use strict';

    angular.module('Driver')
        .controller('MyServiceDriverCtrl', MyServiceDriverCtrl);

    function MyServiceDriverCtrl(Main, Persist) {
        var vm = this;

        init();

        function init() {
            getMyServices()
        }

        function getMyServices() {
            vm.empty_list = false;

            var p = Main.listQuotations({driver_id: Persist.get('driver')});

            p.then(
                function (response) {
                    vm.services = response;

                    if (!vm.services.length) {
                        vm.empty_list = true;
                    }
                }
            );
        }
    }
}());
