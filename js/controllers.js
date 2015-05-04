var portfolio = angular.module('portfolio', []);

portfolio.controller('GlobalController', function ($scope) {

    $scope.test = 'test';
    console.log($scope.test);

});

portfolio.controller('NavigationController', function ($scope) {

});