
'use strict';

var shoppingApp = angular.module('shoppingApp', ['ui.router', 'ui-rangeSlider', 'pagination', 'filterSvc', 'cartSvc', 'storeSvc']);
shoppingApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    //$urlRouterProvider.when('', '/home');
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'js/pages/home/index.html',
            controller: 'HomeCtrl'

        })
        .state('productCategory', {
            url: '/product/:category',
            templateUrl: 'js/pages/products/list.html',
            controller: 'ProductCtrl'
        })
        
        .state('productDetail', {
            url: '/product/:category/:idProduct',
            templateUrl: 'js/pages/products/detail.html',
            controller: 'ProductCtrl'

        })
        .state('shoppingCart', {
            url: '/cart',
            templateUrl: 'js/pages/shopping-cart/shopping-cart.html',
            controller: 'CartCtrl'

        })
})
shoppingApp.filter('customCurrency', ['filterService',function (filter) {
    return function (input) {
        return filter.customCurrency(input);
               
    }  
}]);
shoppingApp.filter('customFilter', ['filterService', function (filter) {
    return function (input) {
        return filter.customFilter(input);

    }
}]);

angular.module("cartSvc", [])
    .factory("cartService", [function () {
        var size = 0;
        var cartData = [];

        // load data from local storage
        function loadData() {
            sizeJSON = localStorage != null ? localStorage["size"] : null;
            cartDataJSON = localStorage != null ? localStorage["cartData"] : null;
            if (cartDataJSON != null && sizeJSON != null && JSON != null) {
                try {
                    size = JSON.parse(sizeJSON);
                    cartData = JSON.parse(cartDataJSON);
                }
                catch (err) {
                    // ignore errors while loading...
                }
            }
        };

        // save data to local storage
        function saveData() {
            if (localStorage != null && JSON != null) {
                localStorage["size"] = JSON.stringify(size);
                localStorage["cartData"] = JSON.stringify(cartData);
            }
        };
        
        return {
            loadData: function(){
                loadData();
            },

            addProduct: function (id, name, category, price, count, linkImage) {
                if (angular.isUndefined(count)) count = 1;
                var addedToExistingItem = false;
                for (var i = 0; i < cartData.length; i++) {
                    if (cartData[i].id == id) {
                        cartData[i].count+=count;
                        addedToExistingItem = true;
                        break;
                    }
                }
                if (!addedToExistingItem) {                
                    cartData.push({
                        id: id,
                        count: count,
                        name: name,
                        category: category,
                        price: price,
                        linkImage: linkImage
                    });
                }
                size += count;
                saveData();
            },

            getProducts: function () {
                loadData();
                return cartData;
            },

            clearCartData: function () {
                size = 0;
                cartData = [];
                saveData();
            },

            deleteProduct: function(id){
                for (var i = 0; i < cartData.length; i++) {
                    if (cartData[i].id == id) {
                        size -= cartData[i].count;
                        cartData.splice(i, 1);                      
                        break;
                    }
                }
                saveData();
            },

            updateStock: function(id, num){
                for (var i = 0; i < cartData.length; i++) {
                    if (cartData[i].id == id) {
                        cartData[i].count += num;
                        size += num;
                        break;
                    }
                }
                saveData();
            },

            totalCount: function(){
                return size;
            },

            totalPrice: function () {
                var temp = 0;
                for (var i = 0; i < cartData.length; i++) {
                    temp += cartData[i].price * cartData[i].count;
                }
                return temp;
            }
        }
    }]);

angular.module("filterSvc", [])
    .factory("filterService", [function () {
        var currency = { name: 'US Dollar', symbol: '$', place: true };
        var key = "";
        var minPrice = 0;
        var maxPrice = 2100;

        function searchKey(product, key) {
            if (product.Name.toLowerCase().indexOf(key) > -1 ||
                            product.Brand.toLowerCase().indexOf(key) > -1 ||
                            product.Category.toLowerCase().indexOf(key) > -1 ||
                            product.Condition.toLowerCase().indexOf(key) > -1) {
                return true;
            }
            return false;
        };

        function searchPrice(product) {
            if (product.Price >= minPrice && product.Price <= maxPrice) return true;
            return false;
        };

        return {
            setCurrency: function (newValue) {
                currency = newValue;
            },
            getCurrency: function(){
                return currency;
            },

            setKey: function (newValue) {
                key = newValue;
            },
            getKey: function(){
                return key;
            },

            setMinPrice: function(newValue){
                minPrice=newValue
            },
            getMinPrice: function(){
                return minPrice;
            },

            setMaxPrice: function (newValue) {
                maxPrice = newValue
            },
            getMaxPrice: function () {
                return maxPrice;
            },

            resetFilter: function () {
                key = "";
                minPrice = 0;
                maxPrice = 2100;
            },

            customCurrency: function (input) {
                if (isNaN(input)) {
                    return input;
                } else {
                    if (currency.place === true) {
                        return currency.symbol + input;
                    } else {
                        return input + currency.symbol;
                    }
                }
            },

            customFilter: function (input) {
                var out = [];
                if (!angular.isUndefined(key) && key!=null)
                {
                    angular.forEach(input, function (product) {
                        if (searchKey(product, key.toLowerCase()) && searchPrice(product)) {
                            out.push(product);
                        }
                    });
                    return out;
                }
                return input;           
            }
           
        }
    }]);

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

