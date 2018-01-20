/**
 *
 * const __author__ = 'loualcala'
 * const __copyright__ = 'Copyright (c) 2018+ aloha. All Rights Reserved'
 *
 **/

(function () {

    'use strict';

    angular.module('Auth')
        .controller('NewLeadCtrl', NewLeadCtrl);

    function NewLeadCtrl($state, Main) {
        var vm = this;
        vm.lead = {};

        vm.createLead = createLead;

        function createLead() {
            var p = Main.createLead(
                vm.lead.first_name,
                vm.lead.last_name,
                vm.lead.email,
                vm.lead.dni
            );

            p.then(
                function (response) {
                    console.log(response);
                    $state.go('auth.Quotation', {leadId: response.lead_id});
                },
                function (error) {
                    vm.error = error;
                }
            );
        }
    }

}());