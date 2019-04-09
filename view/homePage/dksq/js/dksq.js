$(function () {
    if ("id" in tool.getRequest()) {
        var td = "loanId" + tool.getRequest().id
    } else if ("billId" in tool.getRequest()) {
        var td = "billId=" + tool.getRequest().billId
    }
    $('#kaishi_riqi').mobiscroll().date({
        theme: "ios",
        mode: "scroller",
        display: "bottom",
        lang: "zh"
    });
    $('#jieshu_riqi').mobiscroll().date({
        theme: "ios",
        mode: "scroller",
        display: "bottom",
        lang: "zh"
    });
    var loc = null,
        optionListArr = [],
        dksq = {
            init: function () {
                dksq.listen()
            },
            listen: function () {
                var _this = this
                //表单显示项
                $.ajax({
                    url: localhost50010 + "/bill/optionList?" + td,
                    type: "GET",
                    dataType: "json",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("login_token", my_token);
                    },
                    success: function (result) {
                        tool.tip(result.message)
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
                                        $("#" + optionList[i].optionCode).find("span").eq(optionList[i].dataValue).find("img").attr("src", "../../../img/radio-yes.png").parent().siblings().find("img").attr("src", "../../../img/radio-no.png")

                                        $("#" + optionList[i].optionCode).attr("data-id", optionList[i].dataValue)
                                    } else {
                                        $("#" + optionList[i].optionCode).val(optionList[i].dataValue)
                                    }
                                }
                            }
                            if (myScroll) {
                                myScroll.refresh();
                            }
                        } else if (result.code == 9) {
                            tool.loginPrompt()
                        }
                    },
                    error: function (error) {
                        console.log(error)
                    }
                })
                $.ajax({
                    url: localhost50010 + "/message/kefu",
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
                            $("#marquee").html(result.data.daikuan.message)
                            $("#tel").attr("href", "tel:" + result.data.daikuan.tel)
                        }
                    },
                    error: function (error) {
                        console.log(error)
                    }
                })
                $(document).on("touchend", ".closeMarquee", function () {
                    $(".marquee").hide()
                    $("#wrapper").addClass("wrapper")
                })
                $(document).on("touchend", ".radius span", function () {
                    $(this).find("img").attr("src", "../../../img/radio-yes.png").parent().siblings().find("img").attr("src", "../../../img/radio-no.png")
                    $(this).parent().attr("data-id", $(this).attr("data-id"))
                })

                $("#dw").on("click", function () {
                    $("#diqu").val(loc)
                })
                $(document).on("click", "#sweep", function () {
                    window.location.href = "../maize/maize.html";
                })
                $(document).on("touchstart", "#playFooter", function () {
                    $("#lMask").show()
                })
                $(document).on('touchend', "#y", function () {
                    console.log(optionListArr)
                    var option = {}
                    for (let i = 0; i < optionListArr.length; i++) {
                        if (optionListArr[i] === "jigou_leixing" || optionListArr[i] === "qita_daikuan" || optionListArr[i] === "hunyin_zhuangkuang" || optionListArr[i] === "tudi_jingyingquan") {
                            option[optionListArr[i]] = $("#" + optionListArr[i]).attr("data-id")
                        } else {
                            option[optionListArr[i]] = $("#" + optionListArr[i]).val()
                        }
                    }
                    if ("id" in tool.getRequest()) {
                        var url = localhost50010 + "/bill/save?loanId" + tool.getRequest().id
                    }
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
                        url: localhost50010 + "/bill/save",
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
                            tool.tip(result.message)
                            if (result.code === "0") {
                                setTimeout(() => {
                                    window.open('../../../index.html', '_self')
                                }, 3000);
                            }
                        },
                        error: function (error) {
                            console.log(error)
                        }
                    })
                })
                $(document).on('touchend', "#n", function (event) {
                    $("#lMask").hide()
                    event.preventDefault();
                })
                $(document).on('touchend', '.input_click', function () {
                    var msg = '';
                    if ($(this).val()) {
                        msg = $.trim($(this).val())
                    }
                    _this.addHTML($(this).attr('placeholder'), msg, $(this).attr('id'))
                })
                $(document).on('touchend', '#mMask', function (event) {
                    $(this).remove()
                    event.preventDefault();
                })
                $(document).on('touchend', '#msg', function (event) {
                    event.preventDefault();
                    return false
                })
                $(document).on('touchend', '#yy', function () {
                    $("#" + $(this).attr('yid')).val($.trim($("#yMsg").val()))
                    $("#mMask").remove()
                })
                $(document).on('click', '#_tuichu', function () {
                    window.open('../../../login.html', '_self')
                })
            },
            addHTML(pl, tip, id) {
                $(document.body).append(
                    `<div id="mMask" class="mMask">
                    <div id="msg" class="msg">
                        <div class="top">
                            <img src="../../../img/save.png" />
                            <div class="topTip">
                                <p>请填写信息</p>
                                <p>Please fill in your information</p>
                            </div>
                        </div>
                        <div class="bottom">
                            <input id="yMsg" type="text" placeholder="${pl}" value="${tip}" />
                            <input id="yy" yid="${id}" type="button" value="确认提交" />
                        </div>
                    </div>
                </div>`
                )
                setTimeout("$('#yMsg').focus()", 100);
            }
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