angular.module("restApiSvc", [])
    .constant("REST_API", {
        "HOST": "http://localhost:35819/api/",
        "METHOD": {
            "GET_ALL_BRANDS": "brand",
            "GET_ALL_CATEGORIES": "category",
            "GET_ALL_PRODUCTS": "products",
            "GET_SALE": "getSale",
            "GET_BRAND": "getBrand/",
            "GET_CATEGORY": "getCategory/",
            "GET_ID": "getId/",
            "POST_ORDER": "order/"

        }
    });
shoppingApp.directive("brandsproducts",['storeService',function (store) {
    return {
        restrict: "E",
        templateUrl: "js/components/brands_products/template.html",
        controller: function ($scope) {
            $scope.stateBrands = false;
            $scope.setStateBrands = function()
            {
                $scope.stateBrands = !$scope.stateBrands;
            }

            store.getAllBrands().then(function (data) {
                $scope.brands = data;
            }, function () {
                $scope.error = 'unable to get brands';
            });
        }
    }
}]);
shoppingApp.directive("mycart", ['cartService', function (cart) {
    cart.loadData();
    return {
        restrict: "E",
        templateUrl: "js/components/cart/template.html",
        controller: function ($scope) {
            $scope.itemCount = cart.totalCount();
            $scope.$on('UpdateCart', function () {
                $scope.itemCount = cart.totalCount();
            });
            
        }
    }
}]);
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
shoppingApp.directive("myfeaturesitems", ['cartService', function (cart) {
    cart.loadData();
    return {
        restrict: "E",
        templateUrl: "js/components/features_items/template.html",
        scope: {
            data: '=',
            title: '@'      
        },
        controller: function ($scope) {
            $scope.currentPage = 1;
            $scope.pageSize = 6;
            $scope.addItemToCart = function (item) {
                try {
                    cart.addProduct(item.Id, item.Name, item.Category, item.Price, item.Count, item.LinkImage);
                    $scope.$emit('UpdateCart');
                }
                catch (err) {
                    $scope.error = "Error when add new product! ";
                }
            };
        }
    }
}]);
shoppingApp.directive("myfooter", function () {
    return {
        restrict: "E",
        templateUrl: "js/components/footer/template.html"
    }
});
shoppingApp.directive("myheader", function () {
    return {
        restrict: "E",
        templateUrl: "js/components/header/template.html"
    }
});
shoppingApp.directive("myleftsidebar", function () {
    return {
        restrict: "E",
        templateUrl: "js/components/left-sidebar/template.html"
    }
});
shoppingApp.directive("mynavigation", function () {
    return {
        restrict: "E",
        templateUrl: "js/components/navigation/template.html"
    }
});
shoppingApp.directive("mypagination", function () {
    return {
        restrict: "E",
        templateUrl: "js/components/pagination/template.html"
    }
});
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
shoppingApp.directive("productdetails", ['cartService', function (cart) {
    cart.loadData();
    return {
        restrict: "E",
        templateUrl: "js/components/product-details/template.html",
        scope: {
            data: '='
        },
        controller: function ($scope) {
            $scope.addItemToCart = function (item) {
                try {
                    cart.addProduct(item.Id, item.Name, item.Category, item.Price, item.Count, item.LinkImage);
                    $scope.$emit('UpdateCart');
                }
                catch (err) {
                    $scope.error = "Error when add new product! ";
                }
            };
        }
    }
}]);
shoppingApp.directive("recommendeditems", ['cartService', function (cart) {
    cart.loadData();
    return {
        restrict: "E",
        templateUrl: "js/components/recommended-items/template.html",
        scope: {
            type: '=',
            data: '=',
            title: '@'

        },
        controller: function ($scope) {
            $scope.isProduct = function () {
                if ($scope.type == "product") return true;
                return false;
            };
            $scope.isBrand = function () {
                if ($scope.type == "brand") return true;
                return false;
            };
            $scope.addItemToCart = function (item) {
                try {
                    cart.addProduct(item.Id, item.Name, item.Category, item.Price, item.Count, item.LinkImage);
                    $scope.$emit('UpdateCart');
                }
                catch (err) {
                    $scope.error = "Error when add new product! ";
                }
            };
            $scope.goPrev = function () {
                $('#recommended-item-carousel').carousel('prev');
            }
            $scope.goNext = function () {
                $('#recommended-item-carousel').carousel('next');
            }
        }
    }
}]);
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
shoppingApp.directive("myslider", [function () {
    return {
        restrict: "E",
        templateUrl: "js/components/slider/template.html",
        scope: {
            data: '='
        },
        controller: function ($scope) {
            $scope.goPrev = function () {
                $('#slider-carousel').carousel('prev');
            }
            $scope.goNext = function () {
                $('#slider-carousel').carousel('next');
            }
        }
    }
}]);
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
shoppingApp.controller('ProductCtrl', ['$scope', '$stateParams', 'storeService', 'filterService',
    function ($scope, $stateParams, store, filter) {
        $scope.category = $stateParams.category;    
        $scope.idProduct = $stateParams.idProduct;
        $scope.products = [];

        if (!angular.isUndefined($scope.category)) {
            if ($scope.category == "Sale_products") {
                filter.resetFilter();
                store.getProductsBySale().then(function (data) {
                    angular.forEach(data, function (product) {
                        $scope.products.push(product);
                    })
                }, function () {
                    $scope.error = 'unable to get products by sale';
                });
            }
            else if ($scope.category == "Search") {
                store.getAllProducts().then(function (data) {
                    angular.forEach(data, function (product) {
                        $scope.products.push(product);
                    })
                }, function () {
                    $scope.error = 'unable to get products by sale';
                });
            }
            else {
                filter.resetFilter();
                store.getProductsByCategory($scope.category).then(function (data) {
                    angular.forEach(data, function (product) {
                        $scope.products.push(product);
                    })
                }, function () {
                    $scope.error = 'unable to get products by category';
                });

                store.getProductsByBrand($scope.category).then(function (data) {
                    angular.forEach(data, function (product) {                  
                        $scope.products.push(product);
                    })
                }, function () {
                    $scope.error = 'unable to get products by brand';
                });
            }     
        };

        if (!angular.isUndefined($scope.idProduct)) {
            store.getProductsById($scope.idProduct).then(function (data) {
                $scope.product = data;
            }, function () {
                $scope.error = 'unable to get product by id';
            });

        };

        
}]);
//angularjs controller method
shoppingApp.controller('CartCtrl', ['$scope', 'cartService',
    function ($scope, cart) {
       
        //show all products information     
        $scope.items = cart.getProducts();
            
        //Total price
        $scope.total = cart.totalPrice();
        $scope.$on('UpdateTotal', function () {
            $scope.total = cart.totalPrice();
        });

        //Clear all products
        function clearAll() {
            try {
                cart.clearCartData();              
                $scope.items.length = 0;
            }
            catch (err) {
                $scope.error = "Error when clear all products!";
            }
        };
        $scope.clearAll = function () {
            clearAll();
            $scope.$emit('UpdateCart');
            $scope.$broadcast('UpdateTotal');
        };

        //Delete Product
        function deleteItem(id) {
            try {
                cart.deleteProduct(id);                
            }
            catch (err) {
                $scope.error = "Error when delete product id: " + id + "!";
            }
        };
        $scope.delete = function () {
            var id = this.item.id;
            deleteItem(id);
            $scope.$emit('UpdateCart');
            $scope.$broadcast('UpdateTotal');
        };

        //Update Product stock
        function updateStock(id, num) {
            try {
                cart.updateStock(id, num);           
            }
            catch (err) {
                $scope.error = "Error when update product stock id: " + id + "!";
            }
        };
        $scope.addStock = function () {
            var id = this.item.id;
            updateStock(id, 1);
            $scope.$emit('UpdateCart');
            $scope.$broadcast('UpdateTotal');
        };
        $scope.subStock = function () {
            var id = this.item.id;
            if (this.item.count == 1)
                deleteItem(id);
            updateStock(id, -1);
            $scope.$emit('UpdateCart');
            $scope.$broadcast('UpdateTotal');
        };
    
}]);
