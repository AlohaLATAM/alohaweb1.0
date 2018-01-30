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

    function LeadCtrl($stateParams, Main) {
        var vm = this;

        init();

        function init() {
            getLead();
        }

        function getLead() {
            var leadId = $stateParams.leadId;

            var p = Main.getLead(leadId);

            p.then(
                function (response) {
                    vm.lead = response;
                }
            );
        }
    }

}());