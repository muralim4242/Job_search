
"use strict";

angular.
module("common.services").
factory("userAccount", ["$resource", "appSetting", "currentUser", userAccount]);

function userAccount($resource, $appSetting, currentUser) {
  return {
    registration: $resource($appSetting.serverPath + "Api/v1/login/register", null, {
      'registerUser': {
        method: 'POST'
      }
    }),
    login: $resource($appSetting.serverPath + "Api/v1/login/login", null, {
      'loginUser': {
        method: 'POST'
          /* ,
                            headers: { 'content-type': 'application/x-www-form-urlencoded' },
                            transformRequest:function(data,headersGetter)
                            {
                                var str = [];
                                for(var d in data)
                                {
                                    str.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
                                }
                                return str.join("&");
                            } */
      }
    }),
    logout: $resource($appSetting.serverPath + "Api/v1/login/logout", null, {
      'logout': {
        method: 'GET',
        headers: {
          'Authorization': currentUser.getProfile().token
        }
      }
    }),
    changePassword: $resource($appSetting.serverPath + "Api/v1/login/changePassword", null, {
      'changePassword': {
        method: 'GET',
        headers: {
          'Authorization': currentUser.getProfile().token
        }
      }
    }),
    changePasswordFromLogin: $resource($appSetting.serverPath + "Api/v1/login/changePasswordFromLogin/:email", null, {
      'changePassword': {
        method: 'GET'
      }
    }),
    feedback: $resource($appSetting.serverPath + "Api/v1/login/feedback/", null, {
      'feedback': {
        method: 'POST',
        headers: {
          'Authorization': currentUser.getProfile().token
        }
      }
    })

  }
}
