'use strict';

angular
    .module('partialHome', [])
    .component('partialHome', {
        templateUrl: 'components/partial-home/partial-home.template.html',
        controller: function PartialHomeController() {
            console.log('PartialHomeController Entry');
        }
    });

