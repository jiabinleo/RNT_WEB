$(function () {
    // if ("id" in tool.getRequest()) {
    //     if (tool.getRequest().id !== "ccc") {
    //         var policyIdOrid = "id"
    //         var insuranceId = "insuranceId"
    //     }
    // }
    // if ("policyId" in tool.getRequest()) {
    //     if (tool.getRequest().policyId !== "ccc") {
    //         var policyIdOrid = "policyId"
    //         var insuranceId = "policyId"
    //     }
    // }
    if ("insuranceId" in tool.getRequest()) {
        var ins = "?id=" + tool.getRequest().insuranceId
    }
    if ("policyId" in tool.getRequest()) {
        var ins = "?policyId=" + tool.getRequest().policyId
    }
    var insureInput = {
        init: function () {
            this.listen()
        },
        listen: function () {
            var urlIds = tool.getRequest().ids
            var msg = JSON.parse(localStorage.getItem("msg"))[0]
            console.log(msg)
            if (urlIds === "acreage") {
                $("#title").html("请输入投保亩数")
                $("#text").attr("placeholder", "请输入投保亩数")
            } else if (urlIds === "holder_name") {
                $("#title").html("请输入你的姓名")
                $("#text").attr("placeholder", "请输入你的姓名")
            } else if (urlIds === "holder_id_card") {
                $("#title").html("请输入你的证件号码")
                $("#text").attr("placeholder", "请输入你的证件号码")
            } else if (urlIds === "holder_phone") {
                $("#title").html("请输入你的手机号")
                $("#text").attr("placeholder", "请输入你的手机号")
            } else if (urlIds === "holder_address") {
                $("#title").html("请输入你的地址")
                $("#text").attr("placeholder", "请输入你的地址")
            } else if (urlIds === "holder_email") {
                $("#title").html("请输入你的电子邮箱")
                $("#text").attr("placeholder", "请输入你的电子邮箱")
            } else if (urlIds === "beneficiary_name") {
                $("#title").html("请输入受益人的姓名")
                $("#text").attr("placeholder", "请输入受益人的姓名")
            } else if (urlIds === "beneficiary_id_card") {
                $("#title").html("请输入受益人证件号码")
                $("#text").attr("placeholder", "请输入受益人证件号码")
            } else if (urlIds === "beneficiary_phone") {
                $("#title").html("请输入受益人手机号")
                $("#text").attr("placeholder", "请输入受益人手机号")
            } else if (urlIds === "beneficiary_address") {
                $("#title").html("请输入受益人地址")
                $("#text").attr("placeholder", "请输入受益人地址")
            }
            $(document).find("#text").focus()
            $(document).on("click", "#sweep", function () {
                msg[urlIds] = $("#text").val()
                if ($.trim($("#text").val()) == "") {
                    msg[urlIds] = $("#text").attr("placeholder")
                } else {
                    localStorage.setItem("msg", JSON.stringify([msg]))
                }
                window.open("insure.html?id=" + tool.getRequest().policyId, "_self");
                // window.history.go(-1);
            })

            $("input").keyup(function (e) {
                if (e.keyCode === 13) {
                    msg[urlIds] = $("#text").val()
                    if ($.trim($("#text").val()) == "") {
                        msg[urlIds] = $("#text").attr("placeholder")
                    } else {
                        localStorage.setItem("msg", JSON.stringify([msg]))
                    }
                    window.open("insure.html" + ins, "_self");
                }
            });
        }
    }
    insureInput.init()
})