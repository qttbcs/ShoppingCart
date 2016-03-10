shoppingApp.controller('HomeCtrl', ['$scope', 'storeService','filterService',
  function ($scope, store, filter) {
      filter.resetFilter();
      store.getAllBrands().then(function (data) {
          $scope.brands = data;
      }, function () {
          $scope.error = 'unable to get brands';
      });

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