'use strict';

// Define the `phoneList` module
angular
    .module('portalHeader', [])
    .component('portalHeader', {
        templateUrl: 'components/portal-header/portal-header.template.html',
        controller: function PortalHeaderController() {
            console.log('PortalHeaderController Entry');
        }
    });
