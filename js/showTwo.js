var shopid = ''
var ismsg = 0
var listImgData

var tempid = ''
var searchUrl = getUrlParam("carid")

function getStr(string, str) {
    carid = string.split(str)[0];
    tempid = string.split(str)[1];
    console.log("carid", carid)
    console.log("tempid", tempid)
    if (tempid == 1) {
        $('.btmCon ').css('visibility', 'hidden')
    } else {
        $('.previewWrapper ').css('visibility', 'hidden')
    }
}
getStr(searchUrl, "!")
$(function () {

    showDetail(carid)

    $(".set").click(function () {
        location.href = './setting.html?carid=' + carid
    });
    //   送花留言 
    $(".flowerBig").click(function () {
        if (ismsg == 0) {
            location.href = './sendDetailShow.html?carid=' + carid
        } else {
            layer.msg("用户已关闭留言功能");
        }
    });
    // 查看留言
    $(".flowerSee").click(function () {
        location.href = './sendDetail.html?carid=' + carid
    });
    $(".make").click(function () {
        location.href = './index.html?shopid=' + shopid
    });
    $(".activity").click(function () {
        location.href = './activity.html?shopid=' + shopid
    });
    $(".share").click(function () {
        location.href = './share.html?carid=' + carid
    });

    // 点击关闭
    $('.mask').click(function () {
        $('.qrWrapper').css('display', 'none')
    });
    // 返回选择其他模板
    $('.back').click(function () {
        window.history.back();
    });
    // 选择模板
    $('.confirm').click(function () {
        var tempid = sessionStorage.getItem('tempid')
        var musicurl = sessionStorage.getItem('musicurl')
        select(carid, tempid, musicurl)
    });

    // 商家信息
    $('.shop-wrapper').on('click', '.more', function () {
        location.href = 'http://wx.fuyulove.com/Merch/detail?sid=' + shopid

    });

});
// 选择模板
function select(carid, tempid, musicurl) {
    var data = {
        carid: carid,
        tempid: tempid,
        musicurl: musicurl
    }
    console.log(data)
    httpRequest("Action/recallapi?action=uptemplate", "post", data).then(function (res) {
        console.log('选择模板', res);
        if (res.code == 0) {
            window.location.replace("http://wx.fuyulove.com/Recall/setting.html?carid=" + carid)
            // location.href = './setting.html?carid=' + carid
        }

    });
}


function thisimglook() {
    var aa = [];
    var i = 0;
    var src = [];
    var json = null;
    $('.huiyi_imglist img').each(function (i, item) {
        aa.push(item);
    })
    for (i = 0; i < aa.length; i++) {
        src[i] = aa[i].src; //把所有的src存到数组里
    }
    //下面是点击图片的时候获取当前第几个图片并且启用咱们做的调用微信图片浏览器的函数
    $(".huiyi_imglist").on('click', 'img', function () {
        var srcone = $(this).attr("src");
        parent.wx.previewImage({
            current: srcone,
            urls: src
        });
    })
}


function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return decodeURI(r[2]);
    return null; //返回参数值
}

