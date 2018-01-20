/**
 *
 * const __author__ = 'loualcala'
 * const __copyright__ = 'Copyright (c) 2018+ aloha. All Rights Reserved'
 *
 **/

(function () {

    'use strict';

    var Message = {
        all_required: 'Todos los campos son requeridos.',
        invalid_email_format: 'Ingrese un correo válido.'
    };

    angular.module('Core')
        .constant('Message', Message);

}());