
"use strict";

angular.module("app").controller("appController", ["$scope", "userAccount", "dealResource", "currentUser", "$state", "$stateParams", "$rootScope", "notifier", MainCtrl]);

function MainCtrl($scope, userAccount, dealResource, currentUser, $state, $stateParams, $rootScope, notifier) {
    $scope.isLoggedIn = function() {
        return currentUser.getProfile().isLoggedIn;
    };

    $scope.menuSateChangeSpinner = false;

    $scope.$on('menuSateChangeSpinner', function(evt, data) {
        if (data.stateStatus) {
            $scope.menuSateChangeSpinner = true
        } else {
            $scope.menuSateChangeSpinner = false
        }
    });
    $scope.notificationText = "";
    $scope.email = "";
    $scope.userData = {
        contactName: '',
        restaurantName: '',
        isChain: 'false',
        email: '',
        telephone: '',
        username: '',
        password: '',
        confirmPassword: '',
        isAgreeWithTerms: 'false',
        userType: 'restauranteur'
    };
    //	$scope.deals=[{"dealTitle":"asdsd"},{"dealTitle":"asdsdas"},{"dealTitle":"asdsgfdgd"}];
    $scope.message = '';
    initialLoad();

    $scope.clearMessage = function() {
        $scope.message = '';
    }

    $scope.reset = function(valid) {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (_.size($scope.email) > 0 && re.test($scope.email)) {
            $scope.myPromise = userAccount.changePasswordFromLogin.changePassword({
                email: $scope.email
            }, function(response) {
                notifier.success(response.message);
                // $scope.notificationText = response.message;
                $('#myModal').modal('hide');

            }, function(response) {
                notifier.error("Oops! We're having a problem, please try again");
                $('#myModal').modal('hide');

            })
        } else {
            notifier.error("Something doesn't seem right with your email address");
        }
    }

    $scope.$on('ps-menu-item-update', function(evt, data) {
        initialLoad();
    });

    $scope.$on('notification', function(evt, data) {
        $scope.notificationText = data.notification;
        $('#notificationModal').modal('show');

    });

    function initialLoad() {
        if ($scope.isLoggedIn()) {

            dealResource.get({
                isActive: true
            }, function(response) {
                $scope.activeDeals = [];
                var key = [];
                for (var i = 0; i < response.deals.length; i++) {
                    if (angular.isUndefined(key[response.deals[i]["dealTitle"]])) {
                        key[response.deals[i]["dealTitle"]] = true;
                        $scope.activeDeals.push(response.deals[i]);
                    }
                }
                //$scope.activeDeals=response.deals;


                /* for(var i=0;i<$scope.activeDeals.length;i++)
                {
                	sum+=$scope.activeDeals[i].claims;
                }
                $scope.totalCliams=sum; */
            }, function(response) {
                $scope.activeDeals = [];
            });

            dealResource.get({
                isActive: false
            }, function(response) {
                $scope.inactiveDeals = [];
                var key = [];
                for (var i = 0; i < response.deals.length; i++) {
                    if (angular.isUndefined(key[response.deals[i]["dealTitle"]])) {
                        key[response.deals[i]["dealTitle"]] = true;
                        $scope.inactiveDeals.push(response.deals[i]);
                    }
                }
            }, function(response) {
                $scope.inactiveDeals = [];
            });

        }


    }



    $scope.login = function(form) {
        //     $scope.userData.grant_type = "password";
        //     $scope.userData.username = $scope.userData.email;
        currentUser.setProfile("muralili","123");
        $scope.submitted = true;
        // if (form) {
        //     $scope.userData.username = $scope.userData.email;
        //     $scope.myPromise = userAccount.login.loginUser($scope.userData,
        //             function(data) {
        //                 if (!data.error) {
        //                     //    $scope.isLoggedIn = true;
        //                     $scope.message = "";
        //                     //   $scope.userData.password = "";
        //                     // $scope.token = data.access_token;
        //                     $scope.username = data.username;
        //                     //		$scope.activeDeals=data.activeDeals;
        //                     //		$scope.inactiveDeals=data.inactiveDeals;
        //                     currentUser.setProfile(data.username, data.logo, data.apiKey);
        //
        //                     window.location.reload();
        //                     /* $rootScope.$broadcast('dashboard-update',
        //                           {
        //
        //                           }); */
        //                     // $state.go("dashboard");
        //                 }
        //                 $scope.message = data.message;
        //                 /* initialLoad();
        //                 $scope.submitted=false;
        //                 $scope.message=data.message; */
        //                 //	 $scope.userData.email="";
        //                 //   $scope.userData.password = "";
        //                 //	loadMenu();
        //
        //                 //	$state.reload();
        //             },
        //             function(response) {
        //                 $scope.userData.password = "";
        //                 //  $scope.isLoggedIn = false;
        //                 $scope.message = response.statusText + "\r\n";
        //                 if (response.data.exceptionMessage) {
        //                     $scope.message += response.data.exceptionMessage;
        //                 }
        //                 if (response.data.error) {
        //                     $scope.message += response.data.error;
        //                 }
        //             })
        //         //	$state.go("mypage.dashboard");
        // }



    }





}
