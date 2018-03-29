(function () {

    'use strict';

    angular.module('Auth')
        .controller('templateCtrl', templateCtrl);

    function templateCtrl(Main) {
        var vm = this;

        vm.signOut = Main.signOut;
    }

}());
