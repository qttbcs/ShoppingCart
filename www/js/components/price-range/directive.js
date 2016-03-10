shoppingApp.directive("pricerange", ['filterService',function (filter) {
    return {
        restrict: "E",
        templateUrl: "js/components/price-range/template.html",
        controller: function ($scope) {
            $scope.data = {
                min: function (newValue) {                
                    return arguments.length ? (filter.setMinPrice(newValue)) : filter.getMinPrice();
                },
                max: function (newValue) {                
                    return arguments.length ? (filter.setMaxPrice(newValue)) : filter.getMaxPrice();
                }
            };
        }
    }
}]);