function showDetail(carid) {
    var data = {
        carid
    }
    // console.log('data', data)
    httpRequest("Action/recallapi?action=view", "get", data).then(function (res) {
        console.log('追思卡详情', res);
        if (res.code == 1) {
            window.location.href = './deleted.html'
            return false
        }
        if (res.code == 0) {

            // 模板选择
            var tempid = res.data.info.tempid
            $('.banner').attr('src', 'img/banner' + tempid + '/banner.png')
            $('.avaterImg').attr('src', 'img/banner' + tempid + '/titleImg.png')
            $('.avaterImgTwo').attr('src', 'img/banner' + tempid + '/titleImg.png')
            $('.imgTitle').attr('src', 'img/banner' + tempid + '/memory.png')
            $('.memoryTitle').attr('src', 'img/banner' + tempid + '/recall.png')
            $('.shopTitle').attr('src', 'img/banner' + tempid + '/shop.png')
            //  家族宝模板特殊样式
            if(tempid == 12){
                $(".qrwrapper").addClass('qrwrapper12')
                $(".code").addClass('codeTwo')
                $(".yunwrapper").addClass('yunwrapper12')

            }
            if(tempid == 13){
                $(".qrwrapper").addClass('qrwrapper13')
                $(".yunwrapper").addClass('yunwrapper13')
                $(".code").addClass('codeTwo')

            }
            // 用户身份判断
            var userid = res.data.info.userid
            var useridReal = localStorage.getItem('userid')
            if (userid == useridReal) {
                $('.make').css('display', 'none')
                $('.flowerBig').css('display', 'none')

            } else {
                $('.set').css('display', 'none')
                $('.flowerSee').css('display', 'none')

            }

            // 顶部渲染
            var cardtype = res.data.info.cardtype
            var list = res.data.list

            // 一个人
            var imgurl = list[0].imgurl
            if (imgurl) {
                console.log('imgurl', imgurl)
                $('.avater').attr('src', imgurl)
            }
            // 两个人
            if (cardtype == 2) {
                $('.avaterTwoCon').css('display', 'block')
                var imgurl1 = list[1].imgurl
                if (imgurl1) {
                    $('.avaterTwo').attr('src', imgurl1)
                }
            }
            //  生平图片
            listImgData = res.data.info.imglist
            console.log('listImgData', listImgData)


            // 生平
            // 追思人
            var life = res.data.info.life.replace(/\n/g, "<br/>")
            var fallname = res.data.info.fallname
            if (life) {
                $('.titleDescText').html(life)

                if (fallname) {
                    $('.titleDescName').text("追思人：" + fallname)
                }
            } else {
                $('.memoryCon').css('display', 'none')

            }

            // 商家详情
            var shop = res.data.shop
            var point = shop.point
            shopid = shop.shopid
            var zizhi = shop.zizhi.split(',');
            console.log(zizhi)
            var shophtml = ''
            console.log('shop', shop)
            shophtml += '<div class="title">' + shop.shopname + '</div>'
            shophtml += ' <div class="item c-row a-c">'
            if (shop.shopgrade_id == 7) {
                shophtml += ' <img class="badge" src="img/show/zizuan_icon.png" alt="">'
            }
            if (shop.zizhi[0] == 4) {
                shophtml += ' <img class="badge" src="img/show/jzb_icon.png" alt="">'
            }
            shophtml += ' <div class="tip hoverColor">---为您提供全程殡葬礼仪服务</div>'
            shophtml += ' </div>'
            shophtml += '  <div class="content c-row a-c">'
            shophtml += ' <img class="shopimg" src="' + shop.imgurl + '" alt="">'
            shophtml += ' <div class="item">'
            shophtml += '<div>' + shop.category + '</div>'
            shophtml += '<div class="c-row a-c">'
            shophtml += ' <div>服务指数</div>'
            for (var j = 0; j < point; j++) {
                shophtml += ' <img class="star" src="img/show/starOne.png" alt="">'
            }
            for (var j = 0; j < 5 - point; j++) {
                shophtml += ' <img class="star" src="img/show/starTwo.png" alt="">'
            }

            shophtml += '</div>'
            shophtml += '<div>' + shop.address + '</div>'
            shophtml += ' </div>'
            shophtml += ' </div>'
            shophtml += '<div class="more hoverColor">查看更多服务商家信息>></div>'
            // 商家logo
            if (shop.imglogo && shop.shopgrade_id == 7) {
                $('.logo').attr('src', shop.imglogo)
            }
            if (shop.imgerweima && shop.shopgrade_id == 7) {
                $('.code').attr('src', shop.imgerweima)
            }
            $('.shop-wrapper').append(shophtml)
            // 是否开通留言功能
            ismsg = res.data.info.ismsg
            // 音乐
            var musicurl = res.data.info.musicurl
            $('#media').attr('src', musicurl)

            // 分享

            var title = res.data.info.title + "的追思卡"
            var titleTwo = res.data.info.title
            document.title = title
            WeiXinShare(title, '', "img/index/share.png", "您的好友在追思" + titleTwo + "，邀请您一同追思");
            // 追思卡颜色
            backgroundColor = ['#aeddd5', '#c6d6b9', '#dfe2e2', '#acf6d5', '#b2e7f4', 'rgb(228, 244, 255)', 'rgb(255, 234, 205)', 'rgb(228, 244, 255)', 'rgb(255, 203, 207)', 'rgb(255, 255, 255)', 'rgb(236, 239, 252)','#e9ba50','#c6baaf']
            color = ['#3e8e99', '#387570', '#560800', '#1ca152', '#37746f', '#3777ad', '#fa7a3b', '#3777ad', '#dc5a6e', '#dd5748', 'rgb(125, 124, 197)','#aa5f2d','#b8265d']
            $('.con').css('background-color', backgroundColor[tempid - 1])
            $(".hoverColor").css("color", color[tempid - 1]);
            $(".tpl-tishi-div").css("background-color", color[tempid - 1]);
            $('body').css('display', 'block')

        }
    });
}

window.onload = function () {

    if (listImgData) {
        var listImgArr = listImgData.split("|");
        var left = $('.huiyi_imglist .left');
        var right = $('.huiyi_imglist .right');

        listImgArr.forEach(function (item, index) {
            if (item != "") {
                if (left.height() <= right.height()) {
                    left.append('<img src="' + item + '" />');
                } else {
                    right.append('<img src="' + item + '" />');
                }
            }
        })
    } else {
        $('.imgWrapper').css('display', 'none')
    }
    thisimglook()

};
document.addEventListener('DOMContentLoaded', function () {
    function audioAutoPlay() {
        var audio = document.getElementById('media');
        audio.play();
        document.addEventListener("WeixinJSBridgeReady", function () {
            audio.play();
        }, false);
    }
    audioAutoPlay();
    //    关闭和打开音乐
    var btn = document.getElementById('audio_btn');
    var audio = document.getElementById('media');
    var tag = true;
    btn.onclick = function () {
        if (tag) {
            audio.pause();
            $("#yinfu").css('animation', 'rotatin 1.2s linear infinite')
            tag = false;
        } else {
            audio.play();
            $("#yinfu").css('animation', 'rotating 1.2s linear infinite')
            tag = true;
        }
    }
});