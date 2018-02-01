/**
 *
 * const __author__ = 'loualcala'
 * const __copyright__ = 'Copyright (c) 2018+ aloha. All Rights Reserved'
 *
 **/

(function () {

    'use strict';

    angular.module('Auth')
        .controller('LeadCtrl', LeadCtrl);

    function LeadCtrl($state, $stateParams, Main) {
        var vm = this;
        vm.leadId = $stateParams.leadId;

        init();

        function init() {
            if (!vm.leadId) {
                return $state.go('auth.Leads');
            }

            getLead();
            getLeadQuotations();
        }

        function getLead() {
            var p = Main.getLead(vm.leadId);

            p.then(
                function (response) {
                    vm.lead = response;
                }
            );
        }
        
        function getLeadQuotations() {
            var p = Main.listQuotations(vm.leadId);

            p.then(
                function (response) {
                    vm.quotations = response;

                    if (!vm.quotations.length) {
                        vm.empty_list = true;
                    }
                }
            );
        }
    }

}());