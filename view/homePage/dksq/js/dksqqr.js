$(function () {
    if ("id" in tool.getRequest()) {
        var td = tool.getRequest().id
        $("#xg").hide()
        $("footer").hide()
    } else if ("billId" in tool.getRequest()) {
        var td = tool.getRequest().billId
        $(".sweep").hide()
        var flag = false;
    }
    var tel = null;
    var dksq = {
        init: function () {
            dksq.listen()
        },
        listen: function () {
            $.ajax({
                url: localhost50010 + "/bill/detail/" + td,
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
                        for (let i = 0; i < optionList.length; i++) {
                            $("." + optionList[i].optionCode).show()
                            if (optionList[i].optionCode === "jigou_leixing" || optionList[i].optionCode === "qita_daikuan" || optionList[i].optionCode === "hunyin_zhuangkuang" || optionList[i].optionCode === "tudi_jingyingquan") {
                                console.log(optionList[i].dataValue)
                                $("#" + optionList[i].optionCode).find("span").eq(optionList[i].dataValue).find("img").attr("src", "../../../img/radio-yes.png").parent().siblings().find("img").attr("src", "../../../img/radio-no.png")
                            } else {
                                $("#" + optionList[i].optionCode).html(optionList[i].dataValue)
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
                        tel = result.data.daikuan.tel;
                    }
                },
                error: function (error) {
                    console.log(error)
                }
            })

            $(document).on("click", "#sweep", function () {
                window.location.href = "../maize/maize.html";
            })

            $(document).on("touchend", "#xg", function () {
                window.open("dksq.html?billId=" + tool.getRequest().billId, "_self")
            })
            $(document).on('click', '#playFooter', function () {
                $('.mask').show()
            })
            $(document).on('click', '#qr', function () {
                $('.mask').hide()
            })
            $(document).on('click', '#qx', function () {
                $('.mask').hide()
            })
        },
    }
    dksq.init()
})