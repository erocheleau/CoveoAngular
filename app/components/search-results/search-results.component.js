'use strict';

angular
    .module('searchResults', ['ngRoute'])
    .component('searchResults', {
        templateUrl: 'components/search-results/search-results.template.html',
        controller: ['$scope', '$routeParams', '$location',
            function SearchResultsController($scope, $routeParams, $location) {

                var _location = $location;
                $scope.$routeParams = $routeParams; // Need this so Angular inject those vars into the function.

                $('#searchResults').on('afterInitialization', function () {
                    var locSearch = window.location.search.replace('?', ''); // window.location.search includes a ? we need to remove it.
                    var routeParams = $routeParams;
                    var location = $location;

                    var parsedState = {}; // We need to manually parse the search state.
                    _.each(routeParams, function (value, key) {
                        parsedState[key] = Coveo.HashUtils.getValue(key, '#' + locSearch); // Coveo.HashUtils needs a # to work...
                    })

                    $('#searchResults').coveo('state', parsedState); // Override the current coveo state.

                    $('#searchResults').on('state:change', function () { // Listen to state change only changing the state once so we don't create a loop.

                        // var attributes = $('#searchResults').coveo(Coveo.QueryStateModel).getAttributes(); // Get current state attributes.
                        // var queryAttributes = $('#search').coveo(Coveo.QueryStateModel).getAttributes();
                        // $.extends(attributes, queryAttributes); // Merge the attributes from the searchbox and the searchresults.
                        // $('#searchResults').coveo('state', attributes); // Override the current coveo state.

                        // var queryString = Coveo.HashUtils.encodeValues(attributes); // Encode the attributes for the url

                        // _location.search(queryString); // Change state without redirecting
                        // $scope.$apply();
                        // $('#searchResults').coveo('executeQuery');
                        handleStateChange(false);
                    });

                    $('#search').on('state:change', function () { // Listen to the searchbox in the header to trigger a query.
                        // var attributes = $('#search').coveo(Coveo.QueryStateModel).getAttributes(); // Get current state attributes.
                        // var queryString = Coveo.HashUtils.encodeValues(attributes); // Encode the attributes for the url

                        // _location.search(queryString); // Change state without redirecting
                        // $scope.$apply();
                        // $('#searchResults').coveo('executeQuery');

                        handleStateChange(true);
                    })
                });

                $('#searchResults').coveo('init');

                function handleStateChange(changeState) {
                    var resultsAttribute = $('#searchResults').coveo(Coveo.QueryStateModel).getAttributes();
                    var queryAttributes = $('#search').coveo(Coveo.QueryStateModel).getAttributes();
                    var attributes = $.extend({}, resultsAttribute, queryAttributes);
                    var queryString = Coveo.HashUtils.encodeValues(attributes);

                    _location.search(queryString);
                    $scope.$apply();

                    if (changeState) {
                        if (queryAttributes.q === undefined) { attributes.q = "" };
                        $('#searchResults').coveo('state', attributes);
                        $('#searchResults').coveo('executeQuery');
                    }

                    // $('#searchResults').coveo('executeQuery');
                }
            }]
    });