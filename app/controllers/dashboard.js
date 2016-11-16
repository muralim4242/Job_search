"use strict";
angular.module("app").controller("dashboard", ["$scope",  "$log", "apiResource","title", "$timeout", "$location","$stateParams","$state","$rootScope","currentUser","notifier",function ($scope, $log,apiResource, title, $timeout,$location,$stateParams,$state,$rootScope,currentUser,notifier)
{
	initialLoad();
	$scope.isLoading = true;
	function initialLoad()
	{
		$scope.isLoading = true;
		$scope.isLoggedIn = function () {
        return currentUser.getProfile().isLoggedIn;
    };
	if($scope.isLoggedIn())
	{
		if(!currentUser.getProfile().logo)
		{
			$scope.logoUndefined=true;
			// notifier.error("Hold Up! Before you can begin, you'll need to complete your profile");
		}
		else {
			$scope.logoUndefined=false;
		}
		$scope.myPromise=apiResource.get({isActive:true},function(response)
		{
			var key = [];
			$scope.rowCollection=[];
			for(var i=0;i<response.deals.length;i++)
			{
				if(angular.isUndefined(key[response.deals[i]["dealTitle"]]))
				{
					key[response.deals[i]["dealTitle"]] = true;
					$scope.rowCollection.push(response.deals[i]);
				}
			}
			//$scope.rowCollection = response.deals;
			$scope.title = title;
			var sum=0;
			for(var i=0;i<$scope.rowCollection.length;i++)
			{
				sum+=$scope.rowCollection[i].claims;
			}
			$scope.totalCliams=sum;
			$scope.isLoading = false;
		},function(response)
	{
			$scope.isLoading = false;
	});
	}
	}

	$scope.$on('dashboard-update', function (evt, data) {
                initialLoad();
            });



}]);
