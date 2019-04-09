//px转换为rem
(function (doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = "orientationchange" in window ? "orientationchange" : "resize",
    recalc = function () {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      if (clientWidth >= 640) {
        docEl.style.fontSize = "100px";
      } else {
        docEl.style.fontSize = 100 * (clientWidth / 640) + "px";
      }
    };

  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener("DOMContentLoaded", recalc, false);
})(document, window);
$(function () {
  var fileLists = [];
  var gyxx = {
    init() {
      gyxx.listen();
    },
    listen() {
      $(document).find('.update').change("#file", function () {
        gyxx.imgChange("z_photo", "z_file");
      });
      $.ajax({
        url: localhost50010 + "/goodsCategory/getAllTree",
        type: "GET",
        dataType: "json",
        headers: {
          "Content-Type": "application/json"
        },
        beforeSend: function (xhr) {
          xhr.setRequestHeader("login_token", my_token);
        },
        success: function (result) {
          console.log(result.data.trees);
          var type = new typeSelect({
            trigger: "#type",
            title: "类型选择",
            wheels: [{
              data: result.data.trees
            }],
            transitionEnd: function (indexArr, data) {
              console.log(data);
            },
            callback: function (indexArr, data) {
              $("#type").val(data[data.length - 1].categoryName);
              $("#type").attr("ids", data[data.length - 1].id);
            }
          });
        },
        error: function (error) {
          console.log(error);
        }
      });
      $('#supplyTime').mobiscroll().date({
        theme: "ios",
        mode: "scroller",
        display: "bottom",
        lang: "zh"
      });
      // 供应区域
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
          var area = new citySelect({
            trigger: "#area",
            title: "区域选择",
            wheels: [{
              data: result.data.trees
            }],
            transitionEnd: function (indexArr, data) {
              console.log(data);
            },
            callback: function (indexArr, data) {
              console.log(data[data.length - 1].areaName);
              $("#area").val(data[data.length - 1].areaName);
              $("#area").attr("ids", data[data.length - 1].id);
            }
          });
        },
        error: function (error) {
          console.log(error);
        }
      });

      //确认提交信息
      $(document).on("click", "#save", function () {
        console.log(fileLists)
        fileImgStr = ""
        fileLists.forEach((ele, index) => {
          if (index) {
            fileImgStr += "," + ele
          } else {
            fileImgStr += ele
          }
        })
        console.log(fileImgStr)
        var datestr = $("#supplyTime").val()
        var supplyTime = datestr.split('.')[0] + '-' + datestr.split('.')[1] + '-' + datestr.split('.')[2] + ' ' + '00:00:00'
        var data = {
          "areaId": parseInt($("#area").attr("ids")), //Int 地区
          "categoryId": parseInt($("#type").attr("ids")), //Int 分类
          "title": $("#title").val(), //Str 标题
          "contacts": $("#contacts").val(), //Str 联系人
          "telephone": parseInt($("#telephone").val()), //Str 联系电话
          "minAmount": parseInt($("#minAmount").val()), //Int 最小起售
          "totalAmount": parseInt($("#totalAmount").val()), //Int 总数
          "price": parseFloat($("#price").val()), // Float 价格
          "detail": $("#detail").val(), //Str 简介
          "supplyTime": supplyTime, //Str 2118-11-09 09:24:12 
          "fileList": fileImgStr, // Str "sdjkfdjfj.jpg,dhfjsdf.jpg,dufjdfj.mp4"
          "type": "2" //String 1 供应  2需求
        }

        $.ajax({
          url: localhost50010 + "/supply/save",
          type: "POST",
          dataType: "json",
          headers: {
            "Content-Type": "application/json"
          },
          beforeSend: function (xhr) {
            xhr.setRequestHeader("login_token", my_token);
            $("#msg").html(`信息发布中...`)
            $("#mask").show()
          },
          data: JSON.stringify(data),
          success: function (result) {
            console.log(result)
            if (result.code == "0") {
              $("#msg").html(`信息发布成功`)
              setTimeout(() => {
                $("#mask").hide()
                $("#msg").empty()
                window.open(`gqsc.html`,`_self`)
              }, 2000);
            } else {
              $("#msg").html(`信息发布失败`)
              setTimeout(() => {
                $("#mask").hide()
                $("#msg").empty()
              }, 1000);
            }
          },
          error: function (error) {
            console.log(error);
            $("#msg").html(`信息发布失败`)
            setTimeout(() => {
              $("#mask").hide()
              $("#msg").empty()
            }, 1000);
          }
        });
      })
    },
    imgChange(obj1, obj2) {
      //获取点击的文本框
      var file = document.getElementById("file");
      //存放图片的父级元素
      var imgContainer = document.getElementsByClassName(obj1)[0];
      //获取的图片文件
      var fileList = file.files;
      var formData = new FormData();
      var files = fileList[0];
      formData.append("imgFile", files);
      $.ajax({
        url: localhost50001 + "/upload/img",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: function (result) {
          if (result.code === "0") {
            console.log(result);
            console.log(imgUrl + result.path);
            fileLists.push(result.path)

            //文本框的父级元素
            var input = document.getElementsByClassName(obj2)[0];
            var imgArr = [];
            //遍历获取到得图片文件
            for (var i = 0; i < fileList.length; i++) {
              var imgUrls = window.URL.createObjectURL(file.files[i]);
              imgArr.push(imgUrls);
              var img = document.createElement("img");
              img.setAttribute("src", imgArr[i]);
              var imgAdd = document.createElement("div");
              imgAdd.setAttribute("class", "z_addImg");
              imgAdd.setAttribute("imgName", result.path);
              imgAdd.appendChild(img);
              imgContainer.appendChild(imgAdd);
            }
            // if (myScroll) {
            //   myScroll.refresh();
            // }
            gyxx.imgRemove();
          }
        },
        error: function (error) {
          console.log(error);
        }
      });


    },
    imgRemove() {
      var imgList = document.getElementsByClassName("z_addImg");
      var mask = document.getElementsByClassName("z_mask")[0];
      var cancel = document.getElementsByClassName("z_cancel")[0];
      var sure = document.getElementsByClassName("z_sure")[0];
      for (var j = 0; j < imgList.length; j++) {
        imgList[j].index = j;
        imgList[j].onclick = function () {
          var t = this;
          mask.style.display = "block";
          cancel.onclick = function () {
            mask.style.display = "none";
          };
          sure.onclick = function () {
            console.log($(t).attr("imgName"))
            fileLists.splice(jQuery.inArray($(t).attr("imgName"), fileLists), 1);
            console.log(fileLists)
            mask.style.display = "none";
            t.style.display = "none";
          };
        };
      }
    }
  };
  gyxx.init();
});