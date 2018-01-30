/**
 *
 * const __author__ = 'loualcala'
 * const __copyright__ = 'Copyright (c) 2018+ aloha. All Rights Reserved'
 *
 **/

(function () {

    'use strict';

    angular.module('Auth')
        .controller('ListLeadsCtrl', ListLeadsCtrl);

    function ListLeadsCtrl(Main) {
        var vm = this;

        init();

        function init() {
            getLeads();
        }

        function getLeads() {
            var p = Main.listLeads();

            vm.empty_list = false;

            p.then(
                function (response) {
                    vm.list = response;

                    if (!vm.list.length) {
                        vm.empty_list = true;
                    }
                }
            );
        }
    }

}());