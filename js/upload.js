$(function () {
    page.init();
});
var flag = true;
var page = {
    init: function () {
        $("#file").change($.proxy(this.upload, this));
    },
    upload: function () {
        if (flag) {
            $("#change").text("上传中...")
            flag = false;
            // 检测音频类型

            // console.log('fileVal', fileVal)
            // if (fileVal.indexOf("mp3") == -1){
            //     layer.msg('请上传mp3格式音频');
            //     $("#change").text("上传音乐")
            //     flag = true;
            //     $('#file').val('')
            //     return false
            // }
            var fileVal = $("#file").val();
            var filetype = fileType(fileVal)
            if (filetype == 'otherType') {
                layer.msg('请上传正确格式音频');
                $("#change").text("上传音乐")
                flag = true;
                $('#file').val('')
                return false
            }

            function fileType(filePath) {
                //获取最后一个.的位置
                var index = filePath.lastIndexOf(".");
                //获取后缀
                var ext = filePath.substr(index + 1);


                //判断是否是音频类型
                if (['wav', 'ogg', 'mp3'].indexOf(ext.toLowerCase()) != -1) {
                    return 'audio';
                }
                return 'otherType';
            }

            var file = $("#file")[0].files[0],
                //文件对象
                name = file.name,
                //文件名
                size = file.size,
                //总大小
                succeed = 0;
            var shardSize = 2 * 1024 * 1024,
                //以2MB为一个分片
                shardCount = Math.ceil(size / shardSize); //总片数
            for (var i = 0; i < shardCount; ++i) {
                //计算每一片的起始与结束位置
                var start = i * shardSize,
                    end = Math.min(size, start + shardSize);

                //构造一个表单，FormData是HTML5新增的
                var form = new FormData();
                form.append("file", file.slice(start, end)); //slice方法用于切出文件的一部分
                form.append("name", name);
                form.append("total", shardCount); //总片数
                form.append("index", i + 1); //当前是第几片

                console.log("form", form)

                //Ajax提交
                $.ajax({
                    url: "http://cdn.fuyulove.com/Action/UploadAudio.ashx",
                    type: "POST",
                    data: form,
                    async: true,
                    //异步
                    processData: false,
                    //很重要，告诉jquery不要对form进行处理
                    contentType: false,
                    //很重要，指定为false才能形成正确的Content-Type
                    success: function (res) {
                        var data = JSON.parse(res)
                        console.log(data);
                        if (data.code == 0) {
                            console.log(data.data.url)
                            musicurl = data.data.url
                            $("#change").text("上传音乐")
                            selectmMusicurl(carid, tempid, musicurl)
                        } else {
                            $("#change").text("上传音乐")
                            layer.msg('上传失败');
                        }
                        flag = true;
                        $('#file').val('')

                    },
                    error: function () {
                        layer.msg('上传失败');
                        $('#file').val('')
                    }

                });
            }
        }
    }
};