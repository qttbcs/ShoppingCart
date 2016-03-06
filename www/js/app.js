
'use strict';

var shoppingApp = angular.module('shoppingApp', ['ui.router', 'cartSvc','storeSvc']);
shoppingApp.config(function ($stateProvider, $urlRouterProvider) {
    //$urlRouterProvider.otherwise('/home');
    $urlRouterProvider.when('', '/home');
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

