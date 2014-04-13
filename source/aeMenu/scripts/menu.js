(function (angular) { 'use strict'

    angular.module('aeMenu', [])

        .value('aeMenuConfig', {
            classes: {
                menu: 'ae-menu',
                menuItem: undefined,
                menuItemLink: undefined,
                menuItemContainer: 'ae-menu__item-container',
                menuItemSeparator: 'ae-menu__item-separator',
            }
        })

        .directive('aeMenu', function (aeMenuConfig) { return {
            restrict: 'A',
            template: ''+
                '<li ae-menu-item ng-repeat="item in items"></li>'+
            '',
            scope: {
                items: '=menuItems',
                config: '=?menuConfig'
            },
            controller: function ($scope) {
            },
            link: function ($scope, $e, $a) {
                $scope.$config= angular.extend({}, aeMenuConfig, $scope.config || {})
                if ($scope.config) {
                    if ($scope.config.classes) {
                        $scope.$config.classes= angular.extend({}, aeMenuConfig.classes, $scope.config.classes || {} )
                    }
                }
                if ($scope.$config.classes.menu) {
                    $a.$addClass($scope.$config.classes.menu)
                }
                $scope.$config.classes.menu= [$scope.$config.classes.menu, $a.class].join(' ')
            }
        }})

        .directive('aeMenuItem', function ($compile) { return {
            require: '^aeMenu',
            restrict: 'A',
            link: function ($scope, $e, $a) {
                $scope.$watchCollection('item', function (item) {
                    $e.html('').attr('class', $scope.$config.classes.menuItem)
                    if (!$scope.item.title) {
                        $a.$addClass($scope.$config.classes.menuItemSeparator)
                    } else {
                        $e.append(
                            $compile('<label>{{item.title}}</label>')($scope).addClass(
                                $scope.$config.classes.menuItemLink
                            )
                        )
                        if ($scope.item.items) {
                            $a.$addClass($scope.$config.classes.menuItemContainer)
                            $e.append(
                                $compile('<menu ae-menu menu-items="item.items" menu-config="$config"></menu>')($scope)
                            )
                        }
                    }
                })
            }
        }})

    ;

})(angular)
