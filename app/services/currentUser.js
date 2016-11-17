
"use strict";

angular.
module("common.services").
factory("currentUser", ["$cookieStore", currentUser]);

function currentUser($cookieStore) {
  var profile = [];
  if (!$cookieStore.get("token")) {
    $cookieStore.put("token", "");
  }
  if (!$cookieStore.get("isLoggedIn")) {
    $cookieStore.put("isLoggedIn", false);
  }
  if (!$cookieStore.get("view")) {
    $cookieStore.put("view", "");
  }



  var setProfile = function(view,  token) {
    //profile.view = view;
    $cookieStore.put("view", view);
    //profile.token = token;
    $cookieStore.put("token", token);
    //profile.isLoggedIn = true;
    $cookieStore.put("isLoggedIn", true);
    // $cookieStore.put("logo", logo);
    return true;
  }

  var getProfile = function() {
    profile.view = $cookieStore.get("view");
    profile.token = $cookieStore.get("token");
    profile.isLoggedIn = $cookieStore.get("isLoggedIn");
    // profile.logo = $cookieStore.get("logo");

    return profile;
  }

  var removeProfile = function() {
    profile.isLoggedIn = $cookieStore.remove("isLoggedIn");
    profile.view = $cookieStore.remove("view");
    profile.token = $cookieStore.remove("token");
    // profile.logo = $cookieStore.remove("logo");
    window.location.reload();
  }

  // var changeLogo=function(logo)
  // {
  //   $cookieStore.put("logo", logo);
  // }

  return {
    setProfile: setProfile,
    getProfile: getProfile,
    removeProfile: removeProfile
    // ,
    // changeLogo:changeLogo
  }
}
