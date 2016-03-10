shoppingApp.directive("currencyselector",['filterService', function (filter) {
    return {
        restrict: "E",
        templateUrl: "js/components/currency-selector/template.html",
        controller: function ($scope) {
            $scope.currencies = 
                [{ name: 'US Dollar', symbol: '$' , place: true},
                { name: 'Vietnam Dong', symbol: 'K VND', place: false }];
            $scope.currency = $scope.currencies[0];
            $scope.updateCurrency = function () {
                filter.setCurrency($scope.currency);
            }
            
        }
    }
}]);