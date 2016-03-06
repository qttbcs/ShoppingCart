shoppingApp.controller('HomeCtrl', ['$scope', 'storeService',
  function ($scope, store) {
      store.getAllCategories().then(function (data) {
          $scope.categories = data;
      }, function () {
          $scope.error = 'unable to get categories';
      });
      
      store.getProductsBySale().then(function (data) {
          $scope.productsBySale = data;
      }, function () {
          $scope.error = 'unable to get products by sale';
      });

  }]);