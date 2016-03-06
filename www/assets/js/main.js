
'use strict';

var shoppingApp = angular.module('shoppingApp', ['ui.router', 'cart']);
shoppingApp.config(function ($stateProvider, $urlRouterProvider) {
    //$urlRouterProvider.otherwise('/home');
    $urlRouterProvider.when('', '/home');
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'js/pages/home/index.html'

        })
        .state('productCategory', {
            url: '/product/:category',
            templateUrl: 'js/pages/products/list.html',
            controller: 'ProductCtrl'

        })
        .state('productDetail', {
            url: '/product/:category/:idProduct',
            templateUrl: 'js/pages/products/detail.html',
            controller: 'ProductCtrl'

        })
        .state('shoppingCart', {
            url: '/cart',
            templateUrl: 'js/pages/shopping-cart/shopping-cart.html',
            controller: 'CartCtrl'

        })
})

shoppingApp.constant("REST_API", {
    "HOST": "http://localhost:35819/api/",
    "METHOD": {
        "VALUES": "values",
        "GET_CATEGORY": "getCategory/",
        "GET_ID": "getId/"
    }
})
angular.module("cart", [])
    .factory("cart", function () {
        var size = 0;
        var cartData = [];

        return {
            addProduct: function (id, name, price, count, linkImage) {
                if (angular.isUndefined(count)) count = 1;
                var addedToExistingItem = false;
                for (var i = 0; i < cartData.length; i++) {
                    if (cartData[i].id == id) {
                        cartData[i].count+=count;
                        addedToExistingItem = true;
                        break;
                    }
                }
                if (!addedToExistingItem) {
                    cartData.push({
                        id: id,
                        count: count,
                        name: name,
                        price: price,
                        linkImage: linkImage
                    });
                }
                size += count;
            },

            getProducts: function () {
                return cartData;
            },

            deleteProduct: function(id){
                for (var i = 0; i < cartData.length; i++) {
                    if (cartData[i].id == id) {
                        size -= cartData[i].count;
                        cartData.splice(i, 1);                      
                        break;
                    }
                }
            },

            updateStock: function(id, num){
                for (var i = 0; i < cartData.length; i++) {
                    if (cartData[i].id == id) {
                        cartData[i].count += num;
                        size += num;
                        break;
                    }
                }
            },

            count: function(){
                return size;
            },

            total: function () {
                var temp = 0;
                for (var i = 0; i < cartData.length; i++) {
                    temp += cartData[i].price * cartData[i].count;
                }
                return temp;
            }
        }
    });


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
shoppingApp.directive("myfooter", function () {
    return {
        restrict: "E",
        templateUrl: "js/components/footer/template.html"
    }
});
shoppingApp.directive("myheader", function () {
    return {
        restrict: "E",
        templateUrl: "js/components/header/template.html"
    }
});
shoppingApp.directive("myleftsidebar", function () {
    return {
        restrict: "E",
        templateUrl: "js/components/left-sidebar/template.html"
    }
});
shoppingApp.directive("mynavigation", function () {
    return {
        restrict: "E",
        templateUrl: "js/components/navigation/template.html"
    }
});
shoppingApp.directive("recommendeditems", function () {
    return {
        restrict: "E",
        templateUrl: "js/components/recommended-items/template.html",
        controller: function ($scope) {
            var item = [];
            $scope.itemActive = function () {
                for(var i=0; i<3; i++)
                {
                    //var value = function () {
                    //    value.linkImage = products[i].linkImage;
                    //    value.Price = products[i].Price;
                    //    value.Name = products[i].Name;
                    //}
                   
                }
            }
           
        }
    }
});
shoppingApp.controller('HomeCtrl', ['$scope', '$http',
  function ($scope, $http) {
      $http.get(REST_API.HOST + REST_API.METHOD.VALUES).success(function (data) {
      $scope.products = data;
      });
      $scope.orderProp = 'Id';

  }]);
shoppingApp.controller('ProductCtrl', ['REST_API', '$scope', '$http', '$stateParams', 'cart',
    function (REST_API, $scope, $http, $stateParams, cart) {
      $scope.category = $stateParams.category;
      $scope.idProduct = $stateParams.idProduct;

      $http.get(REST_API.HOST + REST_API.METHOD.GET_CATEGORY + $scope.category).success(function (data) {
          $scope.products = data;
      });
      $http.get(REST_API.HOST + REST_API.METHOD.GET_ID + $scope.idProduct).success(function (data) {
          $scope.product = data;
      });

      $scope.orderProp = 'Id';

      $scope.addItemToCart = function (item) {
          try {
              cart.addProduct(item.Id, item.Name, item.Price, item.Count, item.LinkImage);
              $scope.$emit('UpdateCart');
          }
          catch (err) {
              $scope.error = "Error when add new product! ";
          } 
      }
    }]);
//angularjs controller method
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
