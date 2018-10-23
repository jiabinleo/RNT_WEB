$(function () {
    var my_token = JSON.parse(sessionStorage.getItem("my_token")),
        optionObj = {}
    console.log(my_token)
    var insure = {
        init: function () {
            if (localStorage.getItem("msg") == null || localStorage.getItem("msg") == "null") {
                msg = [{
                    acreage: "请输入投保亩数",
                    holder_name: "请输入你的姓名",
                    idType: "请选择你的证件类型",
                    holder_id_card: "请输入你的证件号码",
                    holder_phone: "请输入你的手机号",
                    holder_address: "请输入你的地址",
                    holder_email: "请输入你的电子邮箱",

                    beneficiary_name: "请输入受益人的姓名",
                    beneficiary_idType: "请选择受益人的证件类型",
                    beneficiary_id_card: "请输入受益人证件号码",
                    beneficiary_phone: "请输入受益人手机号",
                    beneficiary_address: "请输入受益人地址"
                }]
                localStorage.setItem("msg", JSON.stringify(msg))
            }
            var msg = JSON.parse(localStorage.getItem("msg"))[0]
            $("#acreage").html((parseFloat(msg.acreage) ? parseFloat(msg.acreage) : 0) + "亩")
            $("#policy_holder").html(msg.holder_name)
            $("#holder_zjlx").html(msg.idType)
            $("#holder_id_card").html(msg.holder_id_card)
            $("#holder_phone").html(msg.holder_phone)
            $("#holder_address").html(msg.holder_address)
            $("#holder_email").html(msg.holder_email)
            $("#beneficiary").html(msg.beneficiary_name)
            $("#beneficiary_zjlx").html(msg.beneficiary_idType)
            $("#beneficiary_id_card").html(msg.beneficiary_id_card)
            $("#beneficiary_phone").html(msg.beneficiary_phone)
            $("#beneficiary_address").html(msg.beneficiary_address)
            if (parseFloat(msg.acreage)) {
                var price = (parseFloat($("#danjia").html()) * parseFloat($("#acreage").html())).toFixed(2)
                $("#zongjia").html(price)
            } else {
                $("#zongjia").html(0)
            }

            $.ajax({
                url: localhost40000 + "/policy/optionList?insuranceId=" + tool.getRequest().id,
                type: "GET",
                dataType: "json",
                headers: {
                    'Content-Type': 'application/json',
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("login_token", my_token);
                },
                success: function (data) {
                    if (data.code === "0") {
                        var optionS = $(document).find(".optionCode")
                        var optionListData = data.data.optionList

                        for (let i = 0; i < optionS.length; i++) {
                            $(".optionCode").eq(i).hide()
                        }
                        for (let j = 0; j < optionListData.length; j++) {
                            $("." + optionListData[j].optionCode).show()
                            if (optionListData[j].optionCode === "acreage") {
                                optionObj[optionListData[j].optionCode] = parseFloat($("#" + optionListData[j].optionCode).text()) + ""
                            } else {
                                optionObj[optionListData[j].optionCode] = $("#" + optionListData[j].optionCode).text()
                            }
                        }
                        if (myScroll) {
                            myScroll.refresh();
                        }
                    }
                },
                error: function (err) {
                    console.log(err)
                }
            });

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
                error: function () {}
            })


            insure.listen()
        },
        listen: function () {

            $(document).on("touchend", ".idType", function () {
                $("#idTypeWrap").show()
                $("#idTypeWrap").attr("num", $(this).attr("num"))

            })
            $(document).on("touchstart", "#idTypeWrap li", function () {
                $(this).addClass("active").siblings().removeClass("active")
            })
            $(document).on("touchend", "#idTypeWrap li", function (e) {
                $(document)
                    .find($(".idType[num=" + $("#idTypeWrap").attr("num") + "]"))
                    .find(".msg").html($(this)
                        .find("span").text())
                var msg = JSON.parse(localStorage.getItem("msg"))[0]
                msg[$("#idTypeWrap").attr("num")] = ($(this).find("span").text())
                console.log(msg)
                localStorage.setItem("msg", JSON.stringify([msg]))
                $("#idTypeWrap").hide()
            })
            $(document).on("touchend", "#idTypeWrap", function () {
                $("#idTypeWrap").hide()
            })
            //end


            //提交保单
            $("#playFooter").on("touchend", function () {
                var optionObjString = ""
                for (var key in optionObj) {
                    optionObjString += '' + key + '":"' + optionObj[key] + ','
                }
                optionObjString = optionObjString.substring(0, optionObjString.lastIndexOf(','));
                // optionObjString += ""
                var option = optionObjString
                insuranceId = tool.getRequest().id;
                console.log(option)
                console.log(insuranceId)
                var senddata = {}
                senddata.option = option
                senddata.insuranceId = insuranceId

                console.log(senddata)

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
                    data: senddata,
                    success: function (data) {
                        console.log(data)
                    },
                    error: function () {}
                })
                $("#insure_wrap").css("display", "block")
                $("#insure_inner").css("display", "block")
            })




            $("#insureClose").on("click", function () {
                $("#insure_wrap").css("display", "none")
                $("#insure_inner").css("display", "none")
            })
            $(".insure_play_bottom").on("click", function () {
                $("#insure_inner").css("display", "none")
                $("#insure_inner2").css("display", "block")
            })
            $("#insureClose2").on("click", function () {
                $("#insure_wrap").css("display", "block")
                $("#insure_inner").css("display", "block")
                $("#insure_inner2").css("display", "none")
                for (var i = 0; i < 6; i++) {
                    $(".mima input").eq(i).val("")
                }
            })


            //证件类型start






            var pwdarr = [];
            var pwdarrs = ["1", "2", "3", "4", "5", "6"]
            $(".mima").on("click", function () {
                $(".mima input").eq(0).focus()
                pwdarr = [];
            })
            var pwss = true;
            $(".mima > input").on("input", function () {
                $(this).val($(this).val().trim().substr(0, 1))
                pwdarr.push($(this).val().trim().substr(0, 1))
                if ($(this).next().length) {
                    $(this).next().focus()
                } else {
                    if (pwdarr.length = 6) {
                        setTimeout(() => {
                            window.location.href = "/project/view/playsuc/playsuc.html";
                        }, 1000);
                    }
                }
            });
            $(document).on("click", "#sweep", function () {
                window.open("../maize/maize.html?id=" + tool.getRequest().id, "_self");
            })
            $(document).on("touchstart", ".input", function () {
                window.open("insureInput.html?ids=" + $(this).attr("data-id") + "&id=" + tool.getRequest().id, "_self");
            })
        }
    }
    insure.init()
})