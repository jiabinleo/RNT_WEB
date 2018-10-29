$(function () {
    if ("id" in tool.getRequest()) {
        var td = tool.getRequest().id
        $("#xg").hide()
        $("footer").hide()
    } else if ("billId" in tool.getRequest()) {
        var td =  tool.getRequest().billId
        var flag = false;
    }
    var tel = null;
    var my_token = JSON.parse(sessionStorage.getItem("my_token")),
        dksq = {
            init: function () {
                dksq.listen()
            },
            listen: function () {
                $.ajax({
                    url: localhost40000 + "/bill/detail/" + td,
                    // url: localhost40000 + "/bill/detail/" + tool.getRequest().billId,
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
                                if (optionList[i].optionCode === "qita_daikuan" || optionList[i].optionCode === "hunyin_zhuangkuang" || optionList[i].optionCode === "tudi_jingyingquan") {
                                    console.log(optionList[i].dataValue)
                                    $("#" + optionList[i].optionCode).find("span").eq(optionList[i].dataValue).find("img").attr("src", "img/yes.png").parent().siblings().find("img").attr("src", "img/no.png")
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
            },
        }
    dksq.init()
})