shoppingApp.directive("searchbox", ['$location','filterService', function ($location,filter) {
    return {
        restrict: "E",
        templateUrl: "js/components/search-box/template.html",
        controller: function ($scope) {
            $scope.resetSearch = function () {
                $scope.searchKey = "";
            }
            $scope.updateSearch = function () {
                filter.setKey($scope.searchKey);
                $location.path("/product/Search");
                
            }
        }
    }
}]);