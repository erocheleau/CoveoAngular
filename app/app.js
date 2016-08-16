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

    // $rootScope.searchPage = false;

    // $rootScope.$on('$routeChangeSuccess', function (e, args) {

    //     console.log('Angular route change sucess');
    //     $rootScope.searchPage = (args.originalPath && args.originalPath === "/search");
    // });

    // $rootScope.$on('$viewContentLoaded', function(e, args) {
    //     console.log('Angular $viewContentLoaded event');
    // })
}]);

// app.controller('MainController', ['$scope', '$rootScope', '$route', function ($scope, $rootScope, $route) {
//     $rootScope.$on('$routeChangeSuccess', function () {
//         deubgger;
//     });
// }]);
