"use strict";
angular.module("app").controller("jobSeekersPosts",
["$scope",  "$log", "apiResource","posts","title", "$timeout", "$location","$stateParams","$state","$rootScope",
function ($scope, $log,apiResource, posts,title, $timeout,$location,$stateParams,$state,$rootScope)
{
//	$scope.isLoading = true;
 $scope.rowCollection = posts.jobSeekers;
  $scope.title = title;
 // $scope.dealTitle=$stateParams.dealTitle
  $scope.headerCollection = [{
      'name': 'ID',
      'displayName': 'SL.No'
    },
	{
      'name': 'FULL_NAME',
      'displayName': 'Name'
    },
    {
        'name': 'EMAIL',
        'displayName': 'Email'
      },
			 {
        'name': 'TELEPHONE',
        'displayName': 'Contact'
      }
			,
			 {
        'name': 'CURRENT_LOCATION',
        'displayName': 'Location'
      },
			 {
        'name': 'KEY_SKILLS',
        'displayName': 'Key Skills'
      }
			,
			 {
        'name': 'TOTAL_EXP',
        'displayName': 'Experience'
      }
      ,
			 {
        'name': 'CURRENT_DESIGNATION',
        'displayName': 'Present Designation'
      }
				,
			 {
        'name': 'CURRENT_EMPLOYER',
        'displayName': 'Present Employer'
      }
			,
			 {
        'name': 'CURRENT_SALARY',
        'displayName': 'Present Salaty'
      }
      	,
			 {
        'name': 'HIGH_QUALIFICATION',
        'displayName': 'Qualification'
      }
      // ,
			//  {
      //   'name': 'INSTITION',
      //   'displayName': 'Institution'
      // }
        ,
			 {
        'name': 'RESUME_TITLE',
        'displayName': 'RESUME TITLE'
      }

  ];

  $scope.export=function()
  {
    var blob = new Blob([document.getElementById('exportable').innerHTML], {
         type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
     });
     saveAs(blob, "Report.xls");
    // if(posts.jobSeekers == '')
    //         return;
    //
    //     JSONToCSVConvertor(posts.jobSeekers, "Franchiesies Report", true);
  }

//   function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
//     //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
//     var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
//
//     var CSV = '';
//     //Set Report title in first row or line
//
//     CSV += ReportTitle + '\r\n\n';
//
//     //This condition will generate the Label/Header
//     if (ShowLabel) {
//         var row = "";
//
//         //This loop will extract the label from 1st index of on array
//         for (var index in arrData[0]) {
//
//             //Now convert each value to string and comma-seprated
//             row += index + ',';
//         }
//
//         row = row.slice(0, -1);
//
//         //append Label row with line break
//         CSV += row + '\r\n';
//     }
//
//     //1st loop is to extract each row
//     for (var i = 0; i < arrData.length; i++) {
//         var row = "";
//
//         //2nd loop will extract each column and convert it in string comma-seprated
//         for (var index in arrData[i]) {
//             row += '"' + arrData[i][index] + '",';
//         }
//
//         row.slice(0, row.length - 1);
//
//         //add a line break after each row
//         CSV += row + '\r\n';
//     }
//
//     if (CSV == '') {
//         alert("Invalid data");
//         return;
//     }
//
//     //Generate a file name
//     var fileName = "MyReport_";
//     //this will remove the blank-spaces from the title and replace it with an underscore
//     fileName += ReportTitle.replace(/ /g,"_");
//
//     //Initialize file format you want csv or xls
//     var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
//
//     // Now the little tricky part.
//     // you can use either>> window.open(uri);
//     // but this will not work in some browsers
//     // or you will not get the correct file extension
//
//     //this trick will generate a temp <a /> tag
//     var link = document.createElement("a");
//     link.href = uri;
//
//     //set the visibility hidden so it will not effect on your web-layout
//     link.style = "visibility:hidden";
//     link.download = fileName + ".csv";
//
//     //this part will append the anchor tag and remove it after automatic click
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
// }




}]);
