$(function () {
    console.log('执行')
     var userid = localStorage.getItem("userid");
    //   var useridcook = $.cookie('userid');
    //   console.log(useridcook)
      console.log(userid)
    if (!userid) {
        localStorage.setItem('path', location.href)
        location.href = "./login.html"
        return false

    }

});
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}

