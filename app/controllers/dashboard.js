"use strict";
angular.module("app").controller("dashboard", ["$scope",  "$log", "apiResource","title", "$timeout", "$location","$stateParams","$state","$rootScope","currentUser","notifier","dashboard",function ($scope, $log,apiResource, title, $timeout,$location,$stateParams,$state,$rootScope,currentUser,notifier,dashboard)
{
	$scope.isLoading = true;
	$scope.title=title;
	$scope.totalJobPosts=dashboard.totalJobPosts;
	$scope.totalJobSeekers=dashboard.totalJobSeekers;

}]);
