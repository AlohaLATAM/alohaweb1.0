/**
 *
 * const __author__ = 'loualcala'
 * const __copyright__ = 'Copyright (c) 2018+ aloha. All Rights Reserved'
 *
 **/

(function () {

    'use strict';

    angular.module('Auth')
        .controller('DashboardCtrl', DashboardCtrl);

    function DashboardCtrl(Main) {
        var vm = this;

        init();

        function init() {
            var p = Main.listQuotations({from_now: true});

            p.then(
                function (response) {
                    console.log(response);
                    vm.quotations = response;
                }
            );
        }
    }

}());