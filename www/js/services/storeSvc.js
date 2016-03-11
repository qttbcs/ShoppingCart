angular.module("storeSvc", ["restApiSvc"])
    .factory("storeService", ["REST_API", "$http", "$q", function (REST_API, $http, $q) {
        function getApi(linkApi) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: linkApi
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        function postApi(linkApi,myData) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: linkApi,
                data: myData
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        return {
            getAllBrands: function () {
                return getApi(REST_API.HOST + REST_API.METHOD.GET_ALL_BRANDS);
            },
            getAllCategories: function(){           
                return getApi(REST_API.HOST + REST_API.METHOD.GET_ALL_CATEGORIES);
            },
            getAllProducts: function () {
                return getApi(REST_API.HOST + REST_API.METHOD.GET_ALL_PRODUCTS);
            },
            getProductsBySale: function () {
                return getApi(REST_API.HOST + REST_API.METHOD.GET_SALE);              
            },
            getProductsByBrand: function (brand) {
                return getApi(REST_API.HOST + REST_API.METHOD.GET_BRAND + brand);
            },
            getProductsByCategory: function (category) {
                return getApi(REST_API.HOST + REST_API.METHOD.GET_CATEGORY + category);
            },
            getProductsById: function (id) {
                return getApi(REST_API.HOST + REST_API.METHOD.GET_ID + id);       
            },
            setOrder: function (myData) {
                return postApi(REST_API.HOST + REST_API.METHOD.POST_ORDER, myData);
            }
        }
    }]);
