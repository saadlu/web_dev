var myModule = angular.module("myModule", ['ui.router', 'toaster']);

myModule.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/home");

    $stateProvider
        .state('home', {
            url: "/home",
            templateUrl: "partials/child.html",
            controller: "myController"
        });
});

myModule.controller("myController", function ($scope, toaster, $state) {

    console.log('loaded');
    
    $scope.click = function () {
        console.log("hi");
        $state.reload();
        toaster.pop('success', "title", "text");
    }
});