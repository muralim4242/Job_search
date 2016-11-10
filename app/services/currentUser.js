
"use strict";

angular.
module("common.services").
factory("currentUser", ["$cookieStore", currentUser]);

function currentUser($cookieStore) {
  var profile = [];
  //    {
  //    isLoggedIn: false,
  //    username: "",
  //    token:""
  //}

  //$cookieStore.put("username", profile.username);
  //$cookieStore.put("token", profile.token);
  //$cookieStore.put("isLoggedIn", profile.isLoggedIn);
  if (!$cookieStore.get("username")) {
    $cookieStore.put("username", "");
  }
  if (!$cookieStore.get("token")) {
    $cookieStore.put("token", "");
  }
  if (!$cookieStore.get("isLoggedIn")) {
    $cookieStore.put("isLoggedIn", false);
  }

  // if (!$cookieStore.get("logo")) {
  //   $cookieStore.put("logo", null);
  // }



  var setProfile = function(username,  token) {
    //profile.username = username;
    $cookieStore.put("username", username);
    //profile.token = token;
    $cookieStore.put("token", token);
    //profile.isLoggedIn = true;
    $cookieStore.put("isLoggedIn", true);
    // $cookieStore.put("logo", logo);
  }

  var getProfile = function() {
    profile.username = $cookieStore.get("username");
    profile.token = $cookieStore.get("token");
    profile.isLoggedIn = $cookieStore.get("isLoggedIn");
    // profile.logo = $cookieStore.get("logo");

    return profile;
  }

  var removeProfile = function() {
    profile.isLoggedIn = $cookieStore.remove("isLoggedIn");
    profile.username = $cookieStore.remove("username");
    profile.token = $cookieStore.remove("token");
    // profile.logo = $cookieStore.remove("logo");
    window.location.reload();
  }

  var changeLogo=function(logo)
  {
    $cookieStore.put("logo", logo);
  }

  return {
    setProfile: setProfile,
    getProfile: getProfile,
    removeProfile: removeProfile,
    changeLogo:changeLogo
  }
}
