shoppingApp.directive("recommendeditems", ['cartService', function (cart) {
    cart.loadData();
    return {
        restrict: "E",
        templateUrl: "js/components/recommended-items/template.html",
        scope: {
            type: '=',
            data: '=',
            title: '@'

        },
        controller: function ($scope) {
            $scope.isProduct = function () {
                if ($scope.type == "product") return true;
                return false;
            };
            $scope.isBrand = function () {
                if ($scope.type == "brand") return true;
                return false;
            };
            $scope.addItemToCart = function (item) {
                try {
                    cart.addProduct(item.Id, item.Name, item.Category, item.Price, item.Count, item.LinkImage);
                    $scope.$emit('UpdateCart');
                }
                catch (err) {
                    $scope.error = "Error when add new product! ";
                }
            };
            $scope.goPrev = function () {
                $('#recommended-item-carousel').carousel('prev');
            }
            $scope.goNext = function () {
                $('#recommended-item-carousel').carousel('next');
            }
        }
    }
}]);