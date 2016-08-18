(function () {
    'use strict';

    angular
        .module('HTPortal')
        .directive('searchResults', searchResults);


    /** @ngInject */
    function searchResults() {

        function searchResultsController($location, $scope) {

            $scope.ignoreNextHashChange = false;
            $scope.coveoIgnoreNextHashChange = false;

            var searchInterface = document.getElementById('searchResults');

            $scope.$location = $location;

            searchInterface.addEventListener('afterInitialization', function (e, args) {

                var parsedState = parseState($scope.$location.hash())

                Coveo.state(searchInterface, parsedState);
                Coveo.executeQuery(searchInterface);

                searchInterface.addEventListener('state:change', function (e, args) { // Listen to state change only changing the state once so we don't create a loop.
                    handleStateChange($scope);
                });

                $scope.$on('$locationChangeSuccess', function (event, newUrl, oldUrl) {
                    var parseNew = URI.parse(newUrl);
                    var parseOld = URI.parse(oldUrl);

                    if (parseNew.path === $location.path()) {
                        handleHashChange($scope, parseNew.fragment);
                    }
                });
            });


            Coveo.init(searchInterface, { externalComponents: [document.getElementById('header-search-box')] });
        }

        function link() {

        }

        function handleStateChange($scope) {
            if ($scope.coveoIgnoreNextHashChange) {
                $scope.coveoIgnoreNextHashChange = false;
                return;
            }
            console.log('Handle state change');
            var searchState = Coveo.state(document.getElementById('searchResults')).getAttributes();
            var queryString = Coveo.HashUtils.encodeValues(searchState);

            $scope.ignoreNextHashChange = true;
            $scope.$location.hash(queryString);
            $scope.$apply();
        }

        function handleHashChange($scope, fragment) {
            if ($scope.ignoreNextHashChange) {
                $scope.ignoreNextHashChange = false;
                return;
            }
            $scope.coveoIgnoreNextHashChange = true;
            var parsedState = parseState(fragment);
            var defaultAttributes = Coveo.state(document.getElementById('searchResults')).defaultAttributes;
            Coveo.state(document.getElementById('searchResults'), _.defaults(parsedState, defaultAttributes));
            Coveo.executeQuery(document.getElementById('searchResults'));
        }

        function parseState(state) {
            var decoded = URI.parseQuery(decodeURIComponent(state));

            var parsedState = {};
            _.each(decoded, function (value, key) {
                parsedState[key] = Coveo.HashUtils.getValue(key, '#' + state);
            })

            return parsedState;
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