"use strict"

angular.module("common.services")
.factory("dealResource", ["$resource", "appSetting", "currentUser", dealResource]);

function dealResource($resource, appSetting, currentUser) {
		return $resource(appSetting.serverPath + "Api/v1/deal/deal/:isActive/:dealTitle/:id/:start/:orderKey/:orderDirection/:searchKey/", null,
        {
			'query': { headers: { 'Authorization': currentUser.getProfile().token } },
            'get': { headers: { 'Authorization': currentUser.getProfile().token } },
			'findAutoCompleteString': {method:'GET',url: appSetting.serverPath + "Api/v1/deal/dealFind/:searchKey/:searchValue",isArray:true, headers: { 'Authorization': currentUser.getProfile().token }},
            'save': {method:'POST', headers: { 'Authorization': currentUser.getProfile().token } },
            'update': { method: 'PUT', headers: { 'Authorization': currentUser.getProfile().token } },
			 'delete': { method: 'DELETE', headers: { 'Authorization': currentUser.getProfile().token } },
			 'getUserProfile':{method:'GET',url:"Api/v1/login/viewProfile", headers: { 'Authorization': currentUser.getProfile().token }},
			  'updateUserProfile':{method:'PUT',url:"Api/v1/login/editProfile", headers: { 'Authorization': currentUser.getProfile().token }},
			 'getLocation':{method:'GET',url:"https://api.getaddress.io/v2/uk/:postalCode?api-key=KyY_BauOpUqE0YikihLQvg1917"}
        });
}
