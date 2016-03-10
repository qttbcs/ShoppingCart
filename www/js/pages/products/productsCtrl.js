shoppingApp.controller('ProductCtrl', ['$scope', '$stateParams', 'storeService', 'filterService',
    function ($scope, $stateParams, store, filter) {
        $scope.category = $stateParams.category;    
        $scope.idProduct = $stateParams.idProduct;
        $scope.products = [];

        if (!angular.isUndefined($scope.category)) {
            if ($scope.category == "Sale_products") {
                filter.resetFilter();
                store.getProductsBySale().then(function (data) {
                    angular.forEach(data, function (product) {
                        $scope.products.push(product);
                    })
                }, function () {
                    $scope.error = 'unable to get products by sale';
                });
            }
            else if ($scope.category == "Search") {
                store.getAllProducts().then(function (data) {
                    angular.forEach(data, function (product) {
                        $scope.products.push(product);
                    })
                }, function () {
                    $scope.error = 'unable to get products by sale';
                });
            }
            else {
                filter.resetFilter();
                store.getProductsByCategory($scope.category).then(function (data) {
                    angular.forEach(data, function (product) {
                        $scope.products.push(product);
                    })
                }, function () {
                    $scope.error = 'unable to get products by category';
                });

                store.getProductsByBrand($scope.category).then(function (data) {
                    angular.forEach(data, function (product) {                  
                        $scope.products.push(product);
                    })
                }, function () {
                    $scope.error = 'unable to get products by brand';
                });
            }     
        };

        if (!angular.isUndefined($scope.idProduct)) {
            store.getProductsById($scope.idProduct).then(function (data) {
                $scope.product = data;
            }, function () {
                $scope.error = 'unable to get product by id';
            });

        };

        
}]);