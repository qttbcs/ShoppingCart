shoppingApp.directive("categoryproducts", function () {
    return {
        restrict: "E",
        templateUrl: "js/components/category-products/template.html",
        controller: function ($scope) {
            var state = [];
            $scope.getCollapse = function (id) {
                $(id).collapse('toggle');               
                for (var i = 0; i < state.length; i++)
                {
                    if(state[i]==id)
                    {
                        state.splice(i, 1);
                        return;
                    }
                }
                state.push(id);           
            }
            $scope.getStateCollapse = function (id) {
                for (var i = 0; i < state.length; i++)
                {
                    if (state[i] == id) return 'fa fa-minus';
                }
                return 'fa fa-plus';
            }
        }
    }
});