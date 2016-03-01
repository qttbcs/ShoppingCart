angular.module("cart", [])
    .factory("cart", function () {
        var size = 0;
        var cartData = [];

        return {
            addProduct: function (id, name, price, count, linkImage) {
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
                        price: price,
                        linkImage: linkImage
                    });
                }
                size += count;
            },

            getProducts: function () {
                return cartData;
            },

            deleteProduct: function(id){
                for (var i = 0; i < cartData.length; i++) {
                    if (cartData[i].id == id) {
                        size -= cartData[i].count;
                        cartData.splice(i, 1);                      
                        break;
                    }
                }
            },

            updateStock: function(id, num){
                for (var i = 0; i < cartData.length; i++) {
                    if (cartData[i].id == id) {
                        cartData[i].count += num;
                        size += num;
                        break;
                    }
                }
            },

            count: function(){
                return size;
            },

            total: function () {
                var temp = 0;
                for (var i = 0; i < cartData.length; i++) {
                    temp += cartData[i].price * cartData[i].count;
                }
                return temp;
            }
        }
    });
