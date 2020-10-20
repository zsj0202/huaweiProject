
requirejs.config({
    paths:{
        "jquery" : "../lib/jquery-3.4.1.min"
    }
})

define(['jquery','../api/server','./modules/banner'], function($,{getBanner2Data} , initBanner) {
    var type = location.search.match(/type=([^&]+)/)[1];
    var id = location.search.match(/id=([^&]+)/)[1];
    console.log(type , id);

    getBanner2Data().then((res)=>{
        initBanner(res);
    });
    
});