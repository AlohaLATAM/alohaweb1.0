(function () {

    'use strict';

    angular.module('Public')
        .controller('CalculatingCtrl', CalculatingCtrl);

    function CalculatingCtrl($timeout, Quoting, Main) {
        var vm = this;
        vm.quoting = Quoting;
        console.log(Quoting);
        vm.calculating = true;
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

        init();

        function init() {
            $timeout(
                function () {
                    vm.calculating = false;
                    vm.calculated = true;
                }, 3000
            );

            populateDates();
        }

        function showServiceDate() {
            return window.moment(vm.quoting.datetime_of_service).format('LLLL')
        }

        function acceptAmount() {
            vm.registration = true;
        }

        function registerService() {
            vm.quoting.card.amount = vm.quoting.final_price * 100;

            var p = Main.createWebQuotation(vm.quoting);

            p.then(
                function (response) {
                    console.log(response);
                    return response;
                },
                function (error) {
                    console.log(error);
                }
            );
        }

        function populateDates() {
            var year = new Date().getFullYear();
            var month = '';

            for (var i = 0; i <= 10; i ++) {
                vm.years.push(year + i);
            }

            for (var j = 1; j <= 12; j ++) {
                month = '';

                if (j < 10) {
                    month = '0';

                }

                vm.months.push(month + j);
            }
        }
    }

}());
