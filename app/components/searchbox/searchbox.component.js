'use strict';

angular
    .module('searchbox', [])

    .component('searchbox', {

        templateUrl: 'components/searchbox/searchbox.template.html',

        controller: ['$window', '$location', '$scope',
            function SearchboxController($window, $location, $scope) {

                var search = $('#search');
                var _location = $location;

                search.on('state:change', function () {
                    if (_location.path() !== "/search") { // If we are not on a search page.

                        var attributes = search.coveo(Coveo.QueryStateModel).getAttributes(); // Get current searchbox state attributes.
                        var queryString = Coveo.HashUtils.encodeValues(attributes); // Encode the attributes for the url.

                        _location.url('/search?' + queryString); // Redirect to the search state.
                        $scope.$apply();
                    }
                });

                Coveo.SearchEndpoint.configureSampleEndpoint(); // Sample Coveo Endpoint
                $('#search').coveo('init'); // Init Coveo.
            }]

    });
