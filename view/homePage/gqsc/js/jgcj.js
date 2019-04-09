var priceType = '1';
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
            if ($(this).attr('ids') == '2') {
                $("#sz").hide()
            } else {
                $("#sz").show()
            }
            priceType = $(this).attr('ids')
        })
        $(document).on("click", "#save", function () {
            if ($.trim($("#area").attr('ids')) == "") {

            } else {
                var file = "";
                jgcj.fileLists.forEach((ele, index) => {
                    if (index) {
                        file += (',' + ele)
                    } else {
                        file += ele
                    }
                })
                var dat = {}
                if (priceType == '1') {
                    dat = {
                        areaId: $.trim($("#area").attr('ids')),
                        market: $.trim($("#market").val()),
                        cropId: $.trim($("#type").attr('ids')),
                        priceType: 1,
                        price: parseFloat($.trim($("#price").val())),
                        file: file
                    }
                } else if (priceType == '2') {
                    dat = {
                        areaId: $.trim($("#area").attr('ids')),
                        cropId: $.trim($("#type").attr('ids')),
                        priceType: 2,
                        price: parseFloat($.trim($("#price").val())),
                        file: file
                    }
                }
                $.ajax({
                    url: localhost50010 + "/priceInfo/save",
                    type: "POST",
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("login_token", my_token);
                    },
                    data: JSON.stringify(dat),
                    success: function (result) {
                        console.log(result)
                        _this.msg(result.message)
                    },
                    error: function (error) {
                        console.log(error);
                        _this.msg(result.message)
                    }
                });
            }
            console.log(dat)
        })
        //供应类型
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
        //供应区域
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
    },
    imgChange(obj1, obj2) {
        var _this = this
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
    },
    msg(str) {
        $("#msg").html(str)
        $("#mask").show()
        setTimeout(() => {
            $("#mask").hide()
            $("#msg").empty()
        }, 1000);
    }
}
$(function () {
    jgcj.init()
})