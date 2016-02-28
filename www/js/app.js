var shoppingApp = angular.module('shoppingApp', ['ngRoute', 'shoppingCartControllers']);	
shoppingApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/home', {
            templateUrl: 'js/pages/home/home.html',
            controller: 'HomeCtrl'
        }).
         when('/shop/:category', {
             templateUrl: 'js/pages/shop/shop.html',
             controller: 'ProductCtrl'
         }).
        when('/shop/:category/:idProduct', {
            templateUrl: 'js/pages/product-details/product-details.html',
            controller: 'ProductCtrl'
        }).
        when('/cart', {
            templateUrl: 'js/pages/shopping-cart/shopping-cart.html',
            controller: 'PhoneListCtrl'
        }).
        otherwise({
          redirectTo: '/home'
        });
    }]);