(function () {

    'use strict';

    angular.module('Shared')
        .directive('publicHeader', publicHeader);

    function publicHeader() {
        return {
            replace: true,
            restrict: 'E',
            scope: {},
            templateUrl: 'scripts/shared/header/header.html',
            controller: publicHeaderCtrl,
            controllerAs: 'vm'
        };

        function publicHeaderCtrl() {
            var vm = this;
        }
    }

}());