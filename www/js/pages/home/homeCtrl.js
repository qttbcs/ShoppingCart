shoppingApp.controller('HomeCtrl', ['$scope', '$http',
  function ($scope, $http) {
      $http.get(REST_API.HOST + REST_API.METHOD.VALUES).success(function (data) {
      $scope.products = data;
      });
      $scope.orderProp = 'Id';

  }]);