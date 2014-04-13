(function (angular) { 'use strict'

    angular.module('aeMenu', [])

        .directive('aeMenu', function () { return {
            restrict: 'A',
            template: ''+
                '<li ae-menu-item ng-repeat="item in items" ng-class="$class"></li>'+
            '',
            scope: {
                items: '=menuItems'
            },
            controller: function ($scope) {

            }
        }})

        .directive('aeMenuItem', function ($compile) { return {
            require: '^aeMenu',
            restrict: 'A',
            template: ''+
                '<label>{{item.title}}</label>'+
            '',
            link: function ($scope, $e, $a) {
                $scope.$class= {}
                if (!$scope.item.title) {
                    $scope.$class['ae-menu__item-separator']= true
                    $e.html('')
                }
                if ($scope.item.items) {
                    $scope.$class['ae-menu__item-container']= true
                    $e.append(
                        $compile('<menu class="ae-menu" ae-menu menu-items="item.items"></menu>')($scope)
                    )
                }
            }
        }})

    ;

})(angular)
