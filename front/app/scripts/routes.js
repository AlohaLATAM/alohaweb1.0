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
        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode({
            enabled: (window.__env__.HTML5MODE !== false),
            requireBase: false
        });

        $stateProvider
            .state('auth', {
                abstract: true,
                template: '<ui-view></ui-view>'
            })
            .state('auth.Dashboard', {
                url: '/',
                templateUrl: 'scripts/views/auth/dashboard/dashboard.html',
                controller: 'DashboardCtrl',
                controllerAs: 'vm'
            })
            .state('auth.ListLeads', {
                url: '/leads',
                templateUrl: 'scripts/views/auth/leads/listLeads.html',
                controller: 'ListLeadsCtrl',
                controllerAs: 'vm'
            })
            .state('auth.NewLead', {
                url: '/leads/nuevo',
                templateUrl: 'scripts/views/auth/leads/newLead.html',
                controller: 'NewLeadCtrl',
                controllerAs: 'vm'
            })
            .state('auth.Quotation', {
                url: '/cotizador/{leadId}',
                templateUrl: 'scripts/views/auth/quoting/quoting.html',
                controller: 'QuotingCtrl',
                controllerAs: 'vm'
            });
    }

}());