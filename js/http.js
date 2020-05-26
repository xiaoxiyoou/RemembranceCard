var codeurl = "http://wx.fuyulove.com/"
// var codeurl = "http://192.168.8.99:8888/"
function httpRequest(url, type, params) {
    var uid=localStorage.getItem("userid");
    var usrkey = localStorage.getItem("openid");
    console.log(usrkey)
    return $.ajax({
        type: type,
        url: codeurl + url,
        dataType: 'json',
        async: false,
        beforeSend: function(xhr) {
            xhr.setRequestHeader("uid:'"+uid+"'");
            xhr.setRequestHeader("usrkey:'"+usrkey+"'");
        },
        headers:{'usrkey':usrkey,'uid':uid},
        data: params
    });

}
