var person = {
  userId: null, //用户id
  imgPath: null, //上传成功后返回的图片路径
  imgId: 0, //图片id标志, 方便删除预览图片
  maxNum: 1, //最多上传图片张数
  init: function () {
    this.listen();
    // this._delPic();
  },
  listen: function () {
    var _this = this;
    //获取用户信息
    $.ajax({
      url: localhost50010 + "/user/getUser?account=" + account,
      type: "POST",
      dataType: "json",
      headers: {
        "Content-Type": "application/json"
      },
      beforeSend: function (xhr) {
        xhr.setRequestHeader("login_token", my_token);
      },
      success: function (result) {
        console.log(result);
        if (result.code === "0") {
          _this.userId = result.data.user.id;
          _this.imgPath = result.data.user.icon;
          console.log(imgUrl + _this.imgPath);
          $("#userLogo").attr("src", imgUrl + result.data.user.icon);
          $("#userName").val(result.data.user.userName);
          console.log(result.data.user.sex);
          if (result.data.user.sex === "2") {
            $("#sex")
              .find("img")
              .eq(1)
              .attr("src", "../../../img/radio-yes.png");
            $("#sex").attr("data-status", "2");
          } else {
            $("#sex")
              .find("img")
              .eq(0)
              .attr("src", "../../../img/radio-yes.png");
            $("#sex").attr("data-status", "1");
          }
          $("#weiXin").val(result.data.user.weiXin);
          $("#address").val(result.data.user.address);
          $("#sign").val(result.data.user.sign);
          $("#areaId").val(result.data.user.areaName)
        } else if (result.code === "9") {
          tool.loginPrompt()
        }
      },
      error: function (error) {
        console.log(error);
      }
    });

    $(document).on("touchstart", "#sex span", function () {
      $(this)
        .find("img")
        .attr("src", "../../../img/radio-yes.png")
        .parent()
        .siblings()
        .find("img")
        .attr("src", "../../../img/radio-no.png");
      $(this)
        .parent()
        .attr(
          "data-status",
          $(this)
          .find("img")
          .attr("data-status")
        );
    });

    //修改用户信息
    $(document).on("touchend", "#wc", function () {
      console.log(_this.imgPath);
      data = {
        icon: _this.imgPath,
        id: _this.userId,
        account: account,
        userName: $("#userName").val(),
        weiXin: $("#weiXin").val(),
        sex: $("#sex").attr("data-status"),
        address: $("#address").val(),
        sign: $("#sign").val(),
        areaId: $("#areaId").attr('ids')
      };
      $.ajax({
        url: localhost50010 + "/user/modify",
        type: "POST",
        dataType: "json",
        headers: {
          "Content-Type": "application/json"
        },
        beforeSend: function (xhr) {
          xhr.setRequestHeader("login_token", my_token);
          tool.tip('保存中')
        },
        data: JSON.stringify(data),
        success: function (result) {
          console.log(result);
          if (result.code === "0") {
            tool.tip(result.message)
          } else {
            tool.tip('保存失败')
          }
        },
        error: function (error) {
          tool.tip('保存失败')
        }
      });
    });

    $("#fileImage").change(function () {
      var formData = new FormData();
      var files = this.files[0];
      formData.append("imgFile", files);
      console.log(files);
      $.ajax({
        url: localhost50001 + "/upload/img",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: function (result) {
          console.log(result);
          if (result.code === "0") {
            $("#userLogo").attr("src", imgUrl + result.path);
            _this.imgPath = result.path;
          }
        },
        error: function (error) {
          console.log(error);
        }
      });
    })

    $.ajax({
      url: localhost50010 + "/area/getAllTree",
      type: "GET",
      dataType: "json",
      headers: {
        "Content-Type": "application/json"
      },
      beforeSend: function (xhr) {
        xhr.setRequestHeader("login_token", my_token);
      },
      success: function (result) {
        var areaId = new citySelect({
          trigger: "#areaId",
          title: "区域选择",
          wheels: [{
            data: result.data.trees
          }],
          transitionEnd: function (indexArr, data) {
            console.log(data);
          },
          callback: function (indexArr, data) {
            console.log(data[data.length - 1].text);
            $("#areaId").val(data[data.length - 1].text);
            $("#areaId").attr("ids", data[data.length - 1].id);
          }
        });
      },
      error: function (error) {
        console.log(error);
      }
    });

    //收件地址管理
    $(document).on('click', '#receiving', function () {
      window.open('../../homePage/wydk/address.html', '_self')
    })

    //跳转登录页面
    $(document).on('click', '#_tuichu', function () {
      window.open('../../../login.html', '_self')
    })
    $("#sign").on('keyup', function () {
      textNum = 0;
      for (var i = 0; i < this.value.length; i++) {
        charCode = this.value.charCodeAt(i);
        textNum += 1;
      };
      if (textNum <= 200) {
        $("#surplus").html((200 - textNum) + '/200').css('color', '#1c9ee1')
      } else {
        $("#surplus").html(`已超出${textNum-200}个文字`).css('color', 'red')
      }

    })
  }
};
$(function () {
  person.init();
});