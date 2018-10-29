$(function () {
    if ("id" in tool.getRequest()) {
        var td = "loanId" + tool.getRequest().id
    } else if ("billId" in tool.getRequest()) {
        var td = "billId=" + tool.getRequest().billId
    }
    var my_token = JSON.parse(sessionStorage.getItem("my_token")),
        loc = null,
        optionListArr = [],
        dksq = {
            init: function () {

                dksq.listen()
            },
            listen: function () {
                $.ajax({
                    url: localhost40000 + "/bill/optionList?" + td,
                    type: "GET",
                    dataType: "json",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("login_token", my_token);
                    },
                    success: function (result) {
                        console.log(result)
                        if (result.code === "0") {
                            optionList = result.data.optionList
                            if ("id" in tool.getRequest()) {
                                for (let i = 0; i < optionList.length; i++) {
                                    $("." + optionList[i].optionCode).show()
                                    optionListArr.push(optionList[i].optionCode)
                                }
                            } else if ("billId" in tool.getRequest()) {
                                for (let i = 0; i < optionList.length; i++) {
                                    $("." + optionList[i].optionCode).show()
                                    optionListArr.push(optionList[i].optionCode)
                                    if (optionList[i].optionCode === "qita_daikuan" || optionList[i].optionCode === "hunyin_zhuangkuang" || optionList[i].optionCode === "tudi_jingyingquan") {
                                        console.log(optionList[i].dataValue)
                                        $("#" + optionList[i].optionCode).find("span").eq(optionList[i].dataValue).find("img").attr("src", "img/yes.png").parent().siblings().find("img").attr("src", "img/no.png")

                                        $("#" + optionList[i].optionCode).attr("data-id", optionList[i].dataValue)
                                    } else {
                                        $("#" + optionList[i].optionCode).val(optionList[i].dataValue)
                                    }
                                }
                            }
                            if (myScroll) {
                                myScroll.refresh();
                            }
                        }
                    },
                    error: function (error) {
                        console.log(error)
                    }
                })
                $.ajax({
                    url: localhost55001 + "/message/kefu",
                    type: "GET",
                    dataType: "json",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("login_token", my_token);
                    },
                    success: function (result) {
                        console.log(result)
                        if (result.code === "0") {
                            $("#marquee").html(result.data.message)
                            tel = result.data.tel;
                            $("#tel").attr("href", "tel:" + tel)
                        }
                    },
                    error: function (error) {
                        console.log(error)
                    }
                })
                $(document).on("touchend", ".radius span", function () {
                    $(this).find("img").attr("src", "img/yes.png").parent().siblings().find("img").attr("src", "img/no.png")
                    $(this).parent().attr("data-id", $(this).attr("data-id"))
                })

                $("#dw").on("click", function () {
                    $("#diqu").val(loc)
                })
                $(document).on("click", "#sweep", function () {
                    window.location.href = "../maize/maize.html";
                })
                $(document).on("touchstart", "#playFooter", function () {
                    var msg = ""
                    console.log(optionListArr)
                    var option = {}
                    for (let i = 0; i < optionListArr.length; i++) {

                        if (optionListArr[i] === "qita_daikuan" || optionListArr[i] === "hunyin_zhuangkuang" || optionListArr[i] === "tudi_jingyingquan") {
                            option[optionListArr[i]] = $("#" + optionListArr[i]).attr("data-id")
                        } else {
                            option[optionListArr[i]] = $("#" + optionListArr[i]).val()
                        }
                    }
                    if ("id" in tool.getRequest()) {
                        var url = localhost40000 + "/bill/save?loanId" + tool.getRequest().id
                    }
                    // if ("policyId" in tool.getRequest()) {
                    //     var url = localhost40000 + "/bill/save?id" + tool.getRequest().id
                    // }
                    if ("id" in tool.getRequest()) {
                        var data = {
                            option: option,
                            loanId: tool.getRequest().id
                        }
                    } else if ("billId" in tool.getRequest()) {
                        var data = {
                            option: option,
                            id: tool.getRequest().billId
                        }
                    }
                    console.log(option)
                    $.ajax({
                        url: localhost40000 + "/bill/save",
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
                            console.log(result)
                            if (result.code === "0") {
                                window.open("dksqqr.html?billId=" + result.data.billId, "_self")
                            }
                        },
                        error: function (error) {
                            console.log(error)
                        }
                    })
                })
            },


        }
    dksq.init()


    try {
        loc = "定位中..."
        var map = new AMap.Map('container', {
            resizeEnable: true
        });
        var options = {
            enableHighAccuracy: true, // 是否使用高精度定位，默认:true
            timeout: 10000, // 超过10秒后停止定位，默认：无穷大
            maximumAge: 0, // 定位结果缓存0毫秒，默认：0
            convert: true, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        }
        AMap.plugin(["AMap.Geolocation"], function () {
            var geolocation = new AMap.Geolocation(options);
            map.addControl(geolocation);
            geolocation.getCurrentPosition()
            AMap.event.addListener(geolocation, 'complete', onComplete); // 返回定位信息
            AMap.event.addListener(geolocation, 'error', onError); // 返回定位出错信息
        });

        function onComplete(obj) {
            console.log(obj)
            loc = obj.addressComponent.city + obj.addressComponent.district + obj.addressComponent.township
            $("#diqu").val(loc)
            console.log(loc)
        }
    } catch (error) {

    }
})