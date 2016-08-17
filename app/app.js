'use strict';

var app = angular.module('HTPortal', ['ui.router']);

app.config(['$locationProvider', '$stateProvider', '$urlRouterProvider',
    function config($locationProvider, $stateProvider, $urlRouterProvider) {
        // $locationProvider.hashPrefix('!');
        $locationProvider.html5Mode(true);

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'views/home/home.template.html',
                controller: 'HomeCtrl'
            })
            .state('search', {
                url: '/search?q',
                templateUrl: 'views/search/search.template.html',
                controller: 'SearchCtrl'
            })

        // $routeProvider
        //     // .when('/', {
        //     //     template: '<partial-home></partial-home>'
        //     // })

        //     // .when('/home', {
        //     //     template: '<partial-home></partial-home>'
        //     // })

        //     .when('/home', {
        //         templateUrl: 'views/home/home.template.html',
        //         controller: 'HomeCtrl'
        //     })

        //     .when('/search#q', {
        //         templateUrl: 'views/search/search.template.html',
        //         controller: 'SearchCtrl'
        //     })

        //     // .when('/search/:query?', {
        //     //     template: '<search-results></search-results>',
        //     //     reloadOnSearch: false
        //     // })

        //     .otherwise('/home');

        $urlRouterProvider.otherwise('/home');
    }
]);

app.run(['$rootScope', '$location', function run($rootScope, $location) {
    // CODE EXECUTED ON APP RUN
    Coveo.SearchEndpoint.configureSampleEndpoint();
}]);

app.controller('MainController', ['$scope', '$rootScope', '$route', function ($scope, $rootScope, $route) {
    // MAIN CONTROLLER
}]);
