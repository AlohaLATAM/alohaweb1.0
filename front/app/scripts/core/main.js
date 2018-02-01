/**
 *
 * const __author__ = 'loualcala'
 * const __copyright__ = 'Copyright (c) 2018+ aloha. All Rights Reserved'
 *
 **/

(function () {

    'use strict';

    angular.module('Core')
        .factory('Main', Main);

    function Main($q, Api, Utils, Persist, Message) {
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

        function signIn(email, password) {
            if (!email || !password) {
                return $q.reject(Message.all_required);
            }

            if (!Utils.validateEmail(email)) {
                return $q.reject(Message.invalid_email_format);
            }

            var params = {
                email: email,
                password: password
            };
            var p = Api.signIn(params);

            p = p.then(
                function (response) {
                    if (response.token) {
                        Persist.set('token', response.token);
                    }

                    return response;
                }
            );

            return p;
        }

        function createLead(first_name, last_name, email, dni) {
            if (!first_name || !last_name || !email || !dni) {
                return $q.reject(Message.all_required);
            }

            if (!Utils.validateEmail(email)) {
                return $q.reject(Message.invalid_email_format);
            }

            var params = {
                first_name: first_name,
                last_name: last_name,
                email: email,
                dni: dni
            };
            var p = Api.createLead(params);

            p = p.then(
                function (response) {
                    return response;
                },
                function (error) {
                    return $q.reject(error.data);
                }
            );

            return p;
        }

        function listLeads() {
            var p = Api.listLeads();

            p = p.then(
                function (response) {
                    return response;
                }
            );

            return p;
        }

        function getLead(id) {
            if (!id) {
                return $q.reject('No está permitido.');
            }

            var p = Api.getLead(id);

            p = p.then(
                function (response) {
                    return response;
                }
            );

            return p;
        }

        function listTruckTypes() {
            var p = Api.listTruckTypes();

            p = p.then(
                function (response) {
                    return response;
                }
            );

            return p;
        }

        function listHomeTypes() {
            var p = Api.listHomeTypes()

            p = p.then(
                function (response) {
                    return response
                }
            );

            return p;
        }
        
        function createQuotation(quotation) {
            if (!quotation.lead_id || !quotation.address_from || !quotation.home_type_from_id || !quotation.floor_from || !quotation.address_to || !quotation.home_type_to_id || !quotation.floor_to || !quotation.travel_distance_aprox || !quotation.travel_time_aprox || !quotation.truck_size_type_id || !quotation.packaging_time_aprox || !quotation.packaging_price || !quotation.travel_price || !quotation.total_price || !quotation.final_price || !quotation.profit) {
                return $.reject('Verifique que todos los campos estén completos.');
            }

            var p = Api.createQuotation(quotation);

            p = p.then(
                function (response) {
                    return response;
                },
                function (error) {
                    return $q.reject(error.data);
                }
            );

            return p;
        }

        function listQuotations(leadId) {
            if (!leadId) {
                return $q.reject('El lead no existe.');
            }

            var params = {lead_id: leadId};
            var p = Api.listQuotations(params);

            p = p.then(
                function (response) {
                    return response;
                }
            );

            return p;
        }

        function listDrivers() {
            var p = Api.listDrivers();

            p = p.then(
                function (response) {
                    return response;
                }
            );

            return p;
        }

        function listDistricts() {
            var p = Api.listDistricts();

            p = p.then(
                function (response) {
                    return response;
                }
            );

            return p;
        }

        function createDriver(driver) {
            if (!driver.first_name || !driver.last_name || !driver.phone_number || !driver.dni || !driver.license_number || !driver.district_id) {
                return $.reject('Verifique que todos los campos estén completos.');
            }

            var p = Api.createDriver(driver);

            p = p.then(
                function (response) {
                    return response;
                },
                function (error) {
                    return $q.reject(error.data);
                }
            );

            return p;
        }

        function getQuotation(quotationId) {
            if (!quotationId) {
                return $q.reject('No se pudo encontrar la cotización.');
            }

            var p = Api.getQuotation(quotationId);

            p = p.then(
                function (response) {
                    return response;
                }
            );

            return p;
        }
    }

}());