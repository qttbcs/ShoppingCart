angular.module("restApiSvc", [])
    .constant("REST_API", {
        "HOST": "http://wferestapiservice.azurewebsites.net/api/",
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