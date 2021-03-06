"use strict";
angular.module("app").controller("franchiesiesPostAdd", ["$scope", "$log", "apiResource", "currentUser", "$timeout", "$location", "posts", "title", "$state", "$rootScope", "notifier",
    function($scope, $log, apiResource, currentUser, $timeout, $location, posts, title, $state, $rootScope, franchiesiesPostAdd, notifier) {

        //  console.log(posts.jobPosts);
        $scope.isLoggedIn = function() {
            return currentUser.getProfile().isLoggedIn;
        };

        $scope.view = function() {
            return currentUser.getProfile().view;
        }

        $scope.IfDirectUpload = true;
        $scope.isLoading = true;
        $scope.posts = posts.jobPosts;
        $scope.postIdSelected = undefined;
        $scope.postData = {};
        $scope.postData["file"] = "";
        $scope.postData["fileExtention"] = "";
        $scope.disabled = true;
        // $scope.postData = franchiesiesPostAdd.user;
        // $scope.postData.isChain = franchiesiesPostAdd.user.isChain ? "true" : "false";
        $scope.title = title;
        $scope.resume = '';
        // $scope.myImage = '';
        // $scope.myCroppedImage = '';
        $scope.handleFileSelect = function(evt) {
            var file = evt.currentTarget.files[0];
            var reader = new FileReader();
            reader.onload = function(evt) {
                $scope.$apply(function($scope) {
                    $scope.resume = evt.target.result;
                });
            };
            reader.readAsDataURL(file);
        };

        // $scope.clear = function() {
        //   $scope.imageCropStep = 1;
        //   delete $scope.imgSrc;
        //   delete $scope.result;
        //   delete $scope.resultBlob;
        // };

        //Get all Posts
        $scope.post_selected = function(id) {
            $scope.postIdSelected = id;
        }

        $scope.back = function() {
            $scope.postIdSelected = undefined;
            $scope.postData = {};
            $scope.disabled = true;
        }

        $scope.enable = true;
        $scope.postData.isProfilePresent = false;

        $scope.is_userAvailable = function() {

            var mobNo = $scope.postData.TELEPHONE;
            $scope.myPromise = apiResource.getJobSeekerCheckByMobNoNPostId({
                mobNo: $scope.postData.TELEPHONE,
                postId: $scope.postIdSelected
            }, function(response) {
                if (response.error) {
                    $scope.disabled = false;
                    $scope.postData = {};
                    $scope.postData.TELEPHONE = mobNo;
                    $scope.enable = false;
                    $scope.postData.directUpload=true;
                    // $scope.directupload=true;
                    $scope.postData.isProfilePresent = false;
                } else {
                    if (response.isSeekerAppliedForPost) {

                        // alert("Already applied for job");
                        $scope.postIdSelected = undefined;
                        $scope.postData = {};
                        $scope.disabled = true;
                        $rootScope.$broadcast('notification', {
                            notification: "Already applied for job"
                        });

                        $state.go("user.franchiesies.franchiesies-posts");
                        //

                    } else {
                        $scope.postData = response.jobSeeker;
                        $scope.postData.isProfilePresent = true;
                        $rootScope.$broadcast('notification', {
                            notification: "Already Exited User"
                        });
                        $state.go("user.franchiesies.franchiesies-posts");
                        // $scope.disabled = true;
                        // $scope.enable = false;
                    }


                }

            })
        }




        $scope.submitForm = function(valid) {


            $scope.isLoading = true;
            // Set the 'submitted' flag to true

            $scope.submitted = true;



            if (true)

            {
                // $scope.postData.START_DATE=new Date($scope.postData.START_DATE);
                //  $scope.postData.END_DATE=new Date($scope.postData.END_DATE);

                $scope.postData.file = $scope.resume;
                if ($scope.resume) {
                    $scope.postData.fileExtention = $scope.resume.split("/", 2)[1].split(";", 1)[0];
                    $scope.postData.file = $scope.resume;
                } else {
                    $scope.postData.fileExtention = null;
                    $scope.postData.file = null;
                }

                var FID = function() {
                    return currentUser.getProfile().token ? currentUser.getProfile().token : 0;
                };
                $scope.postData.FID = FID();
                $scope.postData.PID = $scope.postIdSelected?$scope.postIdSelected:null;
                //if it is direct upload
                // $location.absUrl().search("uploadresume") != -1 ? $scope.postData.directUpload = true : $scope.postData.directUpload = false;

                $scope.myPromise = apiResource.addJobSeeker($scope.postData, function(respose) {
                    $rootScope.$broadcast('notification', {
                        notification: respose.message
                    });
                    $scope.isLoading = false;
                    $scope.disabled = false;
                    $scope.postData = {};
                    // $scope.postData.TELEPHONE = mobNo;
                    $scope.enable = false;
                    $scope.postData.isProfilePresent = false;
                    // $state.go("user.franchiesies.franchiesies-posts");

                    //      $state.go("user.employer-posts");
                }, function(error) {
                    $rootScope.$broadcast('notification', {
                        notification: "Yikes! Something has gone wrong here, please try again"
                    });
                    $scope.isLoading = false;
                    $scope.postIdSelected = undefined;
                })

              
            } else {

                $rootScope.$broadcast('notification', {
                    notification: "Oops! Don't forget to complete your franchiesiesPostAdd"
                });
                $scope.submitted = false;
                $scope.isLoading = false;
            }


        };

    }
]);
