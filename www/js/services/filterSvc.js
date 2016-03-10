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
