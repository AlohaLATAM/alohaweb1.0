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
                template: '<ui-view></ui-view>'
            })
            .state('public.Signin', {
                url: '/',
                templateUrl: 'scripts/views/public/signin/signin.html',
                controller: 'SigninCtrl',
                controllerAs: 'vm'
            })
            .state('auth', {
                abstract: true,
                template: '<ui-view></ui-view>'
            })
            .state('auth.Dashboard', {
                url: '/dashboard',
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
                url: '/leads/new',
                templateUrl: 'scripts/views/auth/leads/newLead.html',
                controller: 'NewLeadCtrl',
                controllerAs: 'vm'
            });
    }

}());