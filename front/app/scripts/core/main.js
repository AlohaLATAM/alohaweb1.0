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
            getQuotation: getQuotation,
            getDriver: getDriver,
            getInventory: getInventory,
            createInventoryItem: createInventoryItem,
            destroyInventoryItem: destroyInventoryItem,
            createTruck: createTruck,
            listTrucks: listTrucks,
            updateQuotation: updateQuotation
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

        function createLead(first_name, last_name, phone_number, dni) {
            if (!first_name || !last_name || !phone_number) {
                return $q.reject(Message.all_required);
            }

            var params = {
                first_name: first_name,
                last_name: last_name,
                phone_number: phone_number,
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
                return $q.reject('Verifique que todos los campos estén completos.');
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

        function listQuotations(params) {
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
            if (!driver.first_name || !driver.last_name || !driver.phone_number || !driver.license_number || !driver.district_id) {
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

        function getDriver(driverId) {
            if (!driverId) {
                return $q.reject('El chofer no existe.');
            }

            var p = Api.getDriver(driverId);

            p = p.then(
                function (response) {
                    return response;
                }
            );

            return p;
        }

        function getInventory(quotationId) {
            if (!quotationId) {
                return $q.reject('No se pudo encontrar la cotización.');
            }

            var params = {quotation_id: quotationId};
            var p = Api.getInventory(params);

            p = p.then(
                function (response) {
                    return response;
                }
            );

            return p;
        }

        function createInventoryItem(quotationId, quantity, item_name) {
            if (!quotationId) {
                return $q.reject('No se pudo encontrar la cotización.');
            }

            if (!quantity || !item_name) {
                return $q.reject('Todos los campos son obligatorios.');
            }

            var params = {
                quotation_id: quotationId,
                quantity: quantity,
                item_name: item_name
            };
            var p = Api.createInventoryItem(params);

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

        function destroyInventoryItem(quotationId, itemId) {
            if (!quotationId) {
                return $q.reject('No se pudo encontrar la cotización.');
            }

            if (!itemId) {
                return $q.reject('No se pudo encontrar la item.');
            }

            var params = {quotation_id: quotationId};
            var p = Api.destroyInventoryItem(itemId, params);

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

        function createTruck(driverId, truck_type_size_id, registration_number, its_furgon) {
            if (!driverId) {
                return $q.reject('No se pudo encontrar el chofer.');
            }

            if (!truck_type_size_id || !registration_number) {
                return $q.reject('Todos los campos son obligatorios.');
            }

            var params = {
                driver_id: driverId,
                truck_size_type_id: truck_type_size_id,
                registration_number: registration_number,
                its_furgon: its_furgon
            };
            var p = Api.createTruck(params);

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

        function listTrucks(params) {
            var p = Api.listTrucks(params);

            p = p.then(
                function (response) {
                    return response;
                }
            );

            return p;
        }

        function updateQuotation(quotationId, params) {
            if (!quotationId) {
                return $q.reject('No se pudo encontrar la cotización.');
            }

            var p = Api.updateQuotation(quotationId, params);

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
    }

}());
