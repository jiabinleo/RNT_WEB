var imgFront = null,
  imgBack = null,
  realName = null,
  account = null;
var smrz = {
  init: function () {
    smrz.listen();
  },
  listen: function () {
    //接收数据
    $.ajax({
      url: localhost50010 + "/user/real/realName",
      type: "GET",
      dataType: "json",
      headers: {
        "Content-Type": "application/json"
      },
      beforeSend: function (xhr) {
        xhr.setRequestHeader("login_token", my_token);
      },
      success: function (result) {
        if (result.code === "0") {
          console.log(result);
          $("#zsxm").val(result.data.userReal.realName);
          $("#sfzh").val(result.data.userReal.idNumber);
          realName = result.data.userReal.realName;
          account = result.data.userReal.account;
          imgBack = result.data.userReal.imgBack;
          imgFront = result.data.userReal.imgFront;
          $("#imgFrontImg").attr("src", imgUrl + result.data.userReal.imgFront);
          $("#imgBackImg").attr("src", imgUrl + result.data.userReal.imgBack);
          console.log($(".Img"))
          console.log($(".Img").eq(0).width())
          console.log($(".Img").eq(0).height())
          // if ($(".Img").eq(0).width() > $(".Img").eq(0).height()) {
          //   $(".Img").eq(0).css({
          //     "width": "100%",
          //     "height": "auto"
          //   })
          // }
          console.log($(".Img").eq(1).width())
          console.log($(".Img").eq(1).height())

        }
      },
      error: function (error) {
        console.log(error);
      }
    });

    //上传
    $("#imgFront").change(function () {
      var formData = new FormData();
      var files = this.files[0];
      formData.append("imgFile", files);

      var objUrl = smrz.getObjectURL(files);
      if (objUrl) {
        $("#imgFrontImg").attr("src", objUrl);
      }
      $.ajax({
        url: localhost50001 + "/upload/img",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: function (result) {
          console.log(result);
          if (result.code === "0") {
            imgFront = result.path;
          }
        },
        error: function (error) {
          console.log(error);
        }
      });
    });
    $("#imgBack").change(function () {
      var formData = new FormData();
      var files = this.files[0];
      formData.append("imgFile", files);
      var objUrl = smrz.getObjectURL(files);
      if (objUrl) {
        $("#imgBackImg").attr("src", objUrl);
      }
      $.ajax({
        url: localhost50001 + "/upload/img",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: function (result) {
          console.log(result);
          if (result.code === "0") {
            imgBack = result.path;
          }
        },
        error: function (error) {
          console.log(error);
        }
      });
    });

    $(document).on("touchstart", "#upload", function () {
      var zsxm = $.trim($("#zsxm").val());
      var sfzh = $.trim($("#sfzh").val());
      if (imgFront && imgBack && zsxm && sfzh) {
        var data = {
          account: account,
          realName: zsxm,
          idNumber: sfzh,
          imgFront: imgFront,
          imgBack: imgBack
        };
        $.ajax({
          url: localhost50010 + "/user/real/save",
          type: "POST",
          dataType: "json",
          headers: {
            "Content-Type": "application/json"
          },
          beforeSend: function (xhr) {
            xhr.setRequestHeader("login_token", my_token);
          },
          data: JSON.stringify(data),
          success: function (result) {
            // if (result.code === "0") {
            // console.log(result);
            $("#wrap-mask").show()
            $("#message").html(result.message)
            setTimeout(() => {
              $("#wrap-mask").hide()
              $("#message").html("")
            }, 1000);
            // }
          },
          error: function (error) {
            console.log(error);
          }
        });
      }
    });
  },
  getObjectURL(file) {
    var url = null;
    if (window.createObjectURL != undefined) {
      // basic
      url = window.createObjectURL(file);
    } else if (window.URL != undefined) {
      // mozilla(firefox)
      url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) {
      // webkit or chrome
      url = window.webkitURL.createObjectURL(file);
    }
    return url;
  },
  uploadImg: function () {}
};
smrz.init();