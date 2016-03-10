shoppingApp.directive("myfeaturesitems", ['cartService', function (cart) {
    cart.loadData();
    return {
        restrict: "E",
        templateUrl: "js/components/features_items/template.html",
        scope: {
            data: '=',
            title: '@'      
        },
        controller: function ($scope) {
            $scope.currentPage = 1;
            $scope.pageSize = 6;
            $scope.addItemToCart = function (item) {
                try {
                    cart.addProduct(item.Id, item.Name, item.Category, item.Price, item.Count, item.LinkImage);
                    $scope.$emit('UpdateCart');
                }
                catch (err) {
                    $scope.error = "Error when add new product! ";
                }
            };
        }
    }
}]);