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
            .state('auth.Leads', {
                url: '/leads',
                templateUrl: 'scripts/views/auth/leads/leads.html',
                controller: 'LeadsCtrl',
                controllerAs: 'vm'
            })
            .state('auth.LeadDetails', {
                url: '/leads/{leadId}',
                templateUrl: 'scripts/views/auth/leads/lead.html',
                controller: 'LeadCtrl',
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
            })
            .state('auth.QuotationDetails', {
                url: '/cotizacion/{quotationId}',
                templateUrl: 'scripts/views/auth/quoting/quotation.html',
                controller: 'QuotationCtrl',
                controllerAs: 'vm'
            })
            .state('auth.Drivers', {
                url: '/choferes',
                templateUrl: 'scripts/views/auth/drivers/drivers.html',
                controller: 'DriversCtrl',
                controllerAs: 'vm'
            })
            .state('auth.NewDriver', {
                url: '/choferes/nuevo',
                templateUrl: 'scripts/views/auth/drivers/newDriver.html',
                controller: 'NewDriverCtrl',
                controllerAs: 'vm'
            });
    }

}());