define(['jquery'], function($) {
    var $banner = $('#banner');
    function initBanner(res){
        console.log(res);
        var tmp = `
        <ul>
            ${
                res.banner_list.map((v,i,a)=>{
                    return `
                        <li class="${i==0?'show':''}"><a href="${v.imgLink}"><img src="${v.imgUrl}"></a></li>
                    `;
                }).join('')
            }
        </ul>
        <ol>
            ${
                res.banner_list.map((v,i,a)=>{
                    return `
                        <li class="${i==0?'active':''}"></li>
                    `;
                }).join('')
            }
        </ol>
        <div class="banner-mask"></div>
        `;
        $banner.html(tmp); 
        handlerBanner();
    }

    function handlerBanner(){
        $banner.on('click','ol li',function(){
            var $ulLis = $banner.find('ul li');
            $(this).attr('class','active').siblings().attr('class','');
            $ulLis.eq( $(this).index() ).attr('class','show').siblings().attr('class','');
        });
    }
    return initBanner;


    
});