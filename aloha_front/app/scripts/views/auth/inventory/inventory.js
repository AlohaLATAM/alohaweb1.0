/**
 *
 * const __author__ = 'loualcala'
 * const __copyright__ = 'Copyright (c) 2018+ aloha. All Rights Reserved'
 *
 **/

(function () {

    'use strict';

    angular.module('Auth')
        .controller('InventoryCtrl', InventoryCtrl);

    function InventoryCtrl($stateParams, Main, QuotationId, Lead, $uibModalInstance) {
        var vm = this;
        vm.quotationId = QuotationId;
        vm.lead = Lead;
        vm.newItem = {};
        vm.startNewItem = true;

        init();

        vm.addItem = addItem;
        vm.deleteItem = deleteItem;
        vm.close = function () {$uibModalInstance.close();};

        function init() {
            getInventory();
        }

        function addItem() {
            vm.addingItem = true;

            var p = Main.createInventoryItem(vm.quotationId, vm.newItem.quantity, vm.newItem.item_name);

            p.then(
                function () {
                    vm.newItem = {};
                    getInventory();
                }
            ).finally(
                function () {
                    vm.addingItem = false;
                    vm.startNewItem = true;
                }
            );
        }

        function getInventory() {
            var p = Main.getInventory(vm.quotationId);

            p.then(
                function (response) {
                    vm.inventoryList = response;
                }
            );
        }

        function deleteItem(itemId) {
            var p = Main.destroyInventoryItem(vm.quotationId, itemId);

            p.then(
                function () {
                    getInventory();
                },
                function (error) {
                    console.log(error);
                }
            );
        }
    }

}());