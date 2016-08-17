(function () {
    'use strict';

    angular
        .module ('HTPortal')
        .directive ('header', header);


    /** @ngInject */
    function header() {

        function directiveController($location){
            var _location = $location;
            if ($location.path() !== '/search') {
                Coveo.initSearchbox(document.getElementById('header-search-box'), '/#search');
            }
        }

        function link(){

        }

        return {
            controller: directiveController,
            controllerAs: 'headerCtrl',
            link: link,
            restrict: 'E',
            templateUrl: 'directives/header/header.template.html'
        }
    }

} ());