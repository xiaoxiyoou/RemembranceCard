  // 获取本地城市Json
  var cityObj = new Object;
  $.ajax({
    url: "js/city.json", 
    type: "GET", 
    dataType: "json", 
    async: false,
    success: function (res) {
     
      cityObj = res;
    }
  })

  var arr = []
  var mobileSelect1 = new MobileSelect({
    trigger: '#txt_area',
    title: '',
    wheels: [{
      data: cityObj
    }],
    position: [0, 0, 0], //初始化定位 打开时默认选中的位置 如果不填默认为0
    transitionEnd: function (indexArr, data) {
    

    },
    callback: function (indexArr, data) {
      console.log(data);
      arr = []
      data.forEach(function (item) {
        arr.push(item.value);
      });
      $("input[name='birthaddr']").eq(0).val(arr.join(""));
    }
  });
  var arrTwo = []
  var mobileSelect1 = new MobileSelect({
    trigger: '#txt_area_two',
    title: '',
    wheels: [{
      data: cityObj
    }],
    position: [0, 0, 0], //初始化定位 打开时默认选中的位置 如果不填默认为0
    transitionEnd: function (indexArr, data) {
    

    },
    callback: function (indexArr, data) {
      console.log(data);
      arrTwo = []
      data.forEach(function (item) {
        arrTwo.push(item.value);
      });
      $("input[name='birthaddr']").eq(1).val(arrTwo.join(""));
    }
  });