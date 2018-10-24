$(function () {
    var my_token = JSON.parse(sessionStorage.getItem("my_token")),
        optionArr = [],
        msg = {};
    var insure = {
        init: function () {
            var optionS = $(document).find(".optionCode")
            for (let i = 0; i < optionS.length; i++) {
                $(".optionCode").eq(i).hide()
            }
            if (localStorage.getItem("msg") == null || localStorage.getItem("msg") == "null") {
                msg = {
                    danjia: "-",
                    acreage: "请输入投保亩数",
                    zongjia: "-",
                    term_start: "-",
                    term_end: "-",
                    policy_time: "-",
                    holder_name: "请输入你的姓名",
                    holder_zjlx: "请选择你的证件类型",
                    holder_id_card: "请输入你的证件号码",
                    holder_phone: "请输入你的手机号",
                    holder_address: "请输入你的地址",
                    holder_email: "请输入你的电子邮箱",
                    beneficiary_name: "请输入受益人的姓名",
                    beneficiary_zjlx: "请选择受益人的证件类型",
                    beneficiary_id_card: "请输入受益人证件号码",
                    beneficiary_phone: "请输入受益人手机号",
                    beneficiary_address: "请输入受益人地址",
                    benTrue: false
                }
                localStorage.setItem("msg", JSON.stringify([msg]))
            }
            msg = JSON.parse(localStorage.getItem("msg"))[0]
            $("#danjia").html(parseFloat(msg.danjia) ? parseFloat(msg.danjia) : "-")
            $("#acreage").html((parseFloat(msg.acreage) ? parseFloat(msg.acreage) : "0") + "亩")
            $("#term_start").html(msg.term_start)
            $("#term_end").html(msg.term_end)
            $("#policy_time").html(msg.policy_time)
            $("#holder_name").html(msg.holder_name)
            $("#holder_zjlx").html(msg.holder_zjlx)
            $("#holder_id_card").html(msg.holder_id_card)
            $("#holder_phone").html(msg.holder_phone)
            $("#holder_address").html(msg.holder_address)
            $("#holder_email").html(msg.holder_email)
            $("#beneficiary_name").html(msg.beneficiary_name)
            $("#beneficiary_zjlx").html(msg.beneficiary_zjlx)
            $("#beneficiary_id_card").html(msg.beneficiary_id_card)
            $("#beneficiary_phone").html(msg.beneficiary_phone)
            $("#beneficiary_address").html(msg.beneficiary_address)
            if (parseFloat(msg.danjia) && parseFloat(msg.acreage)) {
                msg.zongjia = (parseFloat(msg.danjia) * parseFloat(msg.acreage)) ? (parseFloat(msg.danjia) * parseFloat(msg.acreage)).toFixed(2) : "-"
                $("#zongjia").html(msg.zongjia)
            } else {
                $("#zongjia").html(0)
            }
            if (msg.benTrue === true) {
                $("#benTrue").find("img").attr("src", "img/checktrue.png")
                $("#benTrue").attr("ids", true)
            } else {
                $("#benTrue").find("img").attr("src", "img/checkfalse.png")
                $("#benTrue").attr("ids", false)
            }

            localStorage.setItem("msg", JSON.stringify([msg]))
            //是否同步
            if (msg.benTrue) {
                $(this).find("img").attr("src", "img/checktrue.png")
                msg = JSON.parse(localStorage.getItem("msg"))[0]
                msg.beneficiary_name = msg.holder_name
                msg.beneficiary_zjlx = msg.holder_zjlx
                msg.beneficiary_id_card = msg.holder_id_card
                msg.beneficiary_phone = msg.holder_phone
                msg.beneficiary_address = msg.holder_address
                $("#beneficiary_name").html(msg.holder_name)
                $("#beneficiary_zjlx").html(msg.holder_zjlx)
                $("#beneficiary_id_card").html(msg.holder_id_card)
                $("#beneficiary_phone").html(msg.holder_phone)
                $("#beneficiary_address").html(msg.holder_address)
                localStorage.setItem("msg", JSON.stringify([msg]))
            } else {
                msg = JSON.parse(localStorage.getItem("msg"))[0]
                $("#beneficiary_name").html(msg.beneficiary_name)
                $("#beneficiary_zjlx").html(msg.beneficiary_zjlx)
                $("#beneficiary_id_card").html(msg.beneficiary_id_card)
                $("#beneficiary_phone").html(msg.beneficiary_phone)
                $("#beneficiary_address").html(msg.beneficiary_address)
                localStorage.setItem("msg", JSON.stringify([msg]))
            }
            $("#title").html(JSON.parse(localStorage.getItem("insuranceName")))
            //要显示的内容
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
                    console.log(data)
                    if (data.code === "0") {
                        var optionListData = data.data.optionList

                        msg = JSON.parse(localStorage.getItem("msg"))[0]
                        optionArr = [];
                        for (let j = 0; j < optionListData.length; j++) {
                            optionArr.push(optionListData[j].optionCode)
                            $("." + optionListData[j].optionCode).show()
                            // if (optionListData[j].optionCode === "acreage") {} else {
                            if (optionListData[j].dataValue) {
                                $("#" + optionListData[j].optionCode).text(optionListData[j].dataValue)
                                msg[optionListData[j].optionCode] = optionListData[j].dataValue
                            }
                            // }
                        }
                        localStorage.setItem("msg", JSON.stringify([msg]))
                        console.log(msg)
                        if (myScroll) {
                            myScroll.refresh();
                        }
                    }
                },
                error: function (err) {
                    console.log(err)
                }
            });
            insure.listen()
        },
        listen: function () {
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
                    error: function () {}
                })
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
                console.log(msg)
                msg[$("#idTypeWrap").attr("num")] = ($(this).find("span").text())
                console.log(msg)
                localStorage.setItem("msg", JSON.stringify([msg]))
                $("#idTypeWrap").hide()
            })
            $(document).on("touchend", "#idTypeWrap", function () {
                $("#idTypeWrap").hide()
            })
            //end

            $(document).on("touchstart", "#benTrue", function () {
                if ($(this).attr("ids") == "false") {
                    $(this).find("img").attr("src", "img/checktrue.png")
                    $(this).attr("ids", "true")
                    msg = JSON.parse(localStorage.getItem("msg"))[0]
                    msg.beneficiary_name = $("#holder_name").html()
                    msg.beneficiary_zjlx = $("#holder_zjlx").html()
                    msg.beneficiary_id_card = $("#holder_id_card").html()
                    msg.beneficiary_phone = $("#holder_phone").html()
                    msg.beneficiary_address = $("#holder_address").html()
                    msg.benTrue = true
                    $("#beneficiary_name").html(msg.holder_name)
                    $("#beneficiary_zjlx").html(msg.holder_zjlx)
                    $("#beneficiary_id_card").html(msg.holder_id_card)
                    $("#beneficiary_phone").html(msg.holder_phone)
                    $("#beneficiary_address").html(msg.holder_address)
                    localStorage.setItem("msg", JSON.stringify([msg]))
                } else {
                    msg = JSON.parse(localStorage.getItem("msg"))[0]
                    $(this).find("img").attr("src", "img/checkfalse.png")
                    $(this).eq(0).attr("ids", "false")
                    msg.benTrue = false
                    localStorage.setItem("msg", JSON.stringify([msg]))
                }
                msg.zongjia = (parseFloat(msg.danjia) * parseFloat(msg.acreage)).toFixed(2)
                console.log(msg)
            })
            //确认订单
            $("#playFooter").on("touchend", function () {
                $("#insure_wrap").css("display", "block")
            })

            $(document).on("touchstart", "#yes", function () {
                var msg = JSON.parse(localStorage.getItem("msg"))[0]
                console.log(optionArr)
                var optionObj = {}
                for (let i = 0; i < optionArr.length; i++) {
                    optionObj[optionArr[i]] = msg[optionArr[i]]
                }
                var data = JSON.stringify({
                    option: optionObj,
                    insuranceId: tool.getRequest().id
                })
                console.log(data)
                $.ajax({
                    url: "http://192.168.1.240:40000/v1/policy/save",
                    type: "POST",
                    dataType: "json",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("login_token", my_token);
                    },
                    data: JSON.stringify({
                        option: optionObj,
                        insuranceId: tool.getRequest().id
                    }),
                    success: function (data) {
                        console.log(data)
                        if (data.code === "0") {
                            // setTimeout(() => {
                            window.open("insureqr.html?policyId=" + data.data.policyId, "_self");
                            // }, 1000);
                        }
                    },
                    error: function () {}
                })
            })
            $(document).on("touchstart", "#no", function () {
                $("#insure_wrap").css("display", "none")
            })


            $(document).on("click", "#sweep", function () {
                window.open("../maize/maize.html?id=" + tool.getRequest().id, "_self");
            })
            $(document).on("click", ".input", function () {
                window.open("insureInput.html?ids=" + $(this).attr("data-id") + "&id=" + tool.getRequest().id, "_self");
            })
        }
    }
    insure.init()
})