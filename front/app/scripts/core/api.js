/**
 *
 * const __author__ = 'loualcala'
 * const __copyright__ = 'Copyright (c) 2018+ aloha. All Rights Reserved'
 *
 **/

(function () {

    'use strict';

    angular.module('Core')
        .factory('Api', Api);

    function Api($http, Config) {
        return {
            signIn: signIn,
            createLead: createLead,
            listLeads: listLeads,
            getLead: getLead,
            listTruckTypes: listTruckTypes,
            listHomeTypes: listHomeTypes,
            createQuotation: createQuotation,
            listQuotations: listQuotations,
            listDrivers: listDrivers,
            listDistricts: listDistricts,
            createDriver: createDriver,
            getQuotation: getQuotation
        };
        
        function signIn(params) {
            return __post('auth', params);
        }

        function createLead(params) {
            return __post('leads', params)
        }

        function listLeads(token) {
            return __get('leads', token);
        }

        function getLead(leadId, token) {
            return __get('leads/' + leadId, token);
        }

        function listTruckTypes(token) {
            return __get('truck_size_types', token);
        }

        function listHomeTypes(token) {
            return __get('home_types', token);
        }

        function createQuotation(params, token) {
            return __post('quotations', params, token)
        }

        function listQuotations(params, token) {
            return __get('quotations', params, token);
        }

        function listDrivers(token) {
            return __get('drivers', token);
        }

        function listDistricts(token) {
            return __get('districts', token);
        }

        function createDriver(params, token) {
            return __post('drivers', params, token);
        }

        function getQuotation(quotationId, token) {
            return __get('quotations/' + quotationId, token);
        }
        
        function __post(endpoint, params, token) {
            var csrftoken = __getCookie('csrftoken');

            if (csrftoken) {
                $http.defaults.headers.common['X-CSRFToken'] = csrftoken;
            }

            endpoint = __generateEndpointAndHeaders(endpoint, token);

            var p = $http.post(endpoint, params);

            p = p.then(
                function (response) {
                    return response.data;
                }
            );

            return p;
        }

        function __get(endpoint, params, token) {
            endpoint = __generateEndpointAndHeaders(endpoint, token);

            var p = $http.get(endpoint, {params: params});

            p = p.then(
                function (response) {
                    return response.data;
                }
            );

            return p;
        }

        function __delete(endpoint, params, token) {
            endpoint = __generateEndpointAndHeaders(endpoint, token);

            var p = $http.delete(endpoint, {params: params});

            p = p.then(
                function (response) {
                    return response.data;
                }
            );

            return p;
        }

        function __put(endpoint, params, token) {
            endpoint = __generateEndpointAndHeaders(endpoint, token);

            var p = $http.put(endpoint, params);

            p = p.then(
                function (response) {
                    return response.data;
                }
            );

            return p;
        }

        function __generateEndpointAndHeaders(endpoint, token) {
            if (token) {
                $http.defaults.headers.common['Authorization'] = 'Token ' + token;
            }

            return Config.API_ROOT + '/api/' + endpoint + '/';
        }

        function __getCookie(name) {
            var cookieValue = null;

            if (document.cookie && document.cookie != '') {
                var cookies = document.cookie.split(';');

                for (var i = 0; i < cookies.length; i++) {
                    var cookie = jQuery.trim(cookies[i]);

                    if (cookie.substring(0, name.length + 1) == (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }

            return cookieValue;
        }
    }

}());