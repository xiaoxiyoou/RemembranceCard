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
	    console.log('签名', res)


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
        wx.onVoicePlayEnd({
            success: function (res) {
                stopWave();
            }
        });

    });
}
WeiXinShare('追思卡', 'http://wx.fuyulove.com/Recall/index.html', "img/index/share.png", "");