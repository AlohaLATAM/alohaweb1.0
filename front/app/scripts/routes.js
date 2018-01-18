/**
 *
 * const __author__ = 'loualcala'
 * const __copyright__ = 'Copyright (c) 2018+ aloha. All Rights Reserved'
 *
 **/

(function () {

    'use strict';

    angular.module('frontApp')
        .config(appRoutes);

    function appRoutes($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/dashboard');
        $locationProvider.html5Mode({
            enabled: (__env__.HTML5MODE) !== false,
            requireBase: false
        });

        $stateProvider
            .state('main', {
                abstract: true,
                template: '<ui-view></ui-view>'
            })
            .state('main.Dashboard', {
                url: '/dashboard',
                templateUrl: 'scripts/views/dashboard/dashboard.html',
                controller: 'DashboardCtrl',
                controllerAs: 'vm'
            });
    }

}());