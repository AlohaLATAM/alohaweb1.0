/**
 *
 * const __author__ = 'loualcala'
 * const __copyright__ = 'Copyright (c) 2018+ aloha. All Rights Reserved'
 *
 **/

(function () {

    'use strict';

    angular.module('Auth')
        .controller('QuotingCtrl', QuotingCtrl);

    function QuotingCtrl() {
        var vm = this;
        vm.lead = {};
    }

}());