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
            listDistricts: listDistricts,
            listTrucks: listTrucks,
            listTruckSizeTypes: listTruckSizeTypes
        };
        
        function signIn(params) {
            return __post('auth', params);
        }

        function createLead(params) {
            return __post('leads', params)
        }

        function listDistricts(token) {
            return __get('districts', token);
        }

        function listTrucks(token) {
            return __get('trucks', token)
        }

        function listTruckSizeTypes(token) {
            return __get('truck_size_types', token);
        }
        
        function __post(endpoint, params, token) {
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

            return Config.API_ROOT + '/api/' + endpoint;
        }
    }

}());