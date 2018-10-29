$(function () {
    var my_token = JSON.parse(sessionStorage.getItem("my_token")),
        optionArr = [];
    if ("id" in tool.getRequest()) {
        var idOrPolicyId = "?insuranceId=" + tool.getRequest().id
    }
    if ("policyId" in tool.getRequest()) {
        var idOrPolicyId = "?policyId=" + tool.getRequest().policyId
    }
    var insure = {
        init: function () {
            $.ajax({
                url: localhost40000 + "/policy/optionList" + idOrPolicyId,
                type: "GET",
                dataType: "json",
                async: false,
                headers: {
                    'Content-Type': 'application/json',
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("login_token", my_token);
                },
                success: function (data) {
                    console.log(data)
                    if (data.code === "0") {
                        var optionListData = data.data.optionList
                        optionArr = [];
                        // var holder_name = null,
                        //     beneficiary_name = null;
                        for (let j = 0; j < optionListData.length; j++) {
                            optionArr.push(optionListData[j].optionCode)
                            if (optionListData[j].optionCode === "holder_zjlx" || optionListData[j].optionCode === "beneficiary_zjlx") {
                                $("#" + optionListData[j].optionCode).html(insure.typeId(optionListData[j].dataValue))
                            } else if (optionListData[j].dataValue) {
                                console.log(optionListData[j].optionCode)
                                $("#" + optionListData[j].optionCode).html(optionListData[j].dataValue)
                                $("#" + optionListData[j].optionCode).val(optionListData[j].dataValue)
                            }
                            if (optionListData[j].optionCode === "holder_name") {
                                holder_name = optionListData[j].dataValue
                            }
                            if (optionListData[j].optionCode === "beneficiary_name") {
                                beneficiary_name = optionListData[j].dataValue
                            }
                            $("." + optionListData[j].optionCode).show()
                        }
                        // if (holder_name === beneficiary_name) {
                        //     $("#benTrue").find("img").attr("src", "img/checktrue.png")
                        //     $("#benTrue").attr("ids", "true")
                        // }
                        if (myScroll) {
                            myScroll.refresh();
                        }
                        // }
                    }
                },
                error: function (err) {
                    console.log(err)
                }
            });
            insure.listen()
        },
        listen: function () {
            //证件类型
            $(document).on("touchend", ".idType", function () {
                $.ajax({
                    url: localhost40000 + "/policy/zhengjian",
                    type: "GET",
                    dataType: "json",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("login_token", my_token);
                    },
                    success: function (data) {
                        console.log(data)
                        if (data.code === "0") {
                            var list = data.data.list
                            var idTypeWrapHTML = "";
                            for (let i = 0; i < list.length; i++) {
                                idTypeWrapHTML +=
                                    `<li data-id="${list[i].id}">
                                <p><span>${list[i].text}</span></p>
                            </li>`
                            }
                            $("#idTypeWrap > .inner").html(idTypeWrapHTML)
                            if (myScroll) {
                                myScroll.refresh();
                            }
                        }
                    },
                    error: function (error) {
                        console.log(error)
                    }
                })
                $("#idTypeWrap").show()
                $("#idTypeWrap").attr("num", $(this).attr("num"))
            })
            $(document).on("touchstart", "#idTypeWrap li", function () {
                console.log($(this).attr("data-id"))
                $(this).addClass("active").siblings().removeClass("active")
                $("#" + $(this).parent().parent().attr("num")).html($(this).text())
                $("#" + $(this).parent().parent().attr("num")).attr("num", $(this).attr("data-id"))
            })
            $("#acreage").change(function () {
                var danjia = parseFloat($("#danjia").html())
                var acreage = parseFloat($("#acreage").val())
                console.log(danjia, acreage)
                $("#zongjia").html((parseFloat($("#danjia").html()) * parseFloat($("#acreage").val())).toFixed(2))
                console.log($("#danjia").html())
            });


            $(document).on("touchend", "#idTypeWrap", function () {
                $("#idTypeWrap").hide()
            })
            //end

            $(document).on("touchstart", "#benTrue", function () {

                if ($(this).attr("ids") == "false") {
                    $(this).find("img").attr("src", "img/checktrue.png")
                    $(this).attr("ids", "true")
                    $("#beneficiary_name").val($("#holder_name").val())
                    $("#beneficiary_zjlx").html($("#holder_zjlx").html())
                    $("#beneficiary_zjlx").attr("num", $("#holder_zjlx").attr("num"))
                    $("#beneficiary_id_card").val($("#holder_id_card").val())
                    $("#beneficiary_phone").val($("#holder_phone").val())
                    $("#beneficiary_address").val($("#holder_address").val())
                } else {
                    $(this).find("img").attr("src", "img/checkfalse.png")
                    $(this).attr("ids", "false")

                }
            })
            //确认订单
            $("#playFooter").on("touchend", function () {
                $("#insure_wrap").show()
            })

            $(document).on("touchstart", "#yes", function () {
                var optionObj = {}
                for (let i = 0; i < optionArr.length; i++) {
                    optionObj[optionArr[i]] = $("#" + optionArr[i]).val()
                }
                optionObj["danjia"] = $("#danjia").html()
                optionObj["area_name"] = $("#danjia").html() ? $("#danjia").html() : ""
                optionObj["bao_e"] = $("#bao_e").html() ? $("#bao_e").html() : ""
                optionObj["beneficiary_zjlx"] = $.trim($("#beneficiary_zjlx").attr("num"))
                optionObj["holder_email"] = $("#holder_email").val()
                optionObj["holder_zjlx"] = $.trim($("#holder_zjlx").attr("num"))
                optionObj["term_end"] = $("#term_end").html()
                optionObj["term_start"] = $("#term_start").html()
                optionObj["zongjia"] = $("#zongjia").html()
                console.log(optionObj)
                if ("id" in tool.getRequest()) {
                    var data = JSON.stringify({
                        option: optionObj,
                        insuranceId: tool.getRequest().id
                    })
                }
                if ("policyId" in tool.getRequest()) {
                    var data = JSON.stringify({
                        option: optionObj,
                        id: tool.getRequest().policyId
                    })
                }


                $.ajax({
                    url: localhost40000 + "/policy/save",
                    type: "POST",
                    dataType: "json",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("login_token", my_token);
                    },
                    data: data,
                    success: function (data) {
                        console.log(data)
                        if (data.code === "0") {
                            window.open("insureqr.html?policyId=" + data.data.policyId, "_self");
                        }
                    },
                    error: function (error) {
                        console.log(error)
                    }
                })
            })
            $(document).on("touchstart", "#no", function () {
                $("#insure_wrap").css("display", "none")
            })


            $(document).on("click", "#sweep", function () {
                window.open("../maize/maize.html?id=" + tool.getRequest().id, "_self");
            })
            // $(document).on("click", ".input", function () {
            //     window.open("insureInput.html" + ins + "&ids=" + $(this).attr("data-id"), "_self");
            // })
        },
        showData: function () {


            //要显示的内容

        },
        typeId(id) {
            var str = ""
            switch (id) {
                case "1":
                    str = "身份证"
                    break;
                case "2":
                    str = "护照"
                    break;
                case "3":
                    str = "驾照"
                    break;
                default:
                    str = "身份证"
                    break;
            }
            return str
        }
    }
    insure.init()
})