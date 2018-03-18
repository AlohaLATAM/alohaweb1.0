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
        vm.clearForm = clearForm;

        function createLead() {
            var p = Main.createLead(
                vm.lead.first_name,
                vm.lead.last_name,
                vm.lead.phone_number,
                vm.lead.dni
            );

            p.then(
                function (response) {
                    console.log(response);
                    $state.go('auth.Quotation', {leadId: response.id});
                },
                function (error) {
                    console.log(error);
                    vm.error = error;
                }
            );
        }

        function clearForm() {
            vm.lead = {
                first_name: '',
                last_name: '',
                phone_number: '',
                dni: ''
            };
        }
    }

}());