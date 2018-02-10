(function () {

    'use strict';

    angular.module('Shared')
        .directive('appService', appService);

    function appService() {
        return {
            replace: true,
            restrict: 'E',
            scope: {
                service: '=',
                fullcontent: '='
            },
            templateUrl: 'scripts/shared/service/service.html',
            controller: appServiceCtrl,
            controllerAs: 'vm'
        };

        function appServiceCtrl($scope) {
            var vm = this;
            vm.service = $scope.service;
            vm.service_date = (vm.service.datetime_of_service) ? window.moment(vm.service.datetime_of_service).format('LLLL') : '';
        }
    }
}());
