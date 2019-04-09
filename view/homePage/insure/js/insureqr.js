$(function () {
    // var historyFlag = null;
    // var policyId = null;
    // var msging=null;
    // var msg=null;
    var insure = {
        init: function () {
            // if (tool.getRequest().status === "s") {
            //     historyFlag = true;
            //     msging = JSON.parse(localStorage.getItem("msging"))
            //     msg = JSON.parse(localStorage.getItem("msg"))
            // } else if (tool.getRequest().status === "t") {
            //     historyFlag = false
            //     $("#qr").hide()
            // }
            // var optionS = $(document).find(".optionCode")
            // for (let i = 0; i < optionS.length; i++) {
            //     $(".optionCode").eq(i).hide()
            // }
            // if (historyFlag) {
            //     for (var index in msging.option) {
            //         $("#" + index).show()
            //         $("." + index).show()
            //         $("#" + index).html(msging.option[index])
            //     }
            //     if (msg[0].benTrue) {
            //         $("#benTrue").find("img").attr("src", "img/checktrue.png")
            //         msg = JSON.parse(localStorage.getItem("msg"))[0]
            //     }
            //     insure.listen()
            // } else {
            $.ajax({
                url: localhost50010 + "/policy/optionList?policyId=" + tool.getRequest().policyId,
                type: "GET",
                dataType: "json",
                headers: {
                    "Content-Type": "application/json"
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("login_token", my_token);
                },
                success: function (result) {
                    if (result.code === "0") {
                        console.log(result.data.optionList)
                        var optionList = result.data.optionList
                        var holder_name = null,
                            beneficiary_name = null;
                        for (let i = 0; i < optionList.length; i++) {
                            if (optionList[i].optionCode === "holder_zjlx" || optionList[i].optionCode === "beneficiary_zjlx") {
                                $("#" + optionList[i].optionCode).html(insure.typeId(optionList[i].dataValue))
                            } else {
                                $("#" + optionList[i].optionCode).html(optionList[i].dataValue)
                                $("." + optionList[i].optionCode).show()
                            }
                            if (optionList[i].optionCode === "holder_name") {
                                holder_name = optionList[i].dataValue
                            }
                            if (optionList[i].optionCode === "beneficiary_name") {
                                beneficiary_name = optionList[i].dataValue
                            }
                            $("." + optionList[i].optionCode).show()
                        }
                        if (holder_name === beneficiary_name) {
                            $("#benTrue").find("img").attr("src", "../../../img/checkTrue.png")
                        }
                        if (myScroll) {
                            myScroll.refresh();
                        }
                    }
                },
                error: function (error) {}
            });
            // }
            insure.listen()
        },
        listen: function () {

            $(document).on("touchend", "#qr", function () {
                window.open("insure.html?policyId=" + tool.getRequest().policyId, "_self");
            })
            $(document).on("touchend", "#playFooter", function () {
                session = ["msg"]

                for (let i = 0; i < session.length; i++) {
                    sessionStorage.removeItem(session[i]);
                }
                // // if (historyFlag) {
                //     $("#insure_wrap").show()
                //     $("#insure_inner0").show()
                // // } else {
                $("#insure_wrap").show()
                $("#insure_inner").show()
                // }
            })
            $(document).on("touchend", "#bxlb", function () {
                window.open("../../policyPage/policyList/policyList.html", "_self");
            })
            // $(document).on("touchend", "#yes", function () {

            //     $.ajax({
            //         url: localhost50010 + "/policy/save",
            //         type: "POST",
            //         dataType: "json",
            //         headers: {
            //             'Content-Type': 'application/json'
            //         },
            //         beforeSend: function (xhr) {
            //             xhr.setRequestHeader("login_token", my_token);
            //             $("#top").hide()
            //             $("#bottom").hide()
            //             $("#tGIng").html("订单提交中...").show()
            //         },
            //         data: JSON.stringify(msging),
            //         success: function (data) {
            //             console.log(data)
            //             if (data.code === "0") {
            //                 $("#tGIng").html("订单提交成功").show()
            //                 policyId = data.data.policyId
            //                 setTimeout(function () {
            //                     $("#insure_inner0").hide()
            //                     $("#tGIng").html("").hide()
            //                     $("#insure_inner0").hide()
            //                     $("#insure_inner").show()
            //                     $("#insure_inner2").hide()
            //                     // $("#qr").hide()
            //                     $("#history").hide()
            //                     $("#bxlb").show()
            //                     // historyFlag = false
            //                 }, 1000)
            //             } else {
            //                 $("#tGIng").html("订单提交失败").show()
            //                 setTimeout(function () {
            //                     $("#tGIng").html("").hide()
            //                 }, 1000)
            //             }
            //         },
            //         error: function (err) {
            //             $("#tGIng").html("订单提交失败").show()
            //             setTimeout(function () {
            //                 $("#tGIng").html("").hide()
            //             }, 1000)
            //         }
            //     })
            // })
            // $(document).on("touchend", "#no", function () {
            //     $("#insure_wrap").hide()
            //     $("#insure_inner0").hide()
            //     $("#insure_inner").hide()
            //     $("#insure_inner2").hide()
            // })
            $(document).on("touchend", ".insure_play_bottom", function () {
                $("#insure_inner").hide()
                $("#insure_inner2").show()
            })
            $(document).on("touchend", "#insureClose", function () {
                $("#insure_wrap").hide()
                $("#insure_inner").hide()
            })
            $(document).on("touchend", "#insure_play_bottom", function () {
                $("#insure_inner").hide()
                $("#insure_inner2").show()
            })
            $(document).on("touchend", "#insureClose2", function () {
                $("#insure_wrap").show()
                $("#insure_inner").show()
                $("#insure_inner2").hide()
                for (var i = 0; i < 6; i++) {
                    $(".mima input").eq(i).val("")
                }
            })
            $(document).on("touchend", "#sweep", function () {
                // if (historyFlag) {
                //     window.location.href = "insure.html?id=" + tool.getRequest().id;
                // } else {
                //     window.location.href = "../../policyPage/policyList/policyList.html";
                // }
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
                            window.location.href = "../../homePage/playsuc/playsuc.html";
                        }, 1000);
                    }
                }
            });
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