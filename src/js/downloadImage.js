const https = require('https');
const cheerio = require('cheerio');
const fs = require('fs');

let url = 'https://www.vmall.com/';

https.get(url,(res)=>{
    let resData = '';
    res.on('data',(chunk)=>{
        console.log('-----------------');
        resData += chunk.toString();
    })
    res.on('end',()=>{
        let $=cheerio.load(resData);
        $('img').each((index,elem)=>{
            let imgUrl = $(elem).attr('src');
            if(/^\/\//.test(imgUrl)){
                imgUrl = 'https:'+imgUrl;
            }

            let reg = /(\.(jpg|png|gif))/g;
            reg.test(imgUrl);
            saveImg(imgUrl , RegExp.$1);//将找到的图片存到文件夹中
        })
    })
})

fs.readdir('./',(err,files)=>{
    //判断数组中是否包含qunaImg
    
    fs.mkdir('../static/imgs/index',(err)=>{
        if(err){
            console.log("创建失败");
        }else{
            console.log("创建成功");
        }
    })
    
})

let num = 0;
function saveImg(imgUrl , flag) { 
    https.get(imgUrl,(res)=>{
        let str = '';
        res.setEncoding('binary')//设置编码为二进制数据
        res.on('data',(chunk)=>{
            str += chunk
        })
        res.on('end',()=>{
            num++;
            fs.writeFile('./qunaImg/quna'+ num + flag,str,'binary',(err)=>{
                if(err){
                    console.log("下载失败");
                }else{
                    console.log("下载成功");
                }
            })
        })
    })
 }