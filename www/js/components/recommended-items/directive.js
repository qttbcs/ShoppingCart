shoppingApp.directive("recommendeditems", function () {
    return {
        restrict: "E",
        templateUrl: "js/components/recommended-items/template.html",
        controller: function ($scope) {
            var item = [];
            $scope.itemActive = function () {
                for(var i=0; i<3; i++)
                {
                    //var value = function () {
                    //    value.linkImage = products[i].linkImage;
                    //    value.Price = products[i].Price;
                    //    value.Name = products[i].Name;
                    //}
                   
                }
            }
           
        }
    }
});