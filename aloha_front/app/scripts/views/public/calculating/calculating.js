(function () {

    'use strict';

    angular.module('Public')
        .controller('CalculatingCtrl', CalculatingCtrl);

    function CalculatingCtrl($timeout, Quoting) {
        var vm = this;
        vm.quoting = Quoting;
        vm.calculating = true;

        init();

        function init() {
            $timeout(
                function () {
                    vm.calculating = false;
                    vm.calculated = true;
                }, 3000
            );
        }
    }

}());