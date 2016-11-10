"use strict";

angular.module('app').directive('wwaDashboard', [function () {
    return {
        scope: {

        },
        template: '<ps-dashboard></ps-dashbord>',
        link: function (scope) {
            scope.title = 'My First Dashboard';
            scope.gridsterOpts =
                {
                    columns: 12,
                    margins: [20, 20],
                    outerMargin: false,
                    pushing: true,
                    floating: true,
                    swapping:false
                    };

            scope.widgets = [
                {
                    title:"Fisrt",
                    sizeX: 3,
                    sizeY: 3,
                    row: 0,
                    col: 0,
                    template:'<wwa-temperature></wwa-temperature>',
                    widgetSettings:
                    {
                        id:1000
                    }
                }
                //,
                //{
                //    title: "Second",
                //    sizeX: 2,
                //    sizeY: 2,
                //    row: 0,
                //    col: 0,
                //    template: "<wwa-temperature></wwa-temperature>",
                //    widgetSettings:
                //    {
                //        id: 1000
                //    }



                //}

            ];
        }
    };
}]);