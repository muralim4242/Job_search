"use strict"

angular.module("common.services")
.factory("apiResource", ["$resource", "appSetting", "currentUser", apiResource]);

function apiResource($resource, appSetting, currentUser)
{
		return $resource(appSetting.serverPath + "login", null,
        {
			 'addEmployer':{method:'POST',url:appSetting.serverPath +"login/add_employer", headers: { 'Authorization': currentUser.getProfile().token }},
			 'addFranchiesies':{method:'POST',url:appSetting.serverPath +"login/add_Franchiesies"},
			 'getIndPost':{method:'GET',url:appSetting.serverPath +"login/getIndPost/:pId", headers: { 'Authorization': currentUser.getProfile().token }},
			 'getAllPost':{method:'GET',url:appSetting.serverPath +"login/getAllPost", headers: { 'Authorization': currentUser.getProfile().token }},
			  'getAllPostRelToEmp':{method:'GET',url:appSetting.serverPath +"login/getAllPostRelToEmp", headers: { 'Authorization': currentUser.getProfile().token }},
			  'postJob':{method:'POST',url:appSetting.serverPath +"login/job_post", headers: { 'Authorization': currentUser.getProfile().token }},
			  'UpdatePostJob':{method:'PUT',url:appSetting.serverPath +"login/job_post_update/:pId", headers: { 'Authorization': currentUser.getProfile().token }},
			  'updateEmployer':{method:'POST',url:appSetting.serverPath +"login/u	pdate_employer", headers: { 'Authorization': currentUser.getProfile().token }},
			  'getAllOrIndJobSeeker':{method:'GET',url:appSetting.serverPath +"login/getJobSeek/:jSId", headers: { 'Authorization': currentUser.getProfile().token }},
			  'addJobSeeker':{method:'POST',url:appSetting.serverPath +"login/job_seeker_post", headers: { 'Authorization': currentUser.getProfile().token }},
			  'updateJobSeeker':{method:'PUT',url:appSetting.serverPath +"login/job_seeker_post_update/2", headers: { 'Authorization': currentUser.getProfile().token }},
			  'dashboard':{method:'GET',url:appSetting.serverPath +"login/dashboard", headers: { 'Authorization': currentUser.getProfile().token }},
			  'contactUs':{method:'POST',url:appSetting.serverPath +"login/contact_us", headers: {'Authorization': currentUser.getProfile().token }},
			  'getAllPostDetailsForCandidates':{method:'GET',url:appSetting.serverPath +"login/get_All_Post_For_Candidates", headers: { } },
				"getJobSeekerCheckByMobNoNPostId":{method:'GET',url:appSetting.serverPath+"login/getJobSeekerCheckByMobNoNPostId/:mobNo/:postId"}
        });
}
