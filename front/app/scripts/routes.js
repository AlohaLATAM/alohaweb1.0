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
            .state('public', {
                abstract: true,
                templateUrl: 'scripts/views/public/template.html'
            })
            .state('public.DriverSignin', {
                url: '/driver/access',
                templateUrl: 'scripts/views/public/signinDriver/signin.html',
                controller: 'SigninDriverCtrl',
                controllerAs: 'vm'
            })
            .state('auth', {
                abstract: true,
                templateUrl: 'scripts/views/auth/template.html'
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
            .state('auth.Inventory', {
                url: '/cotizacion/{quotationId}/inventario',
                templateUrl: 'scripts/views/auth/inventory/inventory.html',
                controller: 'InventoryCtrl',
                controllerAs: 'vm'
            })
            .state('auth.Drivers', {
                url: '/choferes',
                templateUrl: 'scripts/views/auth/drivers/drivers.html',
                controller: 'DriversCtrl',
                controllerAs: 'vm'
            })
            .state('auth.DriversDetails', {
                url: '/choferes/{driverId}',
                templateUrl: 'scripts/views/auth/drivers/driver.html',
                controller: 'DriverCtrl',
                controllerAs: 'vm'
            })
            .state('auth.NewDriver', {
                url: '/choferes/nuevo',
                templateUrl: 'scripts/views/auth/drivers/newDriver.html',
                controller: 'NewDriverCtrl',
                controllerAs: 'vm'
            })
            .state('driver', {
                abstract: true,
                templateUrl: 'scripts/views/driver/template.html'
            })
            .state('driver.Dashboard', {
                url: '/driver',
                templateUrl: 'scripts/views/driver/dashboard/dashboard.html',
                controller: 'DashboardDriverCtrl',
                controllerAs: 'vm'
            })
            .state('driver.Service', {
                url: '/service/{serviceId}',
                templateUrl: 'scripts/views/driver/service/service.html',
                controller: 'ServiceDriverCtrl',
                controllerAs: 'vm'
            })
            .state('driver.MyServices', {
                url: '/driver/my_services',
                templateUrl: 'scripts/views/driver/myService/myService.html',
                controller: 'MyServiceDriverCtrl',
                controllerAs: 'vm'
            });
    }

}());
