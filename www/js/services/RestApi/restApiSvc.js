angular.module("restApiSvc", [])
    .constant("REST_API", {
        "HOST": "http://localhost:35819/api/",
        "METHOD": {
            "GET_ALL_CATEGORIES": "category",
            "GET_SALE": "getSale",
            "GET_BRAND": "getBrand/",
            "GET_CATEGORY": "getCategory/",
            "GET_ID": "getId/"
        }
    });