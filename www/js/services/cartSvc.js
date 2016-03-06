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
