"use strict"

angular.module("common.services")
.factory("apiResource", ["$resource", "appSetting", "currentUser", apiResource]);

function apiResource($resource, appSetting, currentUser) {
		return $resource(appSetting.serverPath + "login", null,
        {
			 'addEmployer':{method:'POST',url:"login/add_employer", headers: { 'Authorization': currentUser.getProfile().token }},
			 'getIndPost':{method:'GET',url:"login/getIndPost/:pId", headers: { 'Authorization': currentUser.getProfile().token }},
			  'postJob':{method:'POST',url:"login/job_post", headers: { 'Authorization': currentUser.getProfile().token }},
			  'UpdatePostJob':{method:'PUT',url:"login/job_post_update/:pId", headers: { 'Authorization': currentUser.getProfile().token }},
			  'updateEmployer':{method:'POST',url:"login/update_employer", headers: { 'Authorization': currentUser.getProfile().token }},
			  'getAllOrIndJobSeeker':{method:'GET',url:"login/getJobSeek/:jSId", headers: { 'Authorization': currentUser.getProfile().token }},
			  'addJobSeeker':{method:'POST',url:"login/job_seeker_post", headers: { 'Authorization': currentUser.getProfile().token }},
			  'updateJobSeeker':{method:'PUT',url:"job_seeker_post_update/2", headers: { 'Authorization': currentUser.getProfile().token }}

        });
}
