
"use strict";

angular.
module("common.services").
factory("userAccount", ["$resource", "appSetting", "currentUser", userAccount]);

function userAccount($resource, $appSetting, currentUser) {
  return {
    registration: $resource($appSetting.serverPath + "login/register", null, {
      'registerUser': {
        method: 'POST'
      }
    }),
    login: $resource($appSetting.serverPath + "login/login", null, {
      'loginUser': {
        method: 'POST'
      }
    }),
    logout: $resource($appSetting.serverPath + "login/logout", null, {
      'logout': {
        method: 'GET',
        headers: {
          'Authorization': currentUser.getProfile().token
        }
      }
    }),
    changePassword: $resource($appSetting.serverPath + "login/changePassword", null, {
      'changePassword': {
        method: 'GET',
        headers: {
          'Authorization': currentUser.getProfile().token
        }
      }
    }),
    changePasswordFromLogin: $resource($appSetting.serverPath + "login/changePasswordFromLogin/:email", null, {
      'changePassword': {
        method: 'GET'
      }
    }),
    feedback: $resource($appSetting.serverPath + "login/feedback/", null, {
      'feedback': {
        method: 'POST',
        headers: {
          'Authorization': currentUser.getProfile().token
        }
      }
    })

  }
}
