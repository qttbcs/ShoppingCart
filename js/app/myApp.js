var shoppingApp = angular.module('shoppingApp', ['ngRoute', 'phonecatControllers']);	
shoppingApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/home', {
            templateUrl: 'partials/home.html',
            controller: 'PhoneListCtrl'
        }).
         when('/shop', {
             templateUrl: 'partials/shop.html',
             controller: 'PhoneListCtrl'
         }).
        when('/product-details', {
            templateUrl: 'partials/product-details.html',
            controller: 'PhoneListCtrl'
        }).
        when('/cart', {
            templateUrl: 'partials/cart.html',
            controller: 'PhoneListCtrl'
        }).
        when('/phones', {
          templateUrl: 'partials/phone-list.html',
          controller: 'PhoneListCtrl'
        }).
        when('/phones/:phoneId', {
          templateUrl: 'partials/phone-detail.html',
          controller: 'PhoneDetailCtrl'
        }).
        otherwise({
          redirectTo: '/home'
        });
    }]);