"use strict";

angular.module("app").controller("appController", ["$scope", "userAccount", "apiResource", "currentUser", "$state", "$stateParams", "$rootScope", "notifier", MainCtrl]);

function MainCtrl($scope, userAccount, apiResource, currentUser, $state, $stateParams, $rootScope, notifier) {
    $scope.isLoggedIn = function () {
        return currentUser.getProfile().isLoggedIn;
    };

    $scope.view=function()
    {
        return currentUser.getProfile().view;
    }


    $scope.menuSateChangeSpinner = false;

    $scope.$on('menuSateChangeSpinner', function (evt, data) {
        if (data.stateStatus) {
            $scope.menuSateChangeSpinner = true
        } else {
            $scope.menuSateChangeSpinner = false
        }
    });
    $scope.notificationText = "";
    $scope.email = "";
    $scope.userData = {
        EMAIL: '',
        PASSWORD: '',
        NAME: '',
        TELEPHONE: '',
        confirmPassword: ''
    };
    $scope.message = '';

    $scope.clearMessage = function ($event) {
        $scope.message = '';
        if ($event.target.id == "register-form-link") {
            $("#register-form").delay(100).fadeIn(100);
            $("#login-form").fadeOut(100);
            $('#login-form-link').removeClass('active');
            $("#register-form-link").addClass('active');
            $event.preventDefault();
        } else {
            $("#login-form").delay(100).fadeIn(100);
            $("#register-form").fadeOut(100);
            $('#register-form-link').removeClass('active');
            $("#login-form-link").addClass('active');
            $event.preventDefault();
        }
    }



    $scope.$on('notification', function (evt, data) {
        $scope.notificationText = data.notification;
        $('#notificationModal').modal('show');

    });






    $scope.registerUser = function (form) {
        $scope.submitted = true;
        if (form) {
            if ($scope.userData.confirmPassword === $scope.userData.PASSWORD) {
                $scope.myPromise = userAccount.registration.registerUser({
                        EMAIL: $scope.userData.EMAIL,
                        PASSWORD: $scope.userData.PASSWORD,
                        VIEW: "Employer"
                    },
                    function (data) {
                        if (!data.error) {
                            if (currentUser.setProfile(data.view, data.apiKey)) {
                                $scope.myPromise = apiResource.addEmployer({
                                    telephone: $scope.userData.TELEPHONE,
                                    employer_name: $scope.userData.NAME
                                }, function (response) {
                                    $scope.login(true);
                                }, function (error) {
                                    $scope.notificationText = error.message;
                                    $('#notificationModal').modal('show');

                                });
                            }
                        }
                        $scope.submitted = false;
                        $scope.message = data.message;
                    },
                    function (response) {
                        //   $scope.isLoggedIn = false;
                        $scope.message = response.statusText + "\r\n";
                        if (response.message)
                            $scope.message += response.message;

                    })
            } else {
                $scope.message = "Your passwords don't seem to match. Just double check those";
            }
        }

    }

    $scope.login = function (form) {

        $scope.submitted = true;
        if (form) {
            $scope.userData.username = $scope.userData.EMAIL;
            $scope.myPromise = userAccount.login.loginUser({email:$scope.userData.EMAIL,password:$scope.userData.PASSWORD},
                function (data) {
                    if (!data.error) {
                        $scope.message = "";

                         currentUser.setProfile(data.view, data.apiKey);

                        window.location.reload();

                    }
                    $scope.message = data.message;

                },
                function (response) {
                    $scope.userData.PASSWORD = "";

                    $scope.message = response.statusText + "\r\n";
                    if (response.message) {
                        $scope.message += response.message;
                    }
                    if (response.data.error) {
                        $scope.message += response.data.error;
                    }
                })

        }



    }

    $scope.logout=function()
    {
        userAccount.logout.logout(function(response)
        {
            currentUser.removeProfile();
        },function(error)
        {

        })
        
    }




}