﻿//angularjs controller method
shoppingApp.controller('CartCtrl', ['$scope', 'cart',
    function ($scope, cart) {

    //show all products information
    try {
        $scope.items = cart.getProducts();
    }
    catch (err) {
        $scope.error = "Error when load list product!";
    }

    //Total price
    $scope.total = cart.total();
    $scope.$on('UpdateTotal', function () {
        $scope.total = cart.total();
    });
    


    //Delete Product
    function deleteItem(id) {
        try {
            cart.deleteProduct(id);         
        }
        catch (err) {
            $scope.error = "Error when delete product id: " + id + "!";
        }
    };
    $scope.delete = function () {
        var id = this.item.id;
        deleteItem(id);
        $scope.$emit('UpdateCart');
        $scope.$broadcast('UpdateTotal');
    };

    //Update Product stock
    function updateStock(id, num) {
        try {
            cart.updateStock(id, num);       
        }
        catch (err) {
            $scope.error = "Error when update product stock id: " + id + "!";
        }
    };
    $scope.addStock = function () {
        var id = this.item.id;
        updateStock(id, 1);
        $scope.$emit('UpdateCart');
        $scope.$broadcast('UpdateTotal');
    };
    $scope.subStock = function () {
        var id = this.item.id;
        if (this.item.count == 1)
            deleteItem(id);
        updateStock(id, -1);
        $scope.$emit('UpdateCart');
        $scope.$broadcast('UpdateTotal');
    };
}]);
