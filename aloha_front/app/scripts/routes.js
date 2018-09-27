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
        $urlRouterProvider.otherwise('/mudanza');
        $locationProvider.html5Mode({
            enabled: (window.__env__.HTML5MODE !== false),
            requireBase: false
        });

        $stateProvider
            .state('public', {
                abstract: true,
                templateUrl: 'scripts/views/public/template.html'
            })
            .state('public.Home', {
                url: '/mudanza',
                templateUrl: 'scripts/views/public/home/home.html',
                controller: 'HomeCtrl',
                controllerAs: 'vm'
            })
            .state('public.Thanks', {
                url: '/mudanza/gracias',
                templateUrl: 'scripts/views/public/thanks/thanks.html'
            })
            .state('public.Signin', {
                url: '/access',
                templateUrl: 'scripts/views/public/signin/signin.html',
                controller: 'SigninCtrl',
                controllerAs: 'vm'
            })
            .state('public.About', {
                url: '/mudanza/nosotros',
                templateUrl: 'scripts/views/public/single/about-us.html'
            })
            .state('public.Contact', {
                url: '/mudanza/contacto',
                templateUrl: 'scripts/views/public/single/contact-us.html'
            })
            .state('auth', {
                abstract: true,
                templateUrl: 'scripts/views/auth/template.html'
            })
            .state('auth.Dashboard', {
                url: '/panel',
                templateUrl: 'scripts/views/auth/dashboard/dashboard.html',
                controller: 'DashboardCtrl',
                controllerAs: 'vm'
            })
            .state('auth.Leads', {
                url: '/panel/leads',
                templateUrl: 'scripts/views/auth/leads/leads.html',
                controller: 'LeadsCtrl',
                controllerAs: 'vm'
            })
            .state('auth.LeadDetails', {
                url: '/panel/leads/{leadId}',
                templateUrl: 'scripts/views/auth/leads/lead.html',
                controller: 'LeadCtrl',
                controllerAs: 'vm'
            })
            .state('auth.NewLead', {
                url: '/panel/leads/nuevo',
                templateUrl: 'scripts/views/auth/leads/newLead.html',
                controller: 'NewLeadCtrl',
                controllerAs: 'vm'
            })
            .state('auth.Quotation', {
                url: '/panel/cotizador/{leadId}',
                templateUrl: 'scripts/views/auth/quoting/quoting.html',
                controller: 'QuotingCtrl',
                controllerAs: 'vm'
            })
            .state('auth.QuotationDetails', {
                url: '/panel/cotizacion/{quotationId}',
                templateUrl: 'scripts/views/auth/quoting/quotation.html',
                controller: 'QuotationCtrl',
                controllerAs: 'vm'
            })
            .state('auth.Inventory', {
                url: '/panel/cotizacion/{quotationId}/inventario',
                templateUrl: 'scripts/views/auth/inventory/inventory.html',
                controller: 'InventoryCtrl',
                controllerAs: 'vm'
            })
            .state('auth.Drivers', {
                url: '/panel/choferes',
                templateUrl: 'scripts/views/auth/drivers/drivers.html',
                controller: 'DriversCtrl',
                controllerAs: 'vm'
            })
            .state('auth.DriversDetails', {
                url: '/panel/choferes/{driverId}',
                templateUrl: 'scripts/views/auth/drivers/driver.html',
                controller: 'DriverCtrl',
                controllerAs: 'vm'
            })
            .state('auth.NewDriver', {
                url: '/panel/choferes/nuevo',
                templateUrl: 'scripts/views/auth/drivers/newDriver.html',
                controller: 'NewDriverCtrl',
                controllerAs: 'vm'
            });
    }

}());
