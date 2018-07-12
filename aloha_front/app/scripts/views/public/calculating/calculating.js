(function () {

    'use strict';

    angular.module('Public')
        .controller('CalculatingCtrl', CalculatingCtrl);

    function CalculatingCtrl($state, $timeout, $uibModalInstance, Quoting, Main) {
        var vm = this;
        vm.quoting = Quoting;
        vm.quoting.customer = {
            first_name: '',
            last_name: '',
            phone_number: '',
            email: ''
        };
        vm.quoting.service_date = '';
        vm.quoting.observations = '';
        vm.quoting.payment_method = 'transf';
        vm.quoting.card = {
            card_amount: 0,
            card_number: '',
            card_cvv: '',
            card_exp_month: '01',
            card_exp_year: new Date().getFullYear() + ''
        };
        vm.months = [];
        vm.years = [];

        vm.acceptAmount = acceptAmount;
        vm.registerService = registerService;
        vm.showServiceDate = showServiceDate;
        vm.updateService = updateService;

        function showServiceDate() {
            return window.moment(vm.quoting.datetime_of_service).format('LLLL');
        }

        function acceptAmount() {
            vm.registration = true;
        }

        function registerService() {
            vm.quoting.card.amount = vm.quoting.final_price * 100;

            var p = Main.createWebQuotation(vm.quoting);

            vm.loading = true;
            vm.error = false;

            p.then(
                function (response) {
                    /* $uibModalInstance.close();
                    $state.go('public.Thanks'); */
                    vm.showPriceCalculation = true;
                    vm.calculating = true;
                    vm.quoting = response;

                    $timeout(
                        function () {
                            vm.calculating = false;
                            vm.calculated = true;
                        }, 3000
                    );
                },
                function (error) {
                    vm.error = error;
                }
            ).finally(
                function () {
                    vm.loading = false;
                }
            );
        }

        function updateService() {
            var p = Main.updateWebQuotation(vm.quoting);

            vm.loading = true;
            vm.error = false;

            p.then(
                function () {
                    $uibModalInstance.close();
                    $state.go('public.Thanks');
                },
                function (error) {
                    vm.error = error;
                }
            ).finally(
                function () {
                    vm.loading = false;
                }
            );
        }
    }

}());
