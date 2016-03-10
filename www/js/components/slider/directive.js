shoppingApp.directive("myslider", [function () {
    return {
        restrict: "E",
        templateUrl: "js/components/slider/template.html",
        scope: {
            data: '='
        },
        controller: function ($scope) {
            $scope.goPrev = function () {
                $('#slider-carousel').carousel('prev');
            }
            $scope.goNext = function () {
                $('#slider-carousel').carousel('next');
            }
        }
    }
}]);