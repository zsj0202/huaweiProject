define(['jquery'], function($) {
    function getBannerData(){
        return $.ajax('/api/mock/banner.json');
    }
    function getBanner2Data(){
        return $.ajax('/api/mock/banner2.json');
    }
    function getPhoneData(){
        return $.ajax('/api/mock/phone.json');
    }
    function getBookData(){
        return $.ajax('/api/mock/book.json');
    }
    function getPadData(){
        return $.ajax('/api/mock/pad.json');
    }
    
    return {
        getBannerData,
        getBanner2Data,
        getPhoneData,
        getBookData,
        getPadData
    };
});