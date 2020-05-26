function WeiXinShare(title, link, imgurl, sharedesc) {
    var data = {
        url: window.location.href,
        t: Math.random()
    };

    var _getWechatSignUrl = 'http://b.fuyulove.com/Action/CacheData.aspx?action=jssdk';
    $.ajax({
        url: _getWechatSignUrl,
        data: data,
        success: function (res) {


            if (res.code == 1) {
                wxConfig(res.data.data.appid, res.data.data.timestamp, res.data.data.nonceStr, res.data.data.signature);
            }
        }
    });

    function wxConfig(_appId, _timestamp, _nonceStr, _signature) {
        wx.config({
            debug: false,
            appId: _appId,
            timestamp: _timestamp,
            nonceStr: _nonceStr,
            signature: _signature,
            jsApiList: [
                'checkJsApi',
                'onMenuShareTimeline',
                'onMenuShareAppMessage', 'uploadImage', 'chooseImage', 'openLocation', 'getLocation',
                'previewImage',
                'downloadImage',
                'startRecord', 'stopRecord', 'playVoice', 'uploadVoice'
            ]
        });



    }
    // var link = location.protocol + '//' + location.host + location.pathname
    var link = 'http://wx.fuyulove.com/Recall/middlePage.html'
    // var carid = getUrlParam("carid");
    var searchUrl = getUrlParam("carid")
    function getStr(string, str) {
        carid = string.split(str)[0];
        console.log("carid", carid)
    }
    getStr(searchUrl, "!")
    link = link + '?carid=' + carid;
    wx.ready(function () {
        wx.onMenuShareTimeline({
            title: title,
            link: link,
            imgUrl: 'http://wx.fuyulove.com/Recall/' + imgurl,
            success: function () {

            }
        });
        wx.onMenuShareAppMessage({
            title: title,
            desc: sharedesc,
            link: link,
            imgUrl: 'http://wx.fuyulove.com/Recall/' + imgurl,
            type: '',
            dataUrl: '',
            success: function () {

            }
        });


    });
}