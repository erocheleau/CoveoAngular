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
                    _.each(routeParams, function (value, key) { // For each params, add them to the current parsedState
                        parsedState[key] = Coveo.HashUtils.getValue(key, '#' + locSearch); // Coveo.HashUtils needs a # to work...
                    })

                    $('#searchResults').coveo('state', parsedState); // Override the current coveo state.

                    $('#searchResults').on('state:change', function () { // Listen to state change only changing the state once so we don't create a loop.
                        handleStateChange(false);
                    });

                    $('#search').on('state:change', function () { // Listen to the searchbox in the header to trigger a query.
                        handleStateChange(true);
                    })
                });

                $('#searchResults').coveo('init');

                function handleStateChange(changeState) {
                    var resultsAttribute = $('#searchResults').coveo(Coveo.QueryStateModel).getAttributes(); // Get current searchresults state attributes.
                    var queryAttributes = $('#search').coveo(Coveo.QueryStateModel).getAttributes(); // Get current searchbox state attributes.
                    var attributes = $.extend({}, resultsAttribute, queryAttributes); // Merge the attributes from the searchbox and the searchresults.
                    var queryString = Coveo.HashUtils.encodeValues(attributes); // Encode the attributes for the url

                    _location.search(queryString); // Change the search part of the state without redirecting
                    $scope.$apply();

                    if (changeState) { // This is when the event was triggered from the searchbox
                        if (queryAttributes.q === undefined) { attributes.q = "" }; // Force empty the query when it was cleared in the searchbox
                        $('#searchResults').coveo('state', attributes); // Update the coveo state
                        $('#searchResults').coveo('executeQuery'); // Trigger a query
                    }
                }
            }]
    });