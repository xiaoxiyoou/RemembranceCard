function Death(yearth, mouth, day, select, selectval, title, startY, endY) {
  var date = new Date();
  var year = date.getFullYear(); //初始年份
  var month = 01; //初始月份
  var days = new Date(year, month, 0).getDate(); //1970年01月有多少天
  var olddata = [0, 0, 0]; //初始的年月日的定位 显示1970年01月01日
  var mobileSelect1 = new MobileSelect({
    trigger: select,
    title: title,
    wheels: [{
        data: getObject(year + startY, year + endY, "年")
      },
      {
        data: getObject(1, 12, "月")
      },
      {
        data: getObject(1, days, "日")
      }
    ],
    position: [yearth, mouth, day],
    transitionEnd: function (indexArr, data) {
      // console.log(data);
      //   //滑动后的回调
      //   nowyPosition = indexArr[0];  	//滑动后的年定位
      //   nowmPosition = indexArr[1];		//滑动后的月定位
      //   oldyPosition = olddata[0];		//滑动之前的年定位
      //   oldmPosition = olddata[1];		//滑动之前的月定位
      //   if (nowyPosition != oldyPosition) {	//判断是否是年份滑动，如果是，则月份和天都归为01
      //       mobileSelect4.locatePosition(1, 6);
      //       mobileSelect4.locatePosition(2, 15);
      //   }
      //   if (nowmPosition != oldmPosition) {	//判断是否是月份滑动，如果是，则天归为01
      //       mobileSelect4.locatePosition(2, 15);
      //   }
      //   olddata = indexArr;   //重新赋值现在的定位
      //   year = data[0].id		//获取现在选择的年份
      //   month = data[1].id		//获取现在选择的月份
      //   days = new Date(year, month, 0).getDate();   //计算当前选择的年月有多少天
      //   var daydata = getObject(1, days, '日')
      //   mobileSelect4.updateWheel(2, daydata); //重新渲染天数
    },
    callback: function (indexArr, data) {
      if (select == "#death") {
        $("#death").val(data[0].value + data[1].value + data[2].value);
      } else if (select == "#birth") {
        $("#birth").val(data[0].value + data[1].value + data[2].value);
      } else if (select == "#deathTwo") {
        $("#deathTwo").val(data[0].value + data[1].value + data[2].value);
      } else if (select == "#birthTwo") {
        $("#birthTwo").val(data[0].value + data[1].value + data[2].value);
      }
      dataVale = data[0].value + data[1].value + data[2].value;
      console.log(data[0].value + data[1].value + data[2].value);
      // 计算第一个人的年龄
      if (
        $("input[name='birthday']").eq(0).val() &&
        $("input[name='deathdate']").eq(0).val()
      ) {
        var timeOne = $("input[name='deathdate']").eq(0).val().replace(/[^\d]/g, "/")
        timeOne = timeOne.substring(0, timeOne.length - 1)
        var timeTwo = $("input[name='birthday']").eq(0).val().replace(/[^\d]/g, "/")
        timeTwo = timeTwo.substring(0, timeTwo.length - 1)

        var ageOne = (new Date(timeOne).getTime() - new Date(timeTwo).getTime()) / 31536000000;
        var ageOne = Math.ceil(ageOne);

        if (ageOne > -1) {
          $("input[name='age']").eq(0).val(ageOne);
        } else {
          layer.msg("输入年龄有误");
        }

      }
      // 计算第二个人的年龄
      if (
        $("input[name='birthday']").eq(1).val() &&
        $("input[name='deathdate']").eq(1).val()
      ) {
        var timeOnecopy = $("input[name='deathdate']").eq(1).val().replace(/[^\d]/g, "/")
        timeOnecopy = timeOnecopy.substring(0, timeOnecopy.length - 1)
        var timeTwocopy = $("input[name='birthday']").eq(1).val().replace(/[^\d]/g, "/")
        timeTwocopy = timeTwocopy.substring(0, timeTwocopy.length - 1)
        var age = (new Date(timeOnecopy).getTime() - new Date(timeTwocopy).getTime()) / 31536000000;
        var age = Math.ceil(age);
        if (age > -1) {
          $("input[name='age']").eq(1).val(age);
        } else {
          layer.msg("输入年龄有误");
        }

      }
    }
  });
}