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