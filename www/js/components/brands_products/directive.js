shoppingApp.directive("brandsproducts",['storeService',function (store) {
    return {
        restrict: "E",
        templateUrl: "js/components/brands_products/template.html",
        controller: function ($scope) {
            $scope.stateBrands = false;
            $scope.setStateBrands = function()
            {
                $scope.stateBrands = !$scope.stateBrands;
            }

            store.getAllBrands().then(function (data) {
                $scope.brands = data;
            }, function () {
                $scope.error = 'unable to get brands';
            });
        }
    }
}]);