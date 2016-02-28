var shoppingCartControllers = angular.module('shoppingCartControllers', []);

shoppingCartControllers.controller('HomeCtrl', ['$scope', '$http',
  function ($scope, $http) {
      $http.get("http://localhost:35819/api/values").success(function (data) {
      $scope.phones = data;
    });

    $scope.orderProp = 'age';
  }]);

shoppingCartControllers.controller('ProductCtrl', ['$scope', '$http', '$routeParams',
  function ($scope, $http, $routeParams) {
      $scope.category = $routeParams.category;
      $scope.idProduct = $routeParams.idProduct;
      $http.get("http://localhost:35819/api/getCategory/" + $scope.category).success(function (data) {
          $scope.products = data;
      });
      $http.get("http://localhost:35819/api/getId/" + $scope.idProduct).success(function (data) {
          $scope.product = data;
      });

      $scope.orderProp = 'Id';
  }]);