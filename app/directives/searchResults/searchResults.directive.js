(function () {
    'use strict';

    angular
        .module('HTPortal')
        .directive('searchResults', searchResults);


    /** @ngInject */
    function searchResults() {

        function searchResultsController($location, $scope) {

            var searchInterface = document.getElementById('searchResults');

            $scope.$location = $location;

            searchInterface.addEventListener('afterInitialization', function (e, args) {
                var decoded = URI.parseQuery(decodeURIComponent($scope.$location.hash()));
                
                var parsedState = {};
                _.each(decoded, function (value, key) {
                    parsedState[key] = Coveo.HashUtils.getValue(key, '#' + $scope.$location.hash());
                })

                Coveo.state(searchInterface, parsedState);
                Coveo.executeQuery(searchInterface);
            })

            Coveo.init(searchInterface, { externalComponents: [document.getElementById('header-search-box')] });
        }

        function link() {

        }

        function parseState(state) {

        }

        return {
            controller: searchResultsController,
            controllerAs: 'searchResultsCtrl',
            link: link,
            restrict: 'AE',
            templateUrl: 'directives/searchResults/searchResults.template.html'
        }
    }

} ());