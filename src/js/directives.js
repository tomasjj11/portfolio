portfolioApp.directive('ngPlaceholder', function () {
    return {
        restrict: 'A',
        scope: {
            placeholder: '=ngPlaceholder'
        },
        link: function (scope, elem, attr) {
            scope.$watch('placeholder', function () {
                elem[0].placeholder = scope.placeholder;
            });
        }
    }
})
.directive('phone', function () {
    return {
        restrict: 'E',
        template: '<a href="tel:07595314095">07595314095</a>',
        replace: true
    }
})
.directive('email', function () {
    return {
        restrict: 'E',
        template: '<a href="mailto:info@thomas.jordan.io">info@thomasjordan.io</a>',
        replace: true
    }
})