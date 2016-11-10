"use strict";
angular.module("app").controller("student-counsel", ["$scope", "$log", "dealResource", "$timeout", "$location", "title", "$state", "$rootScope", "notifier", function($scope, $log, dealResource, $timeout, $location, title, $state, $rootScope, notifier) {

    $scope.isLoading = true;
    $scope.title = title;


    $scope.cousel = [{
        "id": "1",
        "name": "murali"
    }, {
        "id": "2",
        "name": "murali1"
    }, {
        "id": "3",
        "name": "murali2"
    }, {
        "id": "4",
        "name": "murali3"
    }];

    $scope.start = function() {
        // Set the 'submitted' flag to true
        $scope.submitted = true;

    };

}]);
