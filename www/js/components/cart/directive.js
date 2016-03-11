shoppingApp.directive("mycart", ['cartService', function (cart) {
    cart.loadData();
    return {
        restrict: "E",
        templateUrl: "js/components/cart/template.html",
        controller: function ($scope) {
            $scope.itemCount = cart.totalCount();
            $scope.$on('UpdateCart', function () {
                $scope.itemCount = cart.totalCount();
            });
            
        }
    }
}]);