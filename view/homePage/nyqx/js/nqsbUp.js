var textNum;
var jgcj = {
    fileLists: [],
    init() {
        this.listen()
    },
    listen() {
        var _this = this
        $(document).find('section').change("#file", function () {
            _this.imgChange("z_photo", "z_file");
        });
        $(document).on("click", "menu>div", function () {
            $(this).addClass('active').siblings().removeClass('active')
        })
        $(document).on("click", "#save", function () {
            var imgFIleStr = ""
            jgcj.fileLists.forEach((ele, index) => {
                if (index) {
                    imgFIleStr += `,${ele}`
                } else {
                    imgFIleStr += ele
                }
            })
            var data = {
                "description": $("#detail").val(),
                "cropId": $("#type").attr('ids'),
                "areaId": $("#area").attr('ids'),
                "disasterCode": $("#disaster").attr('ids'),
                "files": imgFIleStr,
                "address": $("#detailAddress").val()
            }
            if (!data.areaId) {
                tool.tip('请选择区域')
                return
            }
            if (!data.address) {
                tool.tip('请输入详细地址')
                return
            }
            if (!data.disasterCode) {
                tool.tip('请选择灾害类型')
                return
            }
            if (!data.cropId) {
                tool.tip('请选择作物类型')
                return
            }
            if (!data.description) {
                tool.tip('请输入灾情描述')
                return
            }
            if (textNum > 200) {
                tool.tip('灾情描述文字过长')
                return
            }
            $.ajax({
                url: `${localhost50010}/disasters/save`,
                type: 'POST',
                dataType: 'json',
                headers: {
                    "Content-Type": "application/json"
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("login_token", my_token);
                },
                data: JSON.stringify(data),
                success: function (result) {
                    tool.tip(result.message)
                    if (result.code === '0') {
                        setTimeout(() => {
                            history.back(-1);
                        }, 2000);
                    }
                },
                error: function (error) {

                }
            })
        })
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
                console.log(result)
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
                        console.log(data)
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
                        console.log(data[data.length - 1].text);
                        $("#area").val(data[data.length - 1].text);
                        $("#area").attr("ids", data[data.length - 1].id);
                    }
                });
            },
            error: function (error) {
                console.log(error);
            }
        });
        // 灾害类型
        $.ajax({
            url: localhost50010 + "/disasters/disasterCodeList",
            type: "GET",
            dataType: "json",
            headers: {
                "Content-Type": "application/json"
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("login_token", my_token);
            },
            success: function (result) {
                console.log(result)
                var area = new citySelect({
                    trigger: "#disaster",
                    title: "灾害类型",
                    wheels: [{
                        data: result.data.list
                    }],
                    transitionEnd: function (indexArr, data) {
                        console.log(data);
                    },
                    callback: function (indexArr, data) {
                        console.log(data[data.length - 1].text);
                        $("#disaster").val(data[data.length - 1].text);
                        $("#disaster").attr("ids", data[data.length - 1].id);
                    }
                });
            },
            error: function (error) {
                console.log(error);
            }
        });
        //文字限制字数
        $("#detail").on('keyup', function () {
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
    },
    imgChange(obj1, obj2) {
        var _this = this
        //获取点击的文本框
        var file = document.getElementById("file");
        555
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
                    jgcj.fileLists.push(result.path)
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
                    _this.imgRemove();
                }
            },
            error: function (error) {
                console.log(error);
            }
        });
    },
    imgRemove() {
        var _this = this
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
                    jgcj.fileLists.splice(jQuery.inArray($(t).attr("imgName"), jgcj.fileLists), 1);
                    console.log(jgcj.fileLists)
                    mask.style.display = "none";
                    t.style.display = "none";
                };
            };
        }
    }
}
$(function () {
    jgcj.init()
})