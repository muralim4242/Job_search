"use strict"

angular.module("common.services", ["ngResource","ngCookies"])
//,"ngStorage"])

.constant("appSetting",
{
	// serverPath:"https://www.dine-club.co.uk/restauranteur/"
	//serverPath:"http://www.dinesavvy.co.uk/restauranteur/"
	// serverPath:"http://127.0.0.1:8080/dinesavvy/restauranteur/"
	serverPath:"http://localhost:81/dinesavvy/restauranteur/"
});
