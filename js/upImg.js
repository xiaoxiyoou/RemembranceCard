$('#ImageUp').click(function () {
    var image_show = 'ImageUp';
    var image_url = 'PicturePath';
    //弹出即全屏
    var index = layer.open({
        type: 2,
        title: '上传图片',
        content: './tailoring.html?image_show=' + image_show + '&image_url=' + image_url,
        area: ['300px', '195px'],
        maxmin: true
    });
    layer.full(index);
})
$('#ImageUpTwo').click(function () {
    var image_show = 'ImageUpTwo';
    var image_url = 'PicturePathTwo';
    //弹出即全屏
    var index = layer.open({
        type: 2,
        title: '上传图片',
        content: './tailoring.html?image_show=' + image_show + '&image_url=' + image_url,
        area: ['300px', '195px'],
        maxmin: true
    });
    layer.full(index);
})
var localIds = [];
var i = 0;
var length = 0;

function loadPic() {
    //拍照或从手机相册中选图接口
    wx.chooseImage({
        count: 9, //设置一次能选择的图片的数量 
        sizeType: ['original', 'compressed'], //指定是原图还是压缩,默认二者都有
        sourceType: ['album', 'camera'], //可以指定来源是相册还是相机,默认二者都有
        success: function (res) { //微信返回了一个资源对象 
            localIds = res.localIds; //本次要上传所有图片数组
            length = localIds.length; //本次要上传所有图片的数量
            syncUpload();
            // ulLoadToWechat(); //把这些图片上传到微信服务器  一张一张的上传
        }
    });
};


//上传图片到微信
function syncUpload() {
    if (!localIds.length) {
        layer.msg("上传成功！");
    } else {
        var localId = localIds.pop();
        wx.uploadImage({
            localId: localId,
            success: function (res) {
                i++;
                //上传成功后 后台立马把图片从微信服务器上下载下来，返回图片在本地服务器上的信息
                wxImgDown(res.serverId);
                //判断递归次数
                if (i < length) {
                    syncUpload();
                }

            }
        });
    }
}
//上传图片到微信
function ulLoadToWechat() {
    wx.uploadImage({
        localId: localIds[i], //图片在本地的id
        success: function (res) { //上传图片到微信成功的回调函数   会返回一个媒体对象  存储了图片在微信的id
            i++;
            //上传成功后 后台立马把图片从微信服务器上下载下来，返回图片在本地服务器上的信息
            wxImgDown(res.serverId);
            //判断递归次数
            if (i < length) {
                ulLoadToWechat();
            }
        },
        fail: function (res) {
            alert(JSON.stringify(res));
        }
    });
};
//下载上传到微信上的图片
function wxImgDown(sid) {
    $.ajax({ //后台下载
        type: "POST",
        url: "http://cdn.fuyulove.com/action/wxImgDown.ashx",
        data: {
            media_id: sid
        },
        dataType: "json",
        async: false,
        success: function (rel) {
            var imgurl = rel.msg;
            var str = '<div class="imglist" id="Guid' + imgurl.split('/imgdown/')[1].split('.jpg')[0] +
                '"><img src="' + imgurl + '" /><div class="delete"></div></div>';
            $(".alltu").append(str);
            // if (i >= length) {
            // dddd();
            // }
        },
        erro: function (jqXHR) {
            alert(jqXHR);
        }
    })
}
//多图上传方法
function dddd() {

    //添加移除移动按钮
    $(".imglist").each(function () {
        var bid = $(this).attr("id");
        console.log('执行')
        console.log('执行', bid)

        if ($("#" + bid + " .delete").html() == null) {
        $("#" + bid).append("<div class=\"delete\"></div>");
        $("#" + bid + " .delete").bind("click", function (event) {
            $("#" + bid).remove();

        });
        }
    });

};
