shoppingApp.directive("mycart", function (cart) {
    return {
        restrict: "E",
        templateUrl: "js/components/cart/template.html",
        controller: function ($scope) {
            $scope.itemCount = 0;
            $scope.$on('UpdateCart', function () {
                $scope.itemCount = cart.count();
            });
            
        }
    }
});