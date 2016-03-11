shoppingApp.directive("mycheckout",['storeService', function (store) {
    return {
        restrict: "E",
        templateUrl: "js/components/checkout/template.html",
        scope: {
            data: '=',
            itemCount: '=',
            whenSelect: '&'
        },
        controller: function ($scope) {
            var isOrderValid = function(){
                if($scope.newOrder.StreetAddress!=null && $scope.newOrder.City!=null
                    && $scope.newOrder.Zipcode!=null && $scope.newOrder.Email!=null
                    && $scope.newOrder.FirstName!=null && $scope.newOrder.LastName!=null
                    && $scope.newOrder.CardNumber!=null && $scope.newOrder.Expiry!=null
                    && $scope.newOrder.CCV !=null) return true;
                return false;
            };
            $scope.setOrder = function () {
                if (isOrderValid())
                {
                    $scope.newOrder.Products = angular.toJson($scope.data);
                    store.setOrder($scope.newOrder).then(function (data) {
                        $scope.notice = 'Your order has been Proccessed!';
                    }, function () {
                        $scope.notice = 'Unable to set order';
                    });          
                    $('#my-notice').modal('toggle');
                    
                }            
            };
            
            $scope.resetCart = function () {
                $scope.whenSelect();
            };
        }
    }
}]);