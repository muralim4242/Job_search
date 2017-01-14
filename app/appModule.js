 /// <reference path="commonTempates/profileSettingDropDown.html" />
/// <reference path="commonTempates/profileSettingDropDown.html" />
"use strict";

angular.module("app", ["ui.router", "psFramework", "ngStorage", "common.services", "smart-table", "ngAnimate", "angucomplete-alt", "ngImgCrop", "cgBusy"])

.directive('stringToNumber', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      ngModel.$parsers.push(function(value) {
        return '' + value;
      });
      ngModel.$formatters.push(function(value) {
        return parseFloat(value);
      });
    }
  };
})

.directive('stringToDate', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      // ngModel.$parsers.push(function(value) {
      //   return '' + value;
      // });
      ngModel.$formatters.push(function(value) {
        return new Date(value);
      });
    }
  };
})


.directive('stPersist', function() {
  return {
    require: '^stTable',
    link: function(scope, element, attr, ctrl) {
      var nameSpace = attr.stPersist;

      //save the table state every time it changes
      scope.$watch(function() {
        return ctrl.tableState();
      }, function(newValue, oldValue) {
        if (newValue !== oldValue) {
          localStorage.setItem(nameSpace, JSON.stringify(newValue));
        }
      }, true);

      //fetch the table state when the directive is loaded
      if (localStorage.getItem(nameSpace)) {
        var savedState = JSON.parse(localStorage.getItem(nameSpace));
        var tableState = ctrl.tableState();

        angular.extend(tableState, savedState);
        ctrl.pipe();

      }

    }
  };
})



.directive('stRatio', function() {
  return {
    link: function(scope, element, attr) {
      var ratio = +(attr.stRatio);

      element.css('width', ratio + '%');

    }
  };
})

.directive('profileSettingDropDown', function() {
  return {
    templateUrl: "app/commonTempates/profileSettingDropDown.html",
    controller: function($scope) {
      //         $scope.items = [
      //'The first choice!',
      //'And another choice for you.',
      //'but wait! A third!'
      //         ];

      $scope.status = {
        isopen: false
      };

      $scope.toggled = function(open) {
        $log.log('Dropdown is now: ', open);
      };

      $scope.toggleDropdown = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopen = !$scope.status.isopen;
      };
    }
  }
})


.filter('nospace', function() {
  return function(value) {
    return (!value[0]) ? '' : value[0].replace(/["?'()]/g, "");
  };
})

.filter('filterNumber', function() {
  return function(value) {
    return value.replace(/\d+/g, '').toUpperCase();
  };
})


.directive('customOnChange', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var onChangeHandler = scope.$eval(attrs.customOnChange);
      element.bind('change', onChangeHandler);
    }
  };
});
