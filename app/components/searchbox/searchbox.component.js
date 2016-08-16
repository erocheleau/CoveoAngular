'use strict';

// Define the `phoneList` module
angular
    .module('searchbox', [])

    .component('searchbox', {

        templateUrl: 'components/searchbox/searchbox.template.html',

        controller: ['$window', '$location', '$scope',
            function SearchboxController($window, $location, $scope) {
                console.log('SearchboxController Entry');

                var search = $('#search');
                var _location = $location;

                search.on('state:change', function () {
                    if (_location.path() !== "/search") {

                        var attributes = search.coveo(Coveo.QueryStateModel).getAttributes();
                        var queryString = Coveo.HashUtils.encodeValues(attributes);

                        _location.url('/search?' + queryString); // Redirect to the search state.
                        $scope.$apply();

                    }
                });

                Coveo.SearchEndpoint.configureSampleEndpoint();
                $('#search').coveo('init');
            }]

    });
