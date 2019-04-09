var fileListStr = ""; //上传的文件名
if ("id" in tool.getRequest()) {
  var ids = tool.getRequest().id;
}
var addFarm = {
  init() {
    addFarm.listen();
  },
  listen() {
    if ("id" in tool.getRequest()) {
      //查看
      $.ajax({
        url: localhost50010 + "/farm/detail/" + ids,
        type: "POST",
        dataType: "json",
        headers: {
          "Content-Type": "application/json"
        },
        beforeSend: function (xhr) {
          xhr.setRequestHeader("login_token", my_token);
        },
        success: function (result) {
          if (result.code === "0") {
            addFarm.htmlData(result.data);
          }
        },
        error: function (error) {
          console.log(error);
        }
      });
    }
    //上传
    $("#imgFront").change(function () {
      var formData = new FormData();
      var files = this.files[0];
      formData.append("imgFile", files);
      console.log(files);
      // var objUrl = addFarm.getObjectURL(files);
      // if (objUrl) {
      //   $("#listHTML").prepend(
      //     `<li>
      //         <img class="Img" src="${objUrl}" />
      //     </li>`
      //   );
      // }
      $.ajax({
        url: localhost50001 + "/upload/img",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: function (result) {
          console.log(result);
          if (result.code === "0") {
            fileListStr += result.path + ",";
            console.log(fileListStr);
            $("#listHTML").prepend(
              `<li>
                  <img class="Img" src="${imgUrl+result.path}" />
              </li>`
            );
          }
        },
        error: function (error) {
          console.log(error);
        }
      });
    });
    //提交
    $(document).on("touchend", "#save", function () {
      var id = ids;
      var name = $("#name").val()
      var address = $("#address").val()
      var acreage = parseFloat($("#acreage").val())
      var plant = $("#plant").val()
      var brief = $("#brief").val()
      data = {
        name: name,
        address: address,
        acreage: acreage,
        brief: brief,
        plant: plant,
        fileList: fileListStr
      }
      if ("id" in tool.getRequest()) {
        data.id = id
      }
      if (data.name && data.address && data.acreage && data.brief && data.plant) {
        $.ajax({
          url: localhost50010 + "/farm/save",
          type: "POST",
          dataType: "json",
          headers: {
            'Content-Type': 'application/json'
          },
          beforeSend: function (xhr) {
            xhr.setRequestHeader("login_token", my_token);
          },
          data: JSON.stringify(data),
          success: function (result) {
            if (result.code === "0") {
              self.location = document.referrer;
              tool.tip(result.message)
            }
          },
          error: function (error) {
            console.log(error)
          }
        })
      } else {
        if (!data.name) {
          tool.tip('请输入农场名称')
        } else if (!data.address) {
          tool.tip('请输入农场地址')
        } else if (!data.acreage) {
          tool.tip('请输入农场面积')
        } else if (!data.plant) {
          tool.tip('请输入种植种类')
        } else if (!data.brief) {
          tool.tip('请输入农场简介')
        }
      }

    })
  },
  // getObjectURL(file) {
  //   var url = null;
  //   if (window.createObjectURL != undefined) {
  //     // basic
  //     url = window.createObjectURL(file);
  //   } else if (window.URL != undefined) {
  //     // mozilla(firefox)
  //     url = window.URL.createObjectURL(file);
  //   } else if (window.webkitURL != undefined) {
  //     // webkit or chrome
  //     url = window.webkitURL.createObjectURL(file);
  //   }
  //   return url;
  // },
  htmlData(data) {
    var farm = data.farm,
      fileList = data.fileList;
    console.log(fileList);
    $("#name").val(farm.name);
    $("#address").val(farm.address);
    $("#acreage").val(farm.acreage + "亩");
    $("#plant").val(farm.plant);
    $("#brief").val(farm.brief);
    console.log(fileList);
    for (let i = 0; i < fileList.length; i++) {
      fileListStr += fileList[i].url + ",";
      console.log(fileList[i]);
      $("#listHTML").prepend(
        `<li>
            <img class="Img" src="${imgUrl + fileList[i].url}" />
        </li>`
      );
    }
    console.log(fileListStr);
  }
};
addFarm.init();