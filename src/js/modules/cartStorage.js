define(['jquery',], function($) {
    var key = 'cartList';
    function addCartStorage(data , cb){
        var cartList = getCartStorage();
        var flag = false;
        var index = -1;

        //查看购物车中是否有当前添加的商品
        for(var i = 0; i<cartList.length; i++){
            if(cartList[i].goodsId == data.goodsId && cartList[i].goodsColor == data.goodsColor){
                flag = true;
                index = i;
            }
        }

        if(flag){
            cartList[index].goodsNumber += data.goodsNumber;
            setCartStorage(cartList);
        }else{
            cartList.push(data);
            setCartStorage(cartList);
        }

        cb();
    }

    function setCartStorage(data){
        window.localStorage.setItem(key , JSON.stringify(data));
    }

    function getCartStorage(){
        return JSON.parse(window.localStorage.getItem(key) || '[]');
    }

    return {
        addCartStorage,
        setCartStorage,
        getCartStorage
    }
    
});