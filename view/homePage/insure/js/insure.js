$(function () {
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
            $("#holder_name").html(msg.policy_holder)
            $("#idType").html(msg.idType)
            $("#holder_id_card").html(msg.holder_id_card)
            $("#holder_phone").html(msg.holder_phone)
            $("#holder_address").html(msg.holder_address)
            $("#holder_email").html(msg.holder_email)
            $("#beneficiary_name").html(msg.beneficiary)
            $("#beneficiary_idType").html(msg.beneficiary_idType)
            $("#beneficiary_id_card").html(msg.beneficiary_id_card)
            $("#beneficiary_phone").html(msg.beneficiary_phone)
            $("#beneficiary_address").html(msg.beneficiary_address)
            if (parseFloat(msg.number)) {
                $("#priceSum").html(parseFloat($("#priceDan").html()) * parseFloat($("#number").html()))
            } else {
                $("#priceSum").html(0)
            }

            // beforeSend: function (xhr) {
            //     xhr.setRequestHeader("login_token", my_token);
            // },
            var optionCodeArr = []
            $.ajax({
                // url: localhost40000 + "/policy/optionList?insuranceId=" + tool.getRequest().id,
                url: "json.json",
                type: "get",
                success: function (data) {
                    if (data.code === "0") {
                        var optionS = $(document).find(".optionCode")
                        var optionListData = data.data.optionList
                        for (let i = 0; i < optionS.length; i++) {
                            $(".optionCode").eq(i).hide()
                        }
                        var codeHTML = ""
                        for (let j = 0; j < optionListData.length; j++) {
                            // console.log(optionListData[j].optionCode)
                            $("." + optionListData[j].optionCode).show()
                            codeHTML += '"' + optionListData[j].optionCode + '"' + ':"' + $(".optionCode").find("#" + optionListData[j].optionCode).html() + '",'
                        }
                        console.log(codeHTML)


                        $.ajax({
                            url: localhost40000 + "/policy/optionList?insuranceId=" + tool.getRequest().id,
                            type: "POST",
                            data: {
                                data: codeHTML
                            },
                            success: function (data) {
                                if (data.code === "0") {
                                    console.log(data)
                                }
                            },
                            error: function (err) {}
                        });
                    }
                },
                error: function (err) {}
            });


            // $.ajax({
            //     url: localhost40000 + "/policy/optionList?insuranceId=" + tool.getRequest().id,
            //     type: "POST",
            //     data: {

            //     },
            //     success: function (data) {
            //         if (data.code === "0") {
            //             var optionS = $(document).find(".optionCode")
            //             var optionListData = data.data.optionList
            //             for (let i = 0; i < optionS.length; i++) {
            //                 $(".optionCode").eq(i).hide()
            //                 for (let j = 0; j < optionListData.length; j++) {
            //                     if (optionListData[j].optionCode === $(optionS[i]).attr("data-id")) {
            //                         $(".optionCode").eq(i).show()
            //                         console.log(optionListData[j])
            //                     }
            //                 }
            //             }
            //         }
            //     },
            //     error: function (err) {}
            // });




            insure.listen()
        },
        listen: function () {
            $("#playFooter").on("click", function () {
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
            $(document).on("click", ".input", function () {
                window.open("insureInput.html?ids=" + $(this).attr("data-id") + "&id=" + tool.getRequest().id, "_self");
            })
        }
    }
    insure.init()
})