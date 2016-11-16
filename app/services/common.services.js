"use strict"

angular.module("common.services", ["ngResource","ngCookies"])
//,"ngStorage"])

.constant("appSetting",
{
	serverPath:"http://localhost:84/Job_search/api/v1/"
});
