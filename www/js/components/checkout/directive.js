shoppingApp.directive("mycheckout", function () {
    return {
        restrict: "E",
        templateUrl: "js/components/checkout/template.html",
        controller: function ($scope) {
            $scope.setOrder = function () {
                $('#my-notice').modal('toggle')
            };
        }
    }
});