angular.module("storeSvc", ["restApiSvc"])
    .factory("storeService", ["REST_API", "$http", function (REST_API, $http) {       
        return {          
            getAllCategories: function(){
                return $http.get(REST_API.HOST + REST_API.METHOD.GET_ALL_CATEGORIES).then(function (response) {
                    return response.data;
                });
            },
            getProductsBySale: function () {
                return $http.get(REST_API.HOST + REST_API.METHOD.GET_SALE).then(function (response) {
                    return response.data;
                });
            },
            getProductsByBrand: function (brand) {
                return $http.get(REST_API.HOST + REST_API.METHOD.GET_BRAND + brand).then(function (response) {
                    return response.data;
                });
            },
            getProductsByCategory: function (category) {
                return $http.get(REST_API.HOST + REST_API.METHOD.GET_CATEGORY + category).then(function (response) {
                    return response.data;
                });
            },
            getProductsById: function (id) {
                return $http.get(REST_API.HOST + REST_API.METHOD.GET_ID + id).then(function (response) {
                    return response.data;
                });           
            }
        }
    }]);
