'use strict';

var app = angular.module('HTPortal', ['ngRoute', 'portalHeader', 'partialHome', 'searchbox', 'searchResults']);

app.config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider
            .when('/', {
                template: '<partial-home></partial-home>'
            })

            .when('/home', {
                template: '<partial-home></partial-home>'
            })

            .when('/search/:query?', {
                template: '<search-results></search-results>',
                reloadOnSearch: false
            })

            .otherwise('/');

        $locationProvider.html5Mode(true);
    }
]);

app.run(['$rootScope', '$location', function run($rootScope, $location) {
    // CODE EXECUTED ON APP RUN
}]);

app.controller('MainController', ['$scope', '$rootScope', '$route', function ($scope, $rootScope, $route) {
    // MAIN CONTROLLER
}]